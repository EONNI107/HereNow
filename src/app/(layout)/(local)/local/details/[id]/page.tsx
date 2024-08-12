'use client';
import Details from '@/components/LocalDetails/Details';
import KakaoMap from '@/components/LocalDetails/KakaoMap';
import LocalDetailsSkeleton from '@/components/LocalDetails/LocalDetailsSkeleton';
import NearbyPlaces from '@/components/LocalDetails/NearbyPlaces';
import {
  useAdditionalData,
  useMainData,
  useNearbyPlaces,
} from '@/hooks/useLocalDetails';
import Image from 'next/image';
import React from 'react';

function LocalDetailsPage({ params }: { params: { id: number } }) {
  const { id } = params;

  const {
    data: mainData,
    isPending: isPendingMainData,
    error: mainDataError,
  } = useMainData(id);
  const typeId = mainData?.contenttypeid || '';
  const latitude = Number(mainData?.mapy);
  const longitude = Number(mainData?.mapx);

  const {
    data: additionalData,
    isPending: isPendingAdditionalData,
    error: additionalDataError,
  } = useAdditionalData(id, typeId, { enabled: !!typeId });

  const { data: nearbyPlaces, isPending: isPendingNearbyPlaces } =
    useNearbyPlaces(longitude, latitude, typeId || '', id);

  if (isPendingMainData || isPendingAdditionalData || isPendingNearbyPlaces) {
    return <LocalDetailsSkeleton />;
  }

  return (
    <div className="my-4 bg-gray0">
      {mainData?.firstimage ? (
        <div className="relative w-full h-[310px] xl:w-[1240px] xl:h-[700px] mx-auto mb-4">
          <Image
            src={mainData?.firstimage || '/No_Img.jpg'}
            alt="장소 이미지"
            fill
            sizes="(max-width: 1240px) 100vw, 1240px"
            className="object-contain w-full"
            priority
          />
        </div>
      ) : null}
      <div className="container mx-auto">
        <div className="xl:flex xl:gap-10">
          <div className="xl:w-[800px]">
            <Details
              mainData={mainData}
              additionalData={additionalData}
              typeId={typeId}
            />
            <KakaoMap latitude={latitude} longitude={longitude} />
          </div>
          <div className="xl:w-[400px] mt-8 xl:mt-0">
            <NearbyPlaces nearbyPlaces={nearbyPlaces} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocalDetailsPage;
