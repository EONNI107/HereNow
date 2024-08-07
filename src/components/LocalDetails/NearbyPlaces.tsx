import type { NearbyPlace } from '@/types/localDetails';
import useAuthStore from '@/zustand/useAuthStore';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type NearbyPlacesProps = {
  nearbyPlaces?: NearbyPlace[];
};

function NearbyPlaces({ nearbyPlaces = [] }: NearbyPlacesProps) {
  const defaultImage = '/No_Img.jpg';
  const { user } = useAuthStore();
  const nickname = user?.user_metadata.nickname;

  return (
    <div>
      {!user ? (
        <p className="font-bold text-md mt-8 mx-2 mb-4">이런 곳은 어때요?</p>
      ) : (
        <p className="font-bold text-md mt-8 mx-2 mb-4">
          {nickname}님, 이런 곳은 어때요?
        </p>
      )}

      {nearbyPlaces && (
        <div className="mx-2">
          <div className="flex overflow-x-auto gap-4 mt-3 mb-8">
            {nearbyPlaces.map((place: NearbyPlace) => (
              <Link
                key={place.contentid}
                href={`/local/details/${place.contentid}`}
                className="w-32 mb-2"
              >
                <div className="w-full">
                  <div className="relative w-32 h-32 mb-2">
                    <Image
                      className="rounded-lg object-cover"
                      src={place.firstimage || defaultImage}
                      alt={place.title}
                      fill
                      sizes="auto"
                    />
                  </div>
                  <p className="text-sm text-center truncate">{place.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NearbyPlaces;
