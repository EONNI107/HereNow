import {
  AdditionalData,
  MainData,
  NearbyPlace,
  NearbyPlacesType,
} from '@/types/local-details';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMainData = async (id: number) => {
  const response = await axios.get(`/api/local-details/${id}`);
  return response.data.response.body.items.item[0];
};

export const useMainData = (id: number) => {
  return useQuery<MainData>({
    queryKey: ['mainData', id],
    queryFn: () => fetchMainData(id),
  });
};

const fetchAdditionalData = async (id: number, typeId: string) => {
  const response = await axios.get(
    `/api/additional-details/${id}?typeId=${typeId}`,
  );
  return response.data.response.body.items.item[0];
};

export const useAdditionalData = (
  id: number,
  typeId: string,
  options: object,
) => {
  return useQuery<AdditionalData>({
    queryKey: ['additionalData', id, typeId],
    queryFn: () => fetchAdditionalData(id, typeId),
    ...options,
  });
};

const fetchNearbyPlaces = async (
  longitude: number,
  latitude: number,
  typeId: string,
  id: number,
) => {
  const endpoint =
    typeId === '15'
      ? `/api/nearby-places?mapX=${longitude}&mapY=${latitude}&typeId=39`
      : `/api/nearby-places?mapX=${longitude}&mapY=${latitude}&typeId=${typeId}`;
  const response = await axios.get(endpoint);
  return response.data.response.body.items.item;
};

export const useNearbyPlaces = (
  longitude: number,
  latitude: number,
  typeId: string,
  id: number,
) => {
  return useQuery<NearbyPlacesType>({
    queryKey: ['nearbyPlaces', longitude, latitude, typeId, id],
    queryFn: () => fetchNearbyPlaces(longitude, latitude, typeId, id),
    select: (data) =>
      data.filter((place: NearbyPlace) => place.contentid !== id.toString()),
  });
};
