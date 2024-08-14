import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json(data.user, { status: 201 });
  }
};
