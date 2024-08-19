import { useState } from 'react';
import regionData from '@/data/regions.json';

type LocationDropdownProps = {
  region: string;
  sigungu: string;
  setRegion: (value: string) => void;
  setSigungu: (value: string) => void;
  isDesktop: boolean;
};

function LocationDropdown({
  region,
  sigungu,
  setRegion,
  setSigungu,
  isDesktop,
}: LocationDropdownProps) {
  const [regionsData] = useState(regionData);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
    setSigungu('');
  };

  const handleSigunguChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSigungu(e.target.value);
  };

  return (
    <div
      className={`flex ${isDesktop ? 'flex-row space-x-4' : 'flex-col mb-2'}`}
    >
      <select
        value={region}
        onChange={handleRegionChange}
        className={`input border-2 rounded ${
          isDesktop
            ? 'bg-orange0 border-orange5 w-[194px] h-[46px] px-4 text-[18px] font-medium'
            : 'bg-gray0 mb-4'
        }`}
      >
        <option value="">특별시/광역시/도</option>
        {regionsData.region.map((region) => (
          <option key={region.code} value={region.name}>
            {region.name}
          </option>
        ))}
      </select>

      {region && (
        <select
          value={sigungu}
          onChange={handleSigunguChange}
          className={`input border-2 rounded ${
            isDesktop
              ? 'bg-orange0 border-orange5 w-[140px] h-[46px] px-4 text-[18px] font-medium'
              : 'bg-gray0 mb-2'
          }`}
        >
          <option value="">시/군/구</option>
          {regionsData.region
            .find((r) => r.name === region)
            ?.sigungu.map((district) => (
              <option key={district.code} value={district.name}>
                {district.name}
              </option>
            ))}
        </select>
      )}
    </div>
  );
}

export default LocationDropdown;
