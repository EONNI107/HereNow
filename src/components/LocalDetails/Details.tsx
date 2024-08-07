import LikeBtn from '@/components/LocalDetails/LikeBtn';
import dayjs from 'dayjs';
import {
  BookOpenIcon,
  CalendarDateRangeIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react';
import { DetailProps } from '@/types/localDetails';

function Details({ mainData, additionalData, typeId }: DetailProps) {
  const defaultImage = '/No_Img.jpg';
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
    mainData?.overview.replace(/<br\s*\/?>/gi, ' ') || '';
  const filteredHours = hours?.replace(/<br\s*\/?>/gi, ' ') || '';
  const filteredRestDate = restdate?.replace(/<br\s*\/?>/gi, ' ') || '';

  return (
    <>
      {mainData?.firstimage ? (
        <div className="relative w-full h-[300px] mx-auto mb-2">
          <Image
            src={mainData?.firstimage || defaultImage}
            alt="장소 이미지"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            priority
          />
        </div>
      ) : null}
      <div className="flex justify-between gap-2 mx-4">
        <h1 className="text-2xl font-bold mb-4">{mainData?.title}</h1>
        {mainData?.contentid && (
          <LikeBtn
            imageUrl={mainData?.firstimage}
            placeId={mainData.contentid}
          />
        )}
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col mx-4">
          <p className={`${isExpanded ? '' : 'line-clamp-4'}`}>
            {filteredOverview}
          </p>
          {filteredOverview.length > 128 && (
            <button
              className="text-gray-500 mt-1 text-sm underline text-left"
              onClick={handleExpand}
            >
              {isExpanded ? '접기 ↑' : '더보기 >'}
            </button>
          )}
        </div>
        <div className="flex-col space-y-4 mx-4">
          <p className="flex gap-2">
            <MapPinIcon className="w-t h-5" /> {mainData?.addr1}
          </p>
          {filteredHours ? (
            <p className="flex gap-2">
              {' '}
              <ClockIcon className="w-5 h-5 flex-shrink-0" />
              {filteredHours}
            </p>
          ) : null}
          {filteredRestDate
            ? filteredRestDate !== '' && (
                <p className="flex gap-2">
                  {' '}
                  <CalendarDateRangeIcon className="w-t h-5 flex-shrink-0" />{' '}
                  휴무: {filteredRestDate}{' '}
                </p>
              )
            : additionalData?.eventstartdate && (
                <p className="flex gap-2">
                  <CalendarDateRangeIcon className="w-t h-5 flex-shrink-0" />{' '}
                  {additionalData?.eventstartdate &&
                    formatKoreanDate(additionalData?.eventstartdate)}{' '}
                  -{' '}
                  {additionalData?.eventenddate &&
                    formatKoreanDate(additionalData?.eventenddate)}
                </p>
              )}
          {additionalData?.treatmenu ? (
            <p className="flex gap-2">
              <BookOpenIcon className="w-t h-5 flex-shrink-0" />{' '}
              {additionalData?.treatmenu}
            </p>
          ) : null}

          {phoneNumber ? (
            <p className="flex gap-2">
              <PhoneIcon className="w-t h-5 flex-shrink-0" /> {phoneNumber}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Details;
