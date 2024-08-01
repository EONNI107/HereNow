'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LocalItem from './LocalItem';
import { tourApi } from '@/app/api/tourApi';
import { NearbyPlace } from '@/types/local-details';
import SkeletonSearchItem from '../../Skeleton/SkeletonSearchItem';

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

function LocalSection() {
  const router = useRouter();
  const [localitems, setLocalitems] = useState<NearbyPlace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;

  const getLocationData = async (latitude: number, longitude: number) => {
    try {
      const res = await tourApi(
        `/locationBasedList1?MobileOS=ETC&numOfRows=2&MobileApp=new&_type=JSON&mapX=${longitude}&mapY=${latitude}&radius=20000&contentTypeId=12&serviceKey=${serviceKey}`,
      );

      const items: NearbyPlace[] = res.data.response.body.items.item;
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
    await getLocationData(latitude, longitude);
  };

  const getLocationErr = (error: GeolocationError) => {
    console.error('Failed to fetch location data:', error);
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
                <SkeletonSearchItem key={index} />
              ))
            : localitems.map((item: NearbyPlace) => (
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
export default LocalSection;
