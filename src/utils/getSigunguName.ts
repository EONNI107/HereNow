import regionData from '@/data/region.json';

export function getSigunguName(areaCode: string, sigunguCode: string) {
  const region = regionData.region.find((r) => r.code === areaCode);
  if (!region) return '';

  const sigungu = region.sigungu.find((s) => s.code === sigunguCode);
  return sigungu ? sigungu.name : '';
}
