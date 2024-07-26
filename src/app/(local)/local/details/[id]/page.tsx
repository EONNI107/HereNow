'use client';
import KakaoMap from '@/components/LocalDetails/KakaoMap';
import LikeBtn from '@/components/LocalDetails/LikeBtn';
import { AdditionalData, MainData, NearbyPlaces } from '@/types/local-details';
import {
  BookOpenIcon,
  CalendarDateRangeIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function LocalDetailsPage({ params }: { params: { id: number } }) {
  const { id } = params;

  const [data, setData] = useState<MainData | null>(null);
  const [additionalData, setAdditionalData] = useState<AdditionalData | null>(
    null,
  );
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlaces[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<NearbyPlaces[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [restdate, setRestDate] = useState<string | null>(null);
  const [hours, setHours] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredOverview = data?.overview.replace(/<br\s*\/?>/gi, ' ') || '';
  const filteredHours = hours?.replace(/<br\s*\/?>/gi, ' ') || '';
  const filteredRestDate = restdate?.replace(/<br\s*\/?>/gi, ' ') || '';
  const latitude = Number(data?.mapy);
  const longitude = Number(data?.mapx);

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
  const typeId = data?.contenttypeid;

  useEffect(() => {
    if (nearbyPlaces) {
      setFilteredPlaces(
        nearbyPlaces.filter((place) => place.contentid !== id.toString()),
      );
    }
  }, [nearbyPlaces, id]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const response = await axios.get(`/api/local-details/${id}`);
        if (response.data) {
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
        const response = await axios.get(
          `/api/additional-details/${id}?typeId=${typeId}`,
        );
        if (response.data) {
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
    if (!data) return;
    const fetchNearbyData = async () => {
      try {
        const response = await axios.get(
          `/api/nearby-places?mapX=${longitude}&mapY=${latitude}&typeId=${typeId}`,
        );
        if (response.data) {
          setNearbyPlaces(response.data.response.body.items.item);
        } else {
          console.error('주변정보를 불러오는데 실패했습니다.');
        }
      } catch (err: any) {
        console.error(err || '주변정보를 불러올때 에러가 생겼습니다.');
      }
    };
    fetchNearbyData();
  }, [data?.mapx, data?.mapy, data?.contenttypeid]);

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

  return (
    <div>
      {data?.firstimage ? (
        <Image
          className="mx-auto my-3 mb-8"
          src={data?.firstimage}
          width={400}
          height={400}
          alt="장소 이미지"
          priority
        />
      ) : null}
      <div className="flex justify-between gap-2 mx-2">
        <h1 className="text-2xl font-bold mb-4">{data?.title}</h1>
        <LikeBtn />
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
            <MapPinIcon className="w-t h-5" /> {data?.addr1}
          </p>
          {filteredHours ? (
            <p className="flex gap-2">
              {' '}
              <ClockIcon className="w-5 h-5 flex-shrink-0" />
              {filteredHours}
            </p>
          ) : null}
          {filteredRestDate ? (
            <p className="flex gap-2">
              {' '}
              <CalendarDateRangeIcon className="w-t h-5 flex-shrink-0" /> 휴무:{' '}
              {filteredRestDate}{' '}
            </p>
          ) : (
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
      <KakaoMap latitude={latitude} longitude={longitude} />

      {filteredPlaces && (
        <div className="mx-2">
          <p className="font-bold text-md mt-8">주변 추천 장소</p>
          <div className="flex overflow-x-auto gap-4 mt-3 pb-4">
            {filteredPlaces.map((place: any) => (
              <Link
                key={place.contentid}
                href={`/local/details/${place.contentid}`}
                className="w-40"
              >
                <div className="w-full">
                  <div className="relative w-40 h-40 mb-2">
                    <Image
                      className="rounded-lg object-cover"
                      src={place.firstimage}
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

export default LocalDetailsPage;
