'use client';
import React, { useEffect, useState } from 'react';
import FeedBar from '../LocalFeedList/FeedBar';
import { useRouter } from 'next/navigation';
import { NearbyPlace } from '@/types/localDetails';
import { tourApi } from '@/app/api/tourApi';
import { showToast } from '@/utils/toastHelper';
import AroundLocalItem from './AroundLocalItem';
import { Regions } from '@/types/mainTypes';

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
  const router = useRouter();
  const [localitems, setLocalitems] = useState<NearbyPlace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;
  const { region }: Regions = require('@/data/regions.json');

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
    showToast('error', 'Failed to fetch location data');
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
    getLoaction();
  }, []);

  const filtercode = localitems[0]?.areacode;
  const filterdata = region.find((e) => e.code === filtercode);

  const handleClick = (contentid: string) => {
    router.push(`/local/details/${contentid}`);
  };
  return (
    <div className="flex flex-col gap-9">
      <FeedBar
        title="내 주변에 숨은"
        content="로컬들이 공유하는 장소"
        url={`/local/${filterdata?.ename}`}
      />
      <div className="flex gap-[42px] w-full">
        <ul className="flex gap-[16px] w-full h-[331px]">
          {localitems.map((item: NearbyPlace) => (
            <AroundLocalItem
              key={item.contentid}
              item={item}
              onclick={() => handleClick(item.contentid)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AroundLocalList;
