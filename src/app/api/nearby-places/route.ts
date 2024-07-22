import axios from 'axios';
import { NextResponse } from 'next/server';
import { tourApi } from '../tourApi';

export const GET = async (request: Request) => {
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;
  const xValue = '';
  const yValue = '';

  try {
    const response = await tourApi.get(
      `locationBasedList1?MobileOS=ETC&MobileApp=HereNow&mapX=${xValue}&mapY=${yValue}&radius=5000&serviceKey=${serviceKey}`,
    );
    const nearbyPlaces = response.data;
    return NextResponse.json(nearbyPlaces);
  } catch {
    return NextResponse.json({
      error: '주변 정보를 불러오는데 실패했습니다.',
    });
  }
};
