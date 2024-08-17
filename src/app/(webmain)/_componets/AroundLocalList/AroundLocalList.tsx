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
  const getSortLoaction = () => {
    if (isGetPosition) {
      setIsNotLocation(true);
    }
  };
  useEffect(() => {
    getLoaction();
    getSortLoaction();
    if (cookies['MODAL_EXPIRES'] && cookies['MODAL_LOCATION']) {
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
            {localitems.map((item: NearbyPlace) => (
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
