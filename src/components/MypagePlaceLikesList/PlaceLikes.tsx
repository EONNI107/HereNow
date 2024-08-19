import React, { useEffect, useState } from 'react';
import PostIcon from '@/components/IconList/PostIcon';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/types/supabase';
import useAuthStore from '@/zustand/useAuthStore';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';
import Link from 'next/link';

export default function PlaceLikes() {
  const [placeLikes, setPlaceLikes] = useState<Tables<'PlaceLikes'>[]>([]);
  const { user } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const fetchPlaceLikes = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('PlaceLikes')
        .select('*')
        .eq('userId', user.id);

      if (error) {
        showToast('error', '슈퍼베이스 불러오는중 오류가 발생했습니다');
        console.log(error.message);
      }
      if (!data) return;
      setPlaceLikes(data);
    };

    fetchPlaceLikes();
  }, [user?.id]);

  return (
    <div className="h-[calc(100dvh-355px)] w-full overflow-y-auto">
      {placeLikes.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <PostIcon />
            <p className="mt-2">찜한 장소가 없어요</p>
          </div>
        </div>
      ) : (
        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
          {placeLikes.map((place) => {
            return (
              <Link
                href={`/local/details/${place.placeId}`}
                key={place.id}
                className="flex items-center space-x-4 p-4 transition-shadow duration-200"
              >
                <Image
                  src={place.imageUrl || '/NoImg-v1.png'}
                  alt="이미지"
                  width={100}
                  height={100}
                  className="rounded-[8px] object-cover w-[100px] h-[100px] xl:w-[190px] xl:h-[120px]"
                  priority
                />
                <div className="flex-1 min-w-0 xl:w-full">
                  <strong className="font-semibold text-lg xl:text-2xl block mb-2 truncate">
                    {place.title}
                  </strong>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
