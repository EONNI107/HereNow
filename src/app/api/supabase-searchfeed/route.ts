import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const GET = async (request: Request) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const searchTitle = searchParams.get('searchValue');
  try {
    const response = await supabase
      .from('Feeds')
      .select('*')
      .ilike('content', `%${searchTitle}%`);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data from API' },
      { status: 500 },
    );
  }
};
