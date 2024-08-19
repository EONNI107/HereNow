'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NearbyPlace } from '@/types/localDetails';
import { tourApi } from '@/app/api/tourApi';
import { showToast } from '@/utils/toastHelper';
import AroundLocalItem from './AroundLocalItem';
import { Regions } from '@/types/mainTypes';
import WebMainBar from '../WebMainBar';
import { useModal } from '@/components/Modal/Modal';
import { useCookies } from 'react-cookie';
import Image from 'next/image';
import SkeletonLocation from '@/components/MainPage/Skeleton/SkeletonLocation';

type PositionType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

type GeolocationError = {
  code: number;
  message: string;
};
function AroundLocalList() {
  const { isGetPosition, SetIsGetPosition } = useModal();
  const router = useRouter();
  const [isNotLocation, setIsNotLocation] = useState<boolean>(false);
  const [localitems, setLocalitems] = useState<NearbyPlace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;
  const { region }: Regions = require('@/data/regions.json');
  const [cookies, setCookies] = useCookies();
  const getLocationData = async (latitude: number, longitude: number) => {
    try {
      const res = await tourApi(
        `/locationBasedList1?MobileOS=ETC&numOfRows=3&MobileApp=new&_type=JSON&mapX=${longitude}&mapY=${latitude}&radius=20000&contentTypeId=12&serviceKey=${serviceKey}`,
      );

      const items: NearbyPlace[] = res.data.response.body.items.item;
      setLocalitems(items);
      setLoading(false);
    } catch (error) {
      showToast('error', 'Failed to fetch location data');
      setLoading(false);
    }
  };
  const getLoactionSuc = async (position: PositionType) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    await getLocationData(latitude, longitude);
  };

  const getLocationErr = (error: GeolocationError) => {
    showToast(
      'error',
      '데스크탑이나 스마트폰의 위치를 직접 승인해주시기 바랍니다.',
    );
  };
  const getLoaction = () => {
    const option = {
      enableHighAccuracy: true,
      maximumAge: 360000,
      timeout: 30000,
    };
    navigator.geolocation.getCurrentPosition(
      getLoactionSuc,
      getLocationErr,
      option,
    );
  };

  useEffect(() => {
    const getSortLoaction = () => {
      if (isGetPosition) {
        getLoaction();
        setIsNotLocation(true);
      }
    };
    getSortLoaction();
    if (cookies['MODAL_EXPIRES'] && cookies['MODAL_LOCATION']) {
      getLoaction();
      SetIsGetPosition(true);
    }
  }, [isGetPosition]);

  const filtercode = localitems[0]?.areacode;
  const filterdata = region.find((e) => e.code === filtercode);

  const handleClick = (contentid: string) => {
    router.push(`/local/details/${contentid}`);
  };
  return (
    <>
      {isNotLocation ? (
        <div className="w-full flex flex-col gap-9">
          <WebMainBar
            title="가장 인기있는"
            content="내 주변의 관광명소"
            url={`/local/${filterdata?.ename}`}
          />
          <ul className="flex gap-[42px]">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonLocation key={index} />
                ))
              : localitems.map((item: NearbyPlace) => (
                  <AroundLocalItem
                    key={item.contentid}
                    item={item}
                    onclick={() => handleClick(item.contentid)}
                  />
                ))}
          </ul>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-[64px]">
          <WebMainBar
            title="가장 인기있는"
            content="내 주변의 관광명소"
            url={`/local/${filterdata?.ename}`}
          />
          <Image
            src="/No_Location.jpg"
            alt="notLocation"
            width={1240}
            height={180}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </>
  );
}

export default AroundLocalList;
