'use client';
import { Regions } from '@/types/mainType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
function LocalItemList() {
  const router = useRouter();

  const regions: Regions = require('@/data/regions.json');

  const handleClick = (i: string) => {
    router.push(`/local/${i}`);
  };

  return (
    <section className="mb-4">
      <div className="flex overflow-x-scroll whitespace-nowrap py-4 cursor-pointer">
        {regions.region.map((i) => (
          <div
            key={i.ename}
            className="flex flex-col mx-2"
            onClick={() => handleClick(i.ename)}
          >
            <div className="h-[68px] w-[68px] rounded-full border">
              <Image
                src={i.image}
                alt="이미지"
                width={68}
                height={68}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="text-center mt-2">{i.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default LocalItemList;
