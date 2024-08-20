import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const POST = async (request: Request) => {
  const supabase = createClient();
  const { searchValue, title } = await request.json();
  try {
    const { data: initialData, error: initialError } = await supabase
      .from('Feeds')
      .select('*')
      .or(`title.ilike.%${searchValue}%,content.ilike.%${searchValue}%`);

    if (initialError) {
      throw initialError;
    }

    const filteredData = initialData.filter(
      (item) =>
        item.title.toLowerCase().includes(title.toLowerCase()) ||
        item.content.toLowerCase().includes(title.toLowerCase()),
    );
    console.log(filteredData);
    return NextResponse.json(filteredData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data from API' },
      { status: 500 },
    );
  }
};
