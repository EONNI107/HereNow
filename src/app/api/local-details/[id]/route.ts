import { NextResponse } from 'next/server';
import { tourApi } from '@/app/api/tourApi';

export const GET = async (
  request: Request,
  { params }: { params: { id: number } },
) => {
  const { id } = params;
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;

  try {
    const response = await tourApi.get(
      `detailCommon1?MobileOS=ETC&MobileApp=HereNow&_type=json&contentId=${id}&defaultYN=Y&firstImageYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&serviceKey=${serviceKey}`,
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '상세 정보를 불러오는데 실패했습니다.' },
      { status: 500 },
    );
  }
};
