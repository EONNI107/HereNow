import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const placeId = searchParams.get('placeId');

  if (!userId || !placeId) {
    return NextResponse.json(
      { error: 'userId 혹은 placeId 가 없습니다.' },
      { status: 400 },
    );
  }

  try {
    const { data: likeData, error } = await supabase
      .from('PlaceLikes')
      .select('id')
      .eq('userId', userId)
      .eq('placeId', placeId);

    if (error) {
      console.error('데이터베이스 에러:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(!!likeData[0]);
  } catch (error) {
    console.error('예기치 못한 에러:', error);
    return NextResponse.json({ error: '내부서버 에러' }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const supabase = createClient();

  const { userId, placeId, imageUrl, title } = await request.json();

  if (!userId || !placeId) {
    return NextResponse.json(
      { error: 'userId 혹은 placeId 를 찾을수 없습니다.' },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await supabase
      .from('PlaceLikes')
      .insert([{ userId, placeId, imageUrl, title }])
      .select();

    if (error) {
      console.error('데이터베이스 에러:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('예기치 못한 에러:', error);
    return NextResponse.json({ error: '내부서버 에러' }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const supabase = createClient();

  const { userId, placeId, imageUrl } = await request.json();

  if (!userId || !placeId) {
    return NextResponse.json(
      { error: 'userId 혹은 placeId 를 찾을수 없습니다.' },
      { status: 400 },
    );
  }

  try {
    const { error } = await supabase
      .from('PlaceLikes')
      .delete()
      .eq('userId', userId)
      .eq('placeId', placeId)
      .eq('imageUrl', imageUrl);

    if (error) {
      console.error('데이터베이스 에러:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(null);
  } catch (error) {
    console.error('예기치 못한 에러:', error);
    return NextResponse.json({ error: '내부서버 에러' }, { status: 500 });
  }
};
