'use client';
import Details from '@/components/LocalDetails/Details';
import KakaoMap from '@/components/LocalDetails/KakaoMap';
import NearbyPlaces from '@/components/LocalDetails/NearbyPlaces';
import {
  useAdditionalData,
  useMainData,
  useNearbyPlaces,
} from '@/hooks/local-details';
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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Details
        mainData={mainData}
        additionalData={additionalData}
        typeId={typeId}
      />
      <KakaoMap latitude={latitude} longitude={longitude} />
      <NearbyPlaces nearbyPlaces={nearbyPlaces} typeId={typeId} />
    </div>
  );
}

export default LocalDetailsPage;
