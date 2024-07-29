'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocalItem from './LocalItem';
import { itemtype } from '@/types/maintype';

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
  const [localitems, setLocalitems] = useState<itemtype[]>([]);
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;

  const getLocationdata = async (latitude: number, longitude: number) => {
    try {
      const res = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?MobileOS=ETC&numOfRows=2&MobileApp=new&_type=JSON&mapX=${longitude}&mapY=${latitude}&radius=20000&contentTypeId=12&serviceKey=${serviceKey}`,
      );
      const items: itemtype[] = res.data.response.body.items.item;
      console.log(items);
      setLocalitems(items);
    } catch (error) {
      console.error('Failed to fetch location data:', error);
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

  return (
    <section className="flex flex-col gap-4 w-full px-4">
      <div className="flex justify-between">
        <h2>로컬들의 여행지</h2>
        <button>더보러가기2</button>
      </div>
      <div className="w-full">
        <ul className="w-full">
          {localitems.map((item: itemtype) => (
            <LocalItem key={item.contentid} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
