import { useState } from 'react';
import regionData from '@/data/regions.json';
type LocationDropdownProps = {
  region: string;
  sigungu: string;
  setRegion: (value: string) => void;
  setSigungu: (value: string) => void;
};

function LocationDropdown({
  region,
  sigungu,
  setRegion,
  setSigungu,
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
    <>
      <select
        value={region}
        onChange={handleRegionChange}
        className="input no-focus bg-gray0 mb-2"
      >
        <option value="">시/도 선택</option>
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
          className="input no-focus mt-2 bg-gray0"
        >
          <option value="">시/군/구 선택</option>
          {regionsData.region
            .find((r) => r.name === region)
            ?.sigungu.map((district) => (
              <option key={district.code} value={district.name}>
                {district.name}
              </option>
            ))}
        </select>
      )}
    </>
  );
}

export default LocationDropdown;
