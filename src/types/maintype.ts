export type itemtype = {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  cpyrhtDivCd: string;
  createdtime: string;
  dist: string;
  firstimage: string;
  firstimage2: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  sigungucode: string;
  tel: string;
  title: string;
};
export type Sigungu = {
  rnum: number;
  code: string;
  name: string;
};

// 각 도시 혹은 지역의 타입 정의
export type Region = {
  rnum: number;
  code: string;
  name: string;
  ename: string;
  image: string;
  sigungu: Sigungu[];
};

// 최상위 레벨, 여러 지역을 포함하는 배열의 타입 정의
export type Regions = {
  region: Region[];
};
// addr1: '서울특별시 중구 세종대로 110 서울특별시청';
// addr2: '서울시청광장';
// areacode: '1';
// booktour: '';
// cat1: 'A02';
// cat2: 'A0207';
// cat3: 'A02070200';
// contentid: '2613900';
// contenttypeid: '15';
// cpyrhtDivCd: 'Type3';
// createdtime: '20190802003406';
// firstimage: 'http://tong.visitkorea.or.kr/cms/resource/33/2998333_image2_1.png';
// firstimage2: 'http://tong.visitkorea.or.kr/cms/resource/33/2998333_image3_1.png';
// mapx: '126.9777210995';
// mapy: '37.5662570431';
// mlevel: '6';
// modifiedtime: '20240206130654';
// sigungucode: '24';
// tel: '02-549-6111 (대행사 오렌지런)<br>02-581-1001(서울시약사회)';
// title: '건강서울페스티벌';
