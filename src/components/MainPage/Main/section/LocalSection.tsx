'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { itemtype } from '@/types/maintype';
import { useRouter } from 'next/navigation';
import LocalItem from './LocalItem';

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

export default function LocalSection() {
  const router = useRouter();
  const [localitems, setLocalitems] = useState<itemtype[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;

  function SkeletonItem() {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-200 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const getLocationdata = async (latitude: number, longitude: number) => {
    try {
      const res = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?MobileOS=ETC&numOfRows=2&MobileApp=new&_type=JSON&mapX=${longitude}&mapY=${latitude}&radius=20000&contentTypeId=12&serviceKey=${serviceKey}`,
      );
      const items: itemtype[] = res.data.response.body.items.item;
      console.log(items);
      setLocalitems(items);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch location data:', error);
      setLoading(false);
    }
  };

  const getLoactionSuc = async (position: PositionType) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    await getLocationdata(latitude, longitude);
  };

  const getLocationErr = (error: GeolocationError) => {
    alert(`Error (${error.code}): ${error.message}`);
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
  const handleClick = (contentid: string) => {
    router.push(`/local/details/${contentid}`);
  };
  return (
    <section className="flex flex-col gap-4 w-full px-4">
      <div className="flex justify-between">
        <h2>로컬들의 여행지</h2>
        <button>더보러가기2</button>
      </div>
      <div className="w-full">
        <ul className="w-full">
          {loading
            ? Array.from({ length: 2 }).map((_, index) => (
                <SkeletonItem key={index} />
              ))
            : localitems.map((item: itemtype) => (
                <LocalItem
                  key={item.contentid}
                  item={item}
                  onclick={() => handleClick(item.contentid)}
                />
              ))}
        </ul>
      </div>
    </section>
  );
}
