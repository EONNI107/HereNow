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
    <div className="relative h-48 mb-4">
      <Image
        src={selectedImage}
        alt={`${getRegionNameKorean(region)} 이미지`}
        width={300}
        height={200}
        priority={true}
        className="object-cover w-full h-48"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
        <h1 className="font-pretendard font-semibold text-[28px] text-white">
          {getRegionNameEnglish(region).toUpperCase()}
        </h1>
      </div>
    </div>
  );
}

export default RegionHeader;
