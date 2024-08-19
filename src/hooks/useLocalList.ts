import { Item } from '@/types/localList';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

type LocalListData = {
  localList: Item[];
  totalPage: number;
};

function useLocalList(
  region: string,
  sigunguCode: string,
  contentType: string,
) {
  return useInfiniteQuery<
    LocalListData,
    Error,
    LocalListData,
    string[],
    number
  >({
    queryKey: ['localList', region, sigunguCode, contentType],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get<LocalListData>(
        contentType === '15'
          ? `/api/local-event/${region}?pageNo=${pageParam}&sigunguCode=${sigunguCode}`
          : `/api/local-list/${region}?pageNo=${pageParam}&contentTypeId=${contentType}&sigunguCode=${sigunguCode}`,
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: LocalListData,
      allPages: LocalListData[],
      lastPageParam: number,
    ) => {
      return lastPageParam === lastPage.totalPage
        ? undefined
        : lastPageParam + 1;
    },
    select: (data: { pages: LocalListData[] }) => ({
      localList: data.pages.flatMap((page) => page.localList),
      totalPage: data.pages[0].totalPage,
    }),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export default useLocalList;
