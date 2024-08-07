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

  const isValidLocation =
    latitude >= 33.1 &&
    latitude <= 38.45 &&
    longitude >= 125.06666667 &&
    longitude <= 131.87222222;

  if (!latitude || !longitude) {
    return null;
  }

  if (!isValidLocation) {
    return null;
  }
  return (
    <div className="mt-5 flex-col space-y-4 border-y-2 border-gray-300 mx-2 pb-6">
      <p className="mt-4 font-bold">해당 위치는 이곳이에요</p>
      <Map
        id="map"
        center={{ lat: latitude, lng: longitude }}
        level={4}
        className="w-full h-[200px] rounded-md"
      >
        <MapMarker position={{ lat: latitude, lng: longitude }} />
      </Map>
    </div>
  );
}

export default KakaoMap;
