import useKakaoLoader from '@/hooks/useKaKaoLoader';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function KakaoMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  useKakaoLoader();

  if (!latitude || !longitude) {
    return null;
  }
  const isValidLocation =
    latitude >= 33.1 &&
    latitude <= 38.45 &&
    longitude >= 125.06666667 &&
    longitude <= 131.87222222;

  if (!isValidLocation) {
    return null;
  }

  return (
    <div className="mt-5 flex-col space-y-4 border-y-2 border-gray3 mx-2 pb-6 xl:mx-0 xl:border-y-0 xl:border-t-2 xl:mt-12">
      <p className="mt-4 font-bold xl:my-12 xl:text-xl">
        해당 위치는 이곳이에요
      </p>
      <Map
        id="map"
        center={{ lat: latitude, lng: longitude }}
        level={4}
        className="w-full h-[200px] rounded-md xl:h-[480px]"
      >
        <MapMarker position={{ lat: latitude, lng: longitude }} />
      </Map>
    </div>
  );
}

export default KakaoMap;
