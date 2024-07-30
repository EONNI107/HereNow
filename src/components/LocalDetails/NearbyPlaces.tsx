import type { NearbyPlace } from '@/types/local-details';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type NearbyPlacesProps = {
  nearbyPlaces?: NearbyPlace[];
  typeId: string;
};

function NearbyPlaces({ nearbyPlaces = [], typeId }: NearbyPlacesProps) {
  const defaultImage = '/default-image.png';

  return (
    <div>
      <p className="font-bold text-md mt-8 mx-2 mb-4">
        OOO 님, 이런 곳은 어때요?
      </p>

      {nearbyPlaces && (
        <div className="mx-2">
          <div className="flex overflow-x-auto gap-4 mt-3 pb-4">
            {nearbyPlaces.map((place: NearbyPlace) => (
              <Link
                key={place.contentid}
                href={`/local/details/${place.contentid}`}
                className="w-40"
              >
                <div className="w-full">
                  <div className="relative w-40 h-40 mb-2">
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
