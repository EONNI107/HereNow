import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import LocationDropdown from '@/components/FeedWrite/LocationDropdown';

type LocationButtonProps = {
  region: string;
  sigungu: string;
  setRegion: (value: string) => void;
  setSigungu: (value: string) => void;
};

function LocationButton({
  region,
  sigungu,
  setRegion,
  setSigungu,
}: LocationButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddLocation = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleAddLocation}
        className="btn flex bg-orange0 w-full h-18 text-left items-center px-4 py-2 mb-4 rounded-lg"
      >
        <span className="px-2 py-1 mb-7 mt-2">
          <MapPinIcon className="w-5 h-5" />
        </span>
        <span className="pl-1.5">
          <div className="font-semibold text-lg">위치 추가하기</div>
          <div className="text-sm font-normal">
            다른 사람들이 장소를 쉽게 찾을 수 있어요!
          </div>
        </span>
      </button>
      {showDropdown && (
        <LocationDropdown
          region={region}
          sigungu={sigungu}
          setRegion={setRegion}
          setSigungu={setSigungu}
        />
      )}
      {region && <p className="my-2">선택된 지역: {region}</p>}
      {sigungu && <p className="mb-4">선택된 시/군/구: {sigungu}</p>}
    </>
  );
}

export default LocationButton;
