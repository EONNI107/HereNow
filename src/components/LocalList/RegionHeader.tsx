import { regionImages } from '@/constants/regionImages';
import {
  getRegionNameEnglish,
  getRegionNameKorean,
} from '@/utils/getRegionName';
import Image from 'next/image';

function RegionHeader({ region }: { region: string }) {
  const normalizedRegion = region.toLowerCase().replace(/-/g, '');
  const selectedImage = regionImages[normalizedRegion];
  return (
    <div className="relative mb-4">
      <div className="relative aspect-[16/9] max-w-[1920px] w-full mx-auto !px-0 h-48 xl:h-[500px] overflow-hidden">
        <Image
          src={selectedImage}
          alt={`${getRegionNameKorean(region)} 이미지`}
          width={1600}
          height={900}
          priority={true}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center xl:items-start xl:justify-start">
          <div className="xl:ml-[15%] xl:mt-[15%]">
            <h1 className="font-semibold text-[28px] text-white xl:text-[48px] xl:mb-4">
              {getRegionNameEnglish(region).toUpperCase()}
            </h1>
            <p className="hidden xl:block text-white text-[24px] font-medium">
              {getRegionNameKorean(region)}의 여행지를 둘러보세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegionHeader;
