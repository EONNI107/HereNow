'use client';
import LikeBtn from '@/components/LocalDetails/LikeBtn';
import { AdditionalData, ContentType, MainData } from '@/types/local-details';
import {
  BookOpenIcon,
  CalendarDateRangeIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function LocalDetailsPage() {
  // const id = 2871024;
  const id = 2871024;

  const [data, setData] = useState<MainData | null>(null);
  const [additionalData, setAdditionalData] = useState<AdditionalData | null>(
    null,
  );
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [restdate, setRestDate] = useState<string | null>(null);
  const [hours, setHours] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredHours = hours?.replace(/<br\s*\/?>/gi, ' ') || '';
  const filteredRestDate = restdate?.replace(/<br\s*\/?>/gi, ' ') || '';
  const formatKoreanDate = (dateStr: string) => {
    if (dateStr.length !== 8) {
      throw new Error('YYYYMMDD 형식이 아닙니다.');
    }
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const response = await axios.get(`/api/local-details/${id}`);
        if (response.data.response.body.items.item[0]) {
          setData(response.data.response.body.items.item[0]);
        } else {
          throw new Error('데이터를 찾을수 없습니다.');
        }
      } catch (err: any) {
        console.error(err || '데이터를 불러오는데 실패하였습니다.');
      }
    };
    fetchMainData();
  }, []);

  useEffect(() => {
    if (!data) return;
    const fetchAdditionalData = async () => {
      try {
        const typeId = data?.contenttypeid;
        const response = await axios.get(
          `/api/additional-details/${id}?typeId=${typeId}`,
        );
        if (response.data.response.body.items.item[0]) {
          setAdditionalData(response.data.response.body.items.item[0]);
        } else {
          throw new Error('데이터를 찾을수 없습니다.');
        }
      } catch (err: any) {
        console.error(err || '데이터를 불러오는데 실패하였습니다.');
      }
    };
    fetchAdditionalData();
  }, [data, id]);

  useEffect(() => {
    if (data?.contenttypeid && additionalData) {
      const contentTypeId = Number(data.contenttypeid);
      const getPhoneNumber = () => {
        switch (contentTypeId) {
          case 12: //관광지
            return additionalData.infocenter ?? null;
          case 14: // 문화시설
            return additionalData.infocenterculture ?? null;
          case 15: // 축제공연행사
            return additionalData.sponsor1tel ?? null;
          case 39: // 음식점
            return additionalData.infocenterfood ?? null;
          default:
            return null;
        }
      };
      const getRestDate = () => {
        switch (contentTypeId) {
          case 12: //관광지
            return additionalData.restdate ?? null;
          case 14: // 문화시설
            return additionalData.restdateculture ?? null;
          case 39: // 음식점
            return additionalData.restdatefood ?? null;
          default:
            return null;
        }
      };
      const getHours = () => {
        switch (contentTypeId) {
          case 14: // 문화시설
            return additionalData.usetimeculture ?? null;
          case 15: // 축제공연행사
            return additionalData.playtime ?? null;
          case 39: // 음식점
            return additionalData.opentimefood ?? null;
          default:
            return null;
        }
      };

      setPhoneNumber(getPhoneNumber());
      setRestDate(getRestDate());
      setHours(getHours());
    }
  }, [data, additionalData]);

  console.log(data);
  console.log(additionalData);

  return (
    <div>
      {data?.firstimage ? (
        <Image
          className="mx-auto my-3"
          src={data?.firstimage}
          width={400}
          height={400}
          alt="장소 이미지"
        />
      ) : null}
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
        <LikeBtn />
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <p className={`${isExpanded ? '' : 'line-clamp-4'}`}>
            {data?.overview}
          </p>
          <button
            className="text-gray-500 mt-1 text-sm underline text-left"
            onClick={handleExpand}
          >
            {isExpanded ? '접기 ↑' : '더보기 >'}
          </button>
        </div>
        <p className="flex gap-2">
          <MapPinIcon className="w-t h-5" /> {data?.addr1}
        </p>
        {filteredHours ? (
          <p className="flex gap-2">
            {' '}
            <ClockIcon className="w-5 h-5" />
            {filteredHours}
          </p>
        ) : null}
        {filteredRestDate ? (
          <p className="flex gap-2">
            {' '}
            <CalendarDateRangeIcon className="w-t h-5" /> {filteredRestDate}{' '}
            휴무
          </p>
        ) : (
          <p className="flex gap-2">
            <CalendarDateRangeIcon className="w-t h-5" />{' '}
            {additionalData?.eventstartdate &&
              formatKoreanDate(additionalData?.eventstartdate)}{' '}
            -{' '}
            {additionalData?.eventenddate &&
              formatKoreanDate(additionalData?.eventenddate)}
          </p>
        )}
        {additionalData?.firstmenu ? (
          <p className="flex gap-2">
            <BookOpenIcon className="w-t h-5" /> {additionalData?.firstmenu}
          </p>
        ) : null}

        <p className="flex gap-2">
          <PhoneIcon className="w-t h-5" /> {phoneNumber}
        </p>
      </div>
      {/* 
      <p>{data?.mapx}</p>
      <p>{data?.mapy}</p> */}
    </div>
  );
}

export default LocalDetailsPage;
