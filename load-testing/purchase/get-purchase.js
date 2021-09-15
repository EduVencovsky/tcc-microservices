import http from "k6/http";
import { check, sleep } from "k6";

import { getRandomInt } from "../utils.js";
import { getPurchaseByIdUrl } from "./index.js";

export let options = {
  vus: 10,
  iterations: 100,
};

export const getPurchase = (id) => http.get(getPurchaseByIdUrl(id));

export default function () {
  const paginatedProductResponse = getPurchase(getRandomInt(1, 100));
  check(paginatedProductResponse, { "status was 200": (r) => r.status == 200 });
  sleep(0.01);
}
