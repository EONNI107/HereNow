'use client';
import Comments from '@/components/FeedDetail/Comments';
import Details from '@/components/LocalDetails/Details';
import KakaoMap from '@/components/LocalDetails/KakaoMap';
import LocalDetailsSkeleton from '@/components/LocalDetails/LocalDetailsSkeleton';
import NearbyPlaces from '@/components/LocalDetails/NearbyPlaces';
import {
  useAdditionalData,
  useMainData,
  useNearbyPlaces,
} from '@/hooks/useLocalDetails';
import React, { useState } from 'react';

function LocalDetailsPage({ params }: { params: { id: number } }) {
  const { id } = params;
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

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
    <div className="xl:container xl:max-w-screen-xl">
      <div className="mt-4 flex flex-col bg-gray0 mx-auto xl:mt-0 xl:max-h-[2000px] xl:mb-5 xl:flex xl:flex-row xl:justify-center xl:gap-10">
        <div className="xl:w-[800px] xl:mt-11">
          <Details
            mainData={mainData}
            additionalData={additionalData}
            typeId={typeId}
          />
          <KakaoMap latitude={latitude} longitude={longitude} />
        </div>
        <div className="xl:w-[400px] mt-8 xl:mt-20">
          <NearbyPlaces nearbyPlaces={nearbyPlaces} />
        </div>
        {isCommentModalOpen && (
          <div className="fixed inset-0 z-50">
            <Comments
              placeId={id}
              onClose={() => setIsCommentModalOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default LocalDetailsPage;
