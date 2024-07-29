'use client';
import { Regions } from '@/types/maintype';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
export default function LocalItemList() {
  const region: Regions = require('@/data/regions.json');

  return (
    <section>
      <div className="flex w-full">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={6}
          slidesPerGroup={6}
        >
          {region.region.map((i) => (
            <SwiperSlide key={i.code}>
              <div key={i.code}>
                <div className="relative w-full h-[68px] rounded-full border">
                  <Image src={i.image} alt="이미지" fill />
                </div>
                <div>{i.name}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
