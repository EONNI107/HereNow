export type MainData = {
  contenttypeid: string;
  firstimage: string;
  title: string;
  addr1: string;
  overview: string;
  mapx: string;
  mapy: string;
};

export type AdditionalData = {
  infocenter: string;
  infocenterculture: string;
  sponsor1tel: string;
  infocenterfood: string;
  firstmenu: string;
  restdate: string;
  restdateculture: string;
  eventstartdate: string;
  eventenddate: string;
  restdatefood: string;
  usetimeculture: string;
  opentimefood: string;
  playtime: string;
};

export enum ContentType {
  ATTRACTION = 12,
  CULTURAL = 14,
  EVENT = 15,
  FOOD = 39,
}
