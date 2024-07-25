import { NextRequest, NextResponse } from 'next/server';
import { tourApi } from '../../tourApi';
import { region } from '@/data/region.json';

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;
  console.log(params);
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;
  const selectedRegion = region.find(
    (region) => region.ename.toLowerCase() === id.toLowerCase(),
  );
  console.log('selectedRegion =>', selectedRegion);
  const areaCode = selectedRegion?.code;
  const { searchParams } = new URL(request.url);
  const pageNo = searchParams.get('pageNo') || '1';
  const contentTypeId = searchParams.get('contentTypeId');
  try {
    const response = await tourApi.get(
      `areaBasedList1?numOfRows=10&pageNo=${pageNo}&MobileOS=etc&MobileApp=HereNow&_type=json&listYN=Y&arrange=R&contentTypeId=12&areaCode=${areaCode}&serviceKey=${serviceKey}`,
    );
    console.log(response.data.response);

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
