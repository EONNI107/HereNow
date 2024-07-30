import { NextResponse } from 'next/server';
import { tourApi } from '../tourApi';

export const GET = async (request: Request) => {
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;
  const urlParams = new URL(request.url).searchParams;
  const latitude = urlParams.get('mapX');
  const longitude = urlParams.get('mapY');
  const typeId = urlParams.get('typeId');

  try {
    const response = await tourApi.get(
      `locationBasedList1?numOfRows=10&MobileOS=ETC&MobileApp=HereNow&_type=json&arrange=Q&mapX=${latitude}&mapY=${longitude}&radius=2000&contentTypeId=${typeId}&serviceKey=${serviceKey}
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
