'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type ItemKeys =
  | 'addr1'
  | 'addr2'
  | 'areacode'
  | 'booktour'
  | 'cat1'
  | 'cat2'
  | 'cat3'
  | 'contentid'
  | 'contenttypeid'
  | 'cpyrhtDivCd'
  | 'createdtime'
  | 'firstimage'
  | 'firstimage2'
  | 'mapx'
  | 'mapy'
  | 'mlevel'
  | 'modifiedtime'
  | 'sigungucode'
  | 'tel'
  | 'title'
  | 'zipcode';

type Item = Record<ItemKeys, string>;

function LocalListPage({ params }: { params: { region: string } }) {
  const [data, setData] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await axios.get(`/api/local-list/${params.region}`);
        if (!response) {
          throw new Error('네트워크 응답이 실패했습니다.');
        }
        const result = await response.data.response.body.items.item;
        setData(result);
      } catch (err) {
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchListData();
  }, [params.region]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {params.region} 지역의 정보 리스트
      </h1>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <div
              key={item.contentid}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={item.firstimage}
                width={300}
                height={200}
                alt="지역 썸네일"
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
}

export default LocalListPage;
