// import { MapPinIcon } from '@heroicons/react/24/outline';

// type LocationButtonProps = {
//   location: string;
//   setLocation: (value: string) => void;
// };

// const LocationButton = ({ location, setLocation }: LocationButtonProps) => {
//   const handleAddLocation = () => {
//     const loc = prompt('위치를 추가하세요');
//     if (loc) {
//       setLocation(loc);
//     }
//   };

//   return (
//     <>
//       <button
//         type="button"
//         onClick={handleAddLocation}
//         className="btn self-start bg-red-50 w-full h-14 text-left pl-2"
//       >
//         <span className="text-sm flex font-bold">
//           <MapPinIcon className="w-6 h-6 mr-2 ml-4" />
//           위치 추가하기
//         </span>
//         <span className="text-xs ml-12">
//           다른 사람들이 장소를 쉽게 찾을 수 있어요!
//         </span>
//       </button>
//       {location && <p>{location}</p>}
//     </>
//   );
// };

// export default LocationButton;

import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import LocationDropdown from './LocationDropdown';

type LocationButtonProps = {
  region: string;
  sigungu: string;
  setRegion: (value: string) => void;
  setSigungu: (value: string) => void;
};

const LocationButton = ({
  region,
  sigungu,
  setRegion,
  setSigungu,
}: LocationButtonProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddLocation = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleAddLocation}
        className="btn self-start bg-red-50 w-full h-14 text-left pl-2"
      >
        <span className="text-sm flex font-bold">
          <MapPinIcon className="w-6 h-6 mr-2 ml-4" />
          위치 추가하기
        </span>
        <span className="text-xs ml-12">
          다른 사람들이 장소를 쉽게 찾을 수 있어요!
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
      {region && <p>선택된 지역: {region}</p>}
      {sigungu && <p>선택된 시/군/구: {sigungu}</p>}
    </>
  );
};

export default LocationButton;
