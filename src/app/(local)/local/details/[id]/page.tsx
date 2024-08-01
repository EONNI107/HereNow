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
    return (
      <div className="p-4">
        <LocalDetailsSkeleton height="h-[300px]" />
        <div className="mt-4 space-y-4">
          <LocalDetailsSkeleton height="h-[450px]" />
          <LocalDetailsSkeleton height="h-[300px]" />
          <LocalDetailsSkeleton height="h-[260px]" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Details
        mainData={mainData}
        additionalData={additionalData}
        typeId={typeId}
      />
      <KakaoMap latitude={latitude} longitude={longitude} />
      <NearbyPlaces nearbyPlaces={nearbyPlaces} />
    </div>
  );
}

export default LocalDetailsPage;
