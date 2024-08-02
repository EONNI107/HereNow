import { NextResponse } from 'next/server';
import { tourApi } from '../../tourApi';

export const GET = async (
  request: Request,
  { params }: { params: { id: number } },
) => {
  const { id } = params;
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;
  const urlParams = new URL(request.url).searchParams;
  const typeId = urlParams.get('typeId');

  if (!typeId) {
    return NextResponse.json(
      {
        error: 'typeId 가 없습니다.',
      },
      { status: 400 },
    );
  }
  try {
    const response = await tourApi.get(
      `detailIntro1?MobileOS=ETC&MobileApp=HereNow&_type=json&contentId=${id}&contentTypeId=${typeId}&serviceKey=${serviceKey}`,
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
