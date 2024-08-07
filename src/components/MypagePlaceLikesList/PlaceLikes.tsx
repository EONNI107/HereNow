import React, { useEffect, useState } from 'react';
import PostIcon from '../IconList/PostIcon';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/types/supabase';
import useAuthStore from '@/zustand/useAuthStore';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';
import Link from 'next/link';

export default function PlaceLikes() {
  const [placeLikes, setPlaceLikes] = useState<Tables<'PlaceLikes'>[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();
    const fetchPlaceLikes = async () => {
      if (!user) return;
      try {
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
      } catch {}
    };

    fetchPlaceLikes();
  }, [user?.id]);

  return (
    <div className="h-[calc((100svh_-_58px_-_92px)_*_0.7)] overflow-y-auto">
      {placeLikes.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <PostIcon />
            <p className="mt-2">찜한 장소가 없어요</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[375px]:grid-cols-2 gap-0.5 w-full">
          {placeLikes.map((place) => (
            <div key={place.id}>
              <Link href={`/local/details/${place.placeId}`}>
                <Image
                  src={place.imageUrl || '/No_Img.jpg'}
                  alt={'찜한 장소 이미지'}
                  width={200}
                  height={200}
                  className="rounded aspect-square object-cover"
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
