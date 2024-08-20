import LikeBtn from '@/components/LocalDetails/LikeBtn';
import dayjs from 'dayjs';
import {
  BookOpenIcon,
  CalendarDateRangeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { DetailProps } from '@/types/localDetails';
import Image from 'next/image';
import { showToast } from '@/utils/toastHelper';

function Details({
  mainData,
  additionalData,
  typeId,
  onCommentClick,
}: DetailProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const formatKoreanDate = (dateStr: string): string => {
    try {
      const date = dayjs(dateStr, 'YYYYMMDD');
      if (!date.isValid()) {
        throw new Error('유효하지 않은 형식입니다.');
      }
      return date.format('YYYY년 MM월 DD일');
    } catch (error) {
      console.error('에러가 생겼습니다:', error);
      return '유효하지 않은 형식';
    }
  };

  const getPhoneNumber = () => {
    if (!additionalData || !typeId) return null;
    switch (Number(typeId)) {
      case 12:
        return additionalData.infocenter;
      case 14:
        return additionalData.infocenterculture;
      case 15:
        return additionalData.sponsor1tel;
      case 39:
        return additionalData.infocenterfood;
      default:
        return null;
    }
  };

  const getRestDate = () => {
    if (!additionalData || !typeId) return null;
    switch (Number(typeId)) {
      case 12:
        return additionalData.restdate;
      case 14:
        return additionalData.restdateculture;
      case 39:
        return additionalData.restdatefood;
      default:
        return null;
    }
  };

  const getHours = () => {
    if (!additionalData || !typeId) return null;
    switch (Number(typeId)) {
      case 14:
        return additionalData.usetimeculture;
      case 15:
        return additionalData.playtime;
      case 39:
        return additionalData.opentimefood;
      default:
        return null;
    }
  };
  const phoneNumber = getPhoneNumber();
  const restdate = getRestDate();
  const hours = getHours();
  const filteredOverview =
    mainData?.overview
      .replace(/<br\s*\/?>/gi, '')
      .replace(/&gt;/g, '')
      .replace(/&lt;/g, '') || '';
  const filteredHours = hours?.replace(/<br\s*\/?>/gi, ' ') || '';
  const filteredRestDate = restdate?.replace(/<br\s*\/?>/gi, ' ') || '';

  const handleShareBtn = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('success', '현재 페이지 주소가 복사되었습니다.');
    } catch (err) {
      console.error('복사 실패', err);
      showToast('error', '현재 페이지 주소 복사를 실패하였습니다.');
    }
  };

  return (
    <>
      {mainData?.firstimage ? (
        <div className="relative w-full h-[310px] xl:w-[800px] xl:h-[600px] mx-auto mb-6 xl:mb-9 bg-white">
          <Image
            src={mainData.firstimage || '/NoImg-v3.png'}
            alt="장소 이미지"
            fill
            sizes="(max-width: 1240px) 100vw, 1240px"
            className="object-cover w-full xl:object-contain"
            priority
          />
        </div>
      ) : (
        <div className="relative w-full h-[310px] xl:w-[800px] xl:h-[600px] mx-auto mb-6 xl:mb-9">
          <Image
            src={'/NoImg-v3.png'}
            alt="장소 이미지"
            fill
            sizes="(max-width: 1240px) 100vw, 1240px"
            className="object-contain w-full"
            priority
          />
        </div>
      )}
      <div className="mx-4 xl:mx-0">
        <div className="flex flex-col justify-between gap-2 mb-4 xl:mb-6">
          {mainData?.contentid && (
            <div className="flex justify-between items-center xl:hidden mb-2">
              <div className="flex items-center gap-2">
                <LikeBtn
                  imageUrl={mainData.firstimage}
                  placeId={mainData.contentid}
                  title={mainData.title}
                />
                <button onClick={onCommentClick}>
                  <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
                </button>
              </div>
              <button onClick={handleShareBtn}>
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          )}

          <h1 className="text-2xl xl:text-5xl">{mainData?.title}</h1>

          {mainData?.contentid && (
            <div className="hidden xl:block mt-4">
              <div className="flex items-center gap-4 mb-2">
                <LikeBtn
                  imageUrl={mainData.firstimage}
                  placeId={mainData.contentid}
                  title={mainData.title}
                />
                <button
                  onClick={handleShareBtn}
                  className="flex items-center gap-2 border border-gray8 p-2 rounded-lg hover:bg-gray1 transition-colors duration-300"
                >
                  <ShareIcon className="w-5 h-5" />
                  <span className="text-gray12">공유</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col mx-4 xl:mx-0">
          <p className={`${isExpanded ? '' : 'line-clamp-4'}`}>
            {filteredOverview}
          </p>
          {filteredOverview.length > 200 && (
            <button
              className="text-gray-500 mt-1 text-sm underline text-left"
              onClick={handleExpand}
            >
              {isExpanded ? '접기 ↑' : '더보기 >'}
            </button>
          )}
        </div>
        <div className="flex-col space-y-4 mx-4 xl:mx-0">
          <p className="flex gap-2">
            <MapPinIcon className="w-t h-5" />
            {mainData?.addr1}
          </p>
          {filteredHours ? (
            <p className="flex gap-2">
              <ClockIcon className="w-5 h-5 flex-shrink-0" />
              {filteredHours}
            </p>
          ) : null}
          {filteredRestDate
            ? filteredRestDate !== '' && (
                <p className="flex gap-2">
                  <CalendarDateRangeIcon className="w-t h-5 flex-shrink-0" />
                  휴무: {filteredRestDate}
                </p>
              )
            : additionalData?.eventstartdate && (
                <p className="flex gap-2">
                  <CalendarDateRangeIcon className="w-t h-5 flex-shrink-0" />
                  {additionalData?.eventstartdate &&
                    formatKoreanDate(additionalData?.eventstartdate)}
                  -
                  {additionalData?.eventenddate &&
                    formatKoreanDate(additionalData?.eventenddate)}
                </p>
              )}
          {additionalData?.treatmenu ? (
            <p className="flex gap-2">
              <BookOpenIcon className="w-t h-5 flex-shrink-0" />
              {additionalData?.treatmenu}
            </p>
          ) : null}
          {phoneNumber ? (
            <p className="flex gap-2">
              <PhoneIcon className="w-t h-5 flex-shrink-0" />
              {phoneNumber}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Details;
