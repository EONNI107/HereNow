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
import useAuthStore from '@/zustand/useAuthStore';
import React, { useState } from 'react';

function LocalDetailsPage({ params }: { params: { id: number } }) {
  const { id } = params;
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const { user } = useAuthStore();

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
      <div className="mt-4 flex flex-col bg-gray0 mx-auto xl:mt-0 xl:mb-20 xl:flex xl:flex-row xl:justify-center xl:gap-10">
        <div className="xl:w-[800px] xl:mt-11">
          <Details
            mainData={mainData}
            additionalData={additionalData}
            typeId={typeId}
          />
          <KakaoMap latitude={latitude} longitude={longitude} />

          {/* 댓글 섹션 */}
          <div className="w-full mt-8 mb-20">
            <h2 className="text-2xl font-bold mb-4">
              {user
                ? `${user?.nickname}님의 리뷰를 남겨주세요!`
                : `여러분만의 리뷰를 남겨주세요!`}
            </h2>
            <div className="hidden xl:block">
              <Comments placeId={id} onClose={() => {}} />
            </div>
            <div className="xl:hidden z-50">
              <button
                onClick={() => setIsCommentModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded "
              >
                댓글 보기/작성
              </button>
            </div>
          </div>
        </div>
        <div className="xl:w-[400px] mt-8 xl:mt-20">
          <NearbyPlaces nearbyPlaces={nearbyPlaces} />
        </div>
      </div>

      {isCommentModalOpen && (
        <Comments placeId={id} onClose={() => setIsCommentModalOpen(false)} />
      )}
    </div>
  );
}

export default LocalDetailsPage;
