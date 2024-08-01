import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { searchValue, title } = await request.json();
  console.log(searchValue);
  try {
    const response = await supabase
      .from('Feeds')
      .select('*')
      .ilike('content', `%${searchValue}%`)
      .ilike('title', `%${title}%`);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data from API' },
      { status: 500 },
    );
  }
}
