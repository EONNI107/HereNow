import { NextResponse } from 'next/server';
import { tourApi } from '../tourApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const contentId = searchParams.get('contentId');
  const encodeQuery = encodeURI(`${query}`);
  const serviceKey = process.env.NEXT_PUBLIC_TOURAPI_KEY;
  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 },
    );
  }
  try {
    const response = await tourApi.get(
      `/searchKeyword1?MobileOS=ETC&MobileApp=NEW&_type=json&numOfRows=10&arrange=O&keyword=${encodeQuery}&contentTypeId=${contentId}&serviceKey=${serviceKey}`,
    );

    const items = response.data.response.body.items.item;
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data from API' },
      { status: 500 },
    );
  }
}
