import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { email, password, nickname } = await request.json();
  const supabase = createClient();

  const { data: existingUser } = await supabase
    .from('Users')
    .select('email')
    .eq('email', email)
    .single();

  if (existingUser) {
    return NextResponse.json(
      { error: '이미 사용 중인 이메일입니다' },
      { status: 400 },
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: nickname,
      },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json(
      { message: `회원 가입에 성공했습니다` },
      { status: 201 },
    );
  }
};
