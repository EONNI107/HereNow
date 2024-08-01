'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Regions } from '@/types/mainType';
function LocalItemList() {
  const router = useRouter();

  const regions: Regions = require('@/data/regions.json');

  const handleClick = (i: string) => {
    router.push(`/local/${i}`);
  };

  return (
    <section>
      <div className="flex overflow-x-scroll whitespace-nowrap py-4 cursor-pointer">
        {regions.region.map((i) => (
          <div
            key={i.ename}
            className="flex flex-col mx-2"
            onClick={() => handleClick(i.ename)}
          >
            <div className="relative h-[68px] w-[68px] rounded-full border">
              <Image
                src={i.image}
                alt="이미지"
                layout="fill"
                className="rounded-full object-cover"
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
