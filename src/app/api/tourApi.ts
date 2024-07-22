import axios from "axios";

const BASE_URL = "https://apis.data.go.kr/B551011/KorService1"

export const tourApi = axios.create({baseURL:BASE_URL})


