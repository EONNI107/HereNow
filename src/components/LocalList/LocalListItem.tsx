import { Item } from '@/types/localList';
import Image from 'next/image';
import Link from 'next/link';
import regionData from '@/data/regions.json';
import { getRegionNameKorean } from '@/utils/getRegionName';
import { getSigunguName } from '@/utils/getSigunguName';
import LikeBtn from '../LocalDetails/LikeBtn';

function LocalListItem({ item, region }: { item: Item; region: string }) {
  const defaultImage = '/NoImg-v3.png';
  const selectedRegion = regionData.region.find(
    (r) => r.ename.toLowerCase() === region.toLowerCase(),
  );

  return (
    <div className="border rounded-3xl overflow-hidden shadow-xl relative w-[343px] h-[140px] xl:w-auto xl:h-auto xl:rounded-xl group">
      <div className="relative">
        <Link href={`/local/details/${item.contentid}`}>
          <Image
            src={item.firstimage || defaultImage}
            width={600}
            height={480}
            alt={item.title}
            className="object-cover w-full h-48"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center p-4 xl:hidden">
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
        </Link>
        <Link href={`/local/details/${item.contentid}`}>
          <div className="hidden xl:flex absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
            <div className="text-white text-center">
              <p className="font-semibold text-lg">
                {getRegionNameKorean(region)}{' '}
                {getSigunguName(selectedRegion?.code || '', item.sigungucode)}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="hidden xl:block">
        <div className="flex items-center justify-between border-l border-r border-b rounded-b-xl bg-white p-3">
          <h2 className="font-semibold text-lg truncate pr-4">{item.title}</h2>
          <LikeBtn
            imageUrl={item.firstimage}
            placeId={item.contentid}
            isInLocalList={true}
          />
        </div>
      </div>
    </div>
  );
}

export default LocalListItem;
