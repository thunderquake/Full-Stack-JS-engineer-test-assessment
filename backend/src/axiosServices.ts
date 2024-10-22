import axios from "axios";

const dotenv = require("dotenv");

dotenv.config();

export const dateNagerInstance = axios.create({
  baseURL: process.env.DATE_NAGER_BASE_URL,
});

export const countriesnowInstance = axios.create({
  baseURL: process.env.COUNTRIES_NOW_BASE_URL,
});
