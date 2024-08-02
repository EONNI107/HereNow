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
  return (
    <div className="mt-8 flex-col space-y-4 border-y-2 border-gray-300 mx-2 pb-6">
      <p className="mt-4 font-bold">해당 위치는 이곳이에요</p>
      <Map
        id="map"
        center={{ lat: latitude, lng: longitude }}
        level={4}
        className="w-full h-[250px] rounded-md"
      >
        <MapMarker position={{ lat: latitude, lng: longitude }} />
      </Map>
    </div>
  );
}

export default KakaoMap;
