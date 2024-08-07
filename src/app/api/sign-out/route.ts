import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json(
      { error: '로그아웃에 실패했습니다.' },
      { status: 500 },
    );
  } else {
    return NextResponse.json(
      { message: '로그아웃이 완료되었습니다' },
      { status: 200 },
    );
  }
};
