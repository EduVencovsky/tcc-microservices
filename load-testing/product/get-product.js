import http from "k6/http";
import { check, sleep } from "k6";

import { getPaginatedProductUrl, getPingProductUrl } from "./index.js";
import { getRandomInt } from "../utils.js";

export let options = {
  vus: 10,
  iterations: 100,
};

export const getPingProduct = () => http.get(getPingProductUrl());

export const getPaginatedProduct = (skip, take) =>
  http.get(getPaginatedProductUrl(skip, take));

export default function () {
  const paginatedProductResponse = getPaginatedProduct(
    getRandomInt(0, 100),
    getRandomInt(5, 50)
  );
  check(paginatedProductResponse, { "status was 200": (r) => r.status == 200 });
  sleep(0.01);
}
