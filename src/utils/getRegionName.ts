import regionData from '@/data/region.json';

const region = regionData.region;

type Region = {
  rnum: number;
  code: string;
  name: string;
  ename: string;
};

export function getRegionNameKorean(ename: string): string {
  const selectedRegion = region.find(
    (region: Region) => region.ename.toLowerCase() === ename.toLowerCase(),
  );

  return selectedRegion ? selectedRegion.name : '알 수 없는 지역';
}

export function getRegionNameEnglish(ename: string): string {
  const selectedRegion = region.find(
    (region: Region) => region.ename.toLowerCase() === ename.toLowerCase(),
  );

  return selectedRegion ? selectedRegion.ename : 'Unknown Region';
}
