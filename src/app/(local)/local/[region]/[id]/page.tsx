'use client';

import Like from '@/components/LocalDetails/like';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const LocalDetailsPage = () => {
  const id = 2871024;

  const [data, setData] = useState<any>(null);
  const [additionalData, setAdditionalData] = useState<any>(null);

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const response = await axios.get(`/api/local-details/${id}`);

        if (response.data.response.body.items.item[0]) {
          setData(response.data.response.body.items.item[0]);
        } else {
          throw new Error('데이터를 찾을수 없습니다.');
        }
      } catch (err: any) {
        console.error(err || '데이터를 불러오는데 실패하였습니다.');
      }
    };
    fetchMainData();
  }, []);

  useEffect(() => {
    if (!data) return;
    const fetchAdditionalData = async () => {
      try {
        const typeId = data?.contenttypeid;

        const response = await axios.get(
          `/api/additional-details/${id}?typeId=${typeId}`,
        );

        console.log(response);

        if (response.data.response.body.items.item[0]) {
          setAdditionalData(response.data.response.body.items.item[0]);
        } else {
          throw new Error('데이터를 찾을수 없습니다.');
        }
      } catch (err: any) {
        console.error(err || '데이터를 불러오는데 실패하였습니다.');
      }
    };
    fetchAdditionalData();
  }, [data, id]);

  console.log(data);
  console.log(additionalData);

  return (
    <div>
      {data?.firstimage ? (
        <Image
          className="mx-auto my-3"
          src={data?.firstimage}
          width={400}
          height={400}
          alt="장소 이미지"
        />
      ) : null}
      <div>
        <h1>{data?.title}</h1>
        <Like />
      </div>
      <p>{data?.addr1}</p>
      <p>{data?.zipcode}</p>
      <p>{data?.overview}</p>
      <p>{data?.mapx}</p>
      <p>{data?.mapy}</p>
      <p>{additionalData?.opentimefood}</p>
    </div>
  );
};

export default LocalDetailsPage;
