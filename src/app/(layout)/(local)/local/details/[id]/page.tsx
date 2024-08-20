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
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

function LocalDetailsPage({ params }: { params: { id: number } }) {
  const { id } = params;
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const incrementCommentCount = () => {
    setCommentCount((prevCount) => prevCount + 1);
  };

  const decrementCommentCount = () => {
    setCommentCount((prevCount) => prevCount - 1);
  };

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
      <div className="mt-4 flex flex-col bg-gray0 xl:bg-white mx-auto xl:mt-0 xl:mb-20 xl:flex xl:flex-row xl:justify-center xl:gap-10">
        <div className="xl:w-[800px] xl:mt-11">
          <Details
            mainData={mainData}
            additionalData={additionalData}
            typeId={typeId}
            onCommentClick={() => setIsCommentModalOpen(true)}
          />
          <KakaoMap latitude={latitude} longitude={longitude} />

          <div className="w-full mt-8 mb-20 hidden xl:block">
            <h2 className="text-xl font-bold mb-4">
              {`${mainData?.title}에 대한 리뷰를 남겨주세요!`}
            </h2>
            <Comments
              placeId={id}
              onClose={() => {}}
              onCommentAdded={incrementCommentCount}
              onCommentRemoved={decrementCommentCount}
            />
          </div>
        </div>
        <div className="xl:w-[400px] mt-8 xl:mt-20">
          <NearbyPlaces nearbyPlaces={nearbyPlaces} />
        </div>
      </div>

      {isCommentModalOpen && (
        <Comments
          placeId={id}
          onClose={() => setIsCommentModalOpen(false)}
          onCommentAdded={incrementCommentCount}
          onCommentRemoved={decrementCommentCount}
        />
      )}
    </div>
  );
}

export default LocalDetailsPage;
