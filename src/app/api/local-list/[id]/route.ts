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
  try {
    const response = await tourApi.get(
      `/areaBasedList1?numOfRows=10&pageNo=1&MobileOS=etc&MobileApp=HereNow&_type=json&listYN=Y&arrange=R&contentTypeId=12&areaCode=${areaCode}&serviceKey=${serviceKey}`,
    );

    console.log('response.data =>', response.data);
    return NextResponse.json({
      ...response.data,
      regionName: selectedRegion?.name || id,
    });
  } catch (error) {
    console.error('Failed to fetch data', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
};
