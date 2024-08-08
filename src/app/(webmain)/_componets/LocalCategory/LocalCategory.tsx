'use client';
import { Regions } from '@/types/mainTypes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

function LocalCategory() {
  const router = useRouter();
  const regions: Regions = require('@/data/regions.json');

  const handleClick = (i: string) => {
    router.push(`/local/${i}`);
  };

  return (
    <section className="w-full py-10 cursor-pointer flex gap-[34px] items-center">
      <div>
        <button className="button-prev bg-gray-300 rounded-full p-2"></button>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.button-next',
          prevEl: '.button-prev',
        }}
        slidesPerView={10}
        slidesPerGroup={1}
        className="w-[1124px] py-[40px]"
      >
        {regions.region.map((i) => (
          <SwiperSlide key={i.ename} className="flex justify-center">
            <div
              className="flex flex-col items-center"
              onClick={() => handleClick(i.ename)}
            >
              <div className="h-[68px] w-[68px] rounded-full">
                <Image
                  src={i.image}
                  alt={i.name}
                  width={68}
                  height={68}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <div>{i.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <button className="button-next bg-gray-300 rounded-full p-2"></button>
      </div>
    </section>
  );
}

export default LocalCategory;
