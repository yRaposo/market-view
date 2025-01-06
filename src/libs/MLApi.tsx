import axios from "axios";

export const MLApi = axios.create({
  baseURL: "https://api.mercadolibre.com",
});
