import axios from "axios";

export const dateNagerInstance = axios.create({
  baseURL: "https://date.nager.at/api",
});

export const countriesnowInstance = axios.create({
  baseURL: "https://countriesnow.space/api/v0.1/countries",
});
