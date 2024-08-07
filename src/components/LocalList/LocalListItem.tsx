import { Item } from '@/types/localList';
import Image from 'next/image';
import Link from 'next/link';
import regionData from '@/data/regions.json';
import { getRegionNameKorean } from '@/utils/getRegionName';
import { getSigunguName } from '@/utils/getSigunguName';

function LocalListItem({ item, region }: { item: Item; region: string }) {
  const defaultImage = '/No_Img.jpg';
  const selectedRegion = regionData.region.find(
    (r) => r.ename.toLowerCase() === region.toLowerCase(),
  );
  return (
    <Link
      href={`/local/details/${item.contentid}`}
      key={item.contentid}
      className="border rounded-3xl overflow-hidden shadow-xl relative w-[343px] h-[140px]"
    >
      <div className="relative h-full">
        <Image
          src={item.firstimage || defaultImage}
          width={300}
          height={200}
          alt={item.title}
          className="object-cover w-full h-48"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center p-4">
          <div className="max-w-[70%]">
            <p className="font-regular text-sm text-white mb-1">
              {getRegionNameKorean(region)}{' '}
              {getSigunguName(selectedRegion?.code || '', item.sigungucode)}
            </p>
            <h2 className="font-semibold text-lg text-white mb-1">
              {item.title}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default LocalListItem;
