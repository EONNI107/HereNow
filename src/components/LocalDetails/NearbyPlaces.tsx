import type { NearbyPlace } from '@/types/localDetails';
import useAuthStore from '@/zustand/useAuthStore';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LikeBtn from './LikeBtn';

type NearbyPlacesProps = {
  nearbyPlaces?: NearbyPlace[];
};

function NearbyPlaces({ nearbyPlaces = [] }: NearbyPlacesProps) {
  const defaultImage = '/NoImg-v3.png';
  const { user } = useAuthStore();
  const nickname = user?.nickname;

  return (
    <div className="xl:w-[400px]">
      <p className="font-bold text-md mx-2 mb-4 xl:text-2xl">
        {!user ? '이런 곳은 어때요?' : `${nickname}님, 이런 곳은 어때요?`}
      </p>

      {nearbyPlaces && (
        <div className="mx-2 xl:mx-0 flex gap-4 mb-8 xl:flex-col">
          {nearbyPlaces.map((place: NearbyPlace) => (
            <Link
              key={place.contentid}
              href={`/local/details/${place.contentid}`}
              className="w-32 mb-2 xl:w-[400px]"
            >
              <div className="w-full">
                <div className="relative rounded-lg xl:rounded-t-xl xl:rounded-b-none w-32 h-32 xl:w-[400px] xl:h-[240px] overflow-hidden">
                  <Image
                    className=" object-cover"
                    src={place.firstimage || defaultImage}
                    alt={place.title}
                    fill
                    sizes="auto"
                  />
                </div>
                <div className="xl:block hidden">
                  <div className="xl:flex xl:flex-row border-l border-r border-b rounded-b-xl bg-white xl:p-3 xl:pr-6 text-xl">
                    <div className="flex-grow truncate xl:p-2">
                      {place.title}
                    </div>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="self-center"
                    >
                      <LikeBtn
                        imageUrl={place.firstimage}
                        placeId={place.contentid}
                        isInNearbyPlaces={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-sm text-center truncate xl:hidden mt-2">
                  {place.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default NearbyPlaces;
