import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import LocationDropdown from '@/components/FeedWrite/LocationDropdown';

type LocationButtonProps = {
  region: string;
  sigungu: string;
  setRegion: (value: string) => void;
  setSigungu: (value: string) => void;
  isDesktop: boolean;
};

function LocationButton({
  region,
  sigungu,
  setRegion,
  setSigungu,
  isDesktop,
}: LocationButtonProps) {
  const [showDropdown, setShowDropdown] = useState(true);

  if (isDesktop) {
    return (
      <div className="flex">
        <button className="btn text-orange4 mr-4 border-orange4 border-[1px] w-[104px] h-[46px] rounded-lg flex items-center cursor-default text-[20px] font-semibold justify-center hover:bg-orange4 hover:text-white transition-colors duration-300">
          <span>위치 추가</span>
        </button>
        {showDropdown && (
          <div className="flex-grow">
            <LocationDropdown
              region={region}
              sigungu={sigungu}
              setRegion={setRegion}
              setSigungu={setSigungu}
              isDesktop={isDesktop}
            />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <>
        <div className="flex bg-orange0 w-full h-18 text-left items-center px-4 py-2 mb-4 rounded-lg">
          <div className="px-2 py-1 mb-7 mt-2">
            <MapPinIcon className="w-5 h-5" />
          </div>
          <div className="pl-1.5">
            <div className="font-semibold text-lg">위치 추가하기</div>
            <div className="text-sm font-normal">
              다른 사람들이 장소를 쉽게 찾을 수 있어요!
            </div>
          </div>
        </div>
        {showDropdown && (
          <LocationDropdown
            region={region}
            sigungu={sigungu}
            setRegion={setRegion}
            setSigungu={setSigungu}
            isDesktop={isDesktop}
          />
        )}
      </>
    );
  }
}

export default LocationButton;
