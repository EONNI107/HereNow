import { NextRequest, NextResponse } from 'next/server';
import { tourApi } from '@/app/api/tourApi';
import regionData from '@/data/regions.json';
import dayjs from 'dayjs';

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;

  const selectedRegion = regionData.region.find(
    (region) => region.ename.toLowerCase() === id.toLowerCase(),
  );

  const areaCode = selectedRegion?.code;
  const { searchParams } = new URL(request.url);
  const pageNo = searchParams.get('pageNo') || '1';
  const sigunguCode = searchParams.get('sigunguCode');

  const today = dayjs().format('YYYYMMDD');

  try {
    const response = await tourApi.get(
      `searchFestival1?numOfRows=10&pageNo=${pageNo}&MobileOS=etc&MobileApp=HereNow&_type=json&listYN=Y&arrange=R&eventStartDate=${today}&areaCode=${areaCode}&sigunguCode=${sigunguCode}&serviceKey=${serviceKey}`,
    );
    console.log(sigunguCode);
    return NextResponse.json({
      localList: response.data.response.body?.items?.item ?? [],
      totalPage: Math.ceil(
        response.data.response.body.totalCount /
          response.data.response.body.numOfRows,
      ),
    });
  } catch (error) {
    console.error('Failed to fetch data', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
};
