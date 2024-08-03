# 🍀 프로젝트명 : 지금, 여기

# 소개

## 1. 프로젝트 소개

## 2. 프로젝트 진행

## 3. 프로젝트 대표기능

## 4. 프로젝트 상세설명

## 5. 프로젝트 폴더 구조

## 6. 프로젝트를 마치며..

  <br/>
  
  <br/>

# 1. 프로젝트 소개

  <br/>

- 한줄 정리 : 로컬의 정보를 확인하고 공유할 수 있는 플랫폼입니다.<br />

- 내용 : 사용자는 현재 위치 또는 관심 있는 로컬의 맛집, 여행지, 행사, 날씨, 사용자 후기 등을 확인하고, 다른 사용자들과 정보를 공유하며 소통할 수 있습니다.
  <br/>

- 프로젝트 핵심 기술:
  - 패키지 매니저 : npm
  - 프론트엔드 : React,Next,js,TypeScript,Tailwind CSS
  - 백엔드 : Supabase
  - 라이브러리 : react-toastify, day.js, react-intersection-observer,
    heroicons, react-kakao-maps-sdk
  - 전역상태관리 : Zustand, Tanstack Query
  - API : 한국관광공사 Tour API, 카카오 지도 API
  - 배포 : Vercel

## 팀원 소개

<table>
   <tr>
    <td align="center"><b>정현우</b></td>
    <td align="center"><b>강동석</b></td>
    <td align="center"><b>안시승</b></td>
    <td align="center"><b>박성욱</b></td>
    <td align="center"><b>이세영</b></td>
    <td align="center"><b>김언진</b></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/junghyunwoo02"><img src="https://avatars.githubusercontent.com/u/166801004?v=4" width="100" /></a></td>
    <td align="center"><a href="https://github.com/show1486"><img src="https://avatars.githubusercontent.com/u/153741544?v=4" width="100" /></a></td>
    <td align="center"><a href="https://github.com/Maestrossa"><img src="https://avatars.githubusercontent.com/u/161290671?v=4" width="100" /></a></td>
    <td align="center"><a href="https://github.com/SecretCandy"><img src="https://avatars.githubusercontent.com/u/108340910?v=4" width="100" /></a></td>
    <td align="center"><a href="https://github.com/leeseayoung"><img src="https://avatars.githubusercontent.com/u/141402621?v=4" width="100" /></a></td>  
    <td align="center"><a href=""><img src="" width="100" /></a></td> 
  </tr>
  <tr>
    <td align="center">피드 목록페이지, 
    장소 목록페이지 -<br/> (필터, 무한스크롤 , 좋아요)
    </td>
    <td align="center">
    메인페이지, 검색결과페이지 - <br/>
    레이아웃(Header,Footer), 검색기능구현</td>
    <td align="center">
    장소 상세 페이지 - <br/> 장소 정보, 지도, 주변 장소, 댓글, API</td>
    <td align="center">
    피드 상세 페이지 - <br/> 좋아요, 댓글, 피드 작성 페이지</td>
    <td align="center">
    로그인/회원가입/마이페이지</td>
    <td align="center">전체적인 디자인, 와이어프레임</td>
  </tr>
</table>

  <br/>

  <br/>

# 2. 프로젝트 진행

  <br/>

<img width="300" height="300"  alt="image" src="gif\룰파일.gif">
<img width="300" height="300" alt="image" src="gif\코드 컨벤션.jpg">
<br/>
<br/>

## 2024.07.16 ~ 2024.08.21<br/><br/>

💬 원활한 소통과 작업내용 공유를 위해 zep과 slack을 사용했어요<br/>

💬 코드 컨벤션을 규칙을 정해서 통일된 규칙안에서 코드를 작성해보았어요<br/>

💬 pr에 2명 이상의 approve가 있어야 develop에 merge를 할 수 있도록 설정했어요

  <br/>
  
  <br/>

# 3. 프로젝트 대표기능

  <br/>

- 사용자는 현재 위치, 전국 키워드와 또는 검색을 이용하여 정보(맛집, 관관지, 행사등)를 찾을 수 있어요<br />
- 각 지역만의 정보(맛집, 관관지, 행사등)를 한눈에 확인할 수 있어요<br />
- 피드를 통해 관련 로컬들의 맛집, 관관지, 행사등의 후기를 한눈에 볼 수 있어요<br />
- 자신만의 피드를 작성하여 본인만의 이야기를 남길 수 있어요<br />

  <br/>

  <br/>

# 4. 프로젝트 상세설명

  <br/>

### (1). 사용자는 현재 위치 또는 검색을 이용하여 정보(맛집, 관관지, 행사등)를 찾을 수 있어요

<img width="640" src="gif\현 위치 로컬.gif"/><br/>
<img width="640" src="gif\검색.gif"/><br/>

- 현재 위치를 기반으로 주변 로컬정보들을 보여줍니다.
- 다양한 정보를 검색을 통해 간편하게 정보를 볼 수 있습니다.
  <br/>

---

  <br/>

### (2). 각 지역만의 정보(맛집, 관관지, 행사등)를 한눈에 확인할 수 있어요

<img width="640" src="gif\지역별.gif"/><br/>

- 한눈에 보이는 전국 키워드를 클릭하여 그 지역들의 정보를 한눈에 확인할 수 있습니다.
  <br/>

---

  <br/>

### (3). 피드를 통해 관련 로컬들의 맛집, 관관지, 행사등의 후기를 한눈에 볼 수 있어요

<img width="640" src="gif\피드.gif"/><br />

- 사용자들이 작성한 피드를 통해 후기와 경험, 추억들을 한눈에 볼 수 있습니다.
  <br/>

---

  <br/>

### (4). 자신만의 피드를 작성하여 본인만의 이야기를 남길 수 있어요

<img width="640" src="gif\피드작성.gif"/><br/>

- 사용자가 직접 글과 사진을 작성하여 정보를 공유 할 수 있습니다.

  <br/>

  <br/>

# 5. 프로젝트 폴더 구조

  <br/>

  <br/>

  <br/>
  
# 6. 프로젝트를 마치며..

  <br/>
