import { NextResponse } from 'next/server';
import { tourApi } from '../tourApi';
import axios from 'axios';

export const GET = async (request: Request) => {
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;
  const urlParams = new URL(request.url).searchParams;
  const xValue = urlParams.get('mapX');
  const yValue = urlParams.get('mapY');
  const typeId = urlParams.get('typeId');

  try {
    const response = await tourApi.get(
      `locationBasedList1?MobileOS=ETC&MobileApp=HereNow&_type=json&arrange=Q&mapX=${xValue}&mapY=${yValue}&radius=2000&contentTypeId=${typeId}&serviceKey=${serviceKey}
    `,
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: '주변 정보를 불러오는데 실패했습니다.',
      },
      { status: 500 },
    );
  }
};
