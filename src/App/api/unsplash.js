/* globals UNSPLASH_ACCESS_KEY */
import axios from "axios";
import * as R from "ramda";

const baseURL = "https://api.unsplash.com";

const fetcher = axios.create({
  baseURL,
  headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
});

export async function getRandomPhoto(count = 30) {
  const response = await fetcher.get("/photos/random", { params: { count } });
  return R.prop("data", response);
}
