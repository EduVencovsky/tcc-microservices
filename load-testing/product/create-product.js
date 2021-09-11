import http from "k6/http";
import { check, sleep } from "k6";

import { params } from "../config.js";
import { getProductData, createProductUrl } from "./index.js";

export let options = {
  vus: 101,
  iterations: 1001,
};

const createProduct = () =>
  http.post(createProductUrl, getProductData(), params);

export default function () {
  const createUserResponse = createProduct();

  check(createUserResponse, {
    "status was 201": (r) => r.status == 201,
  });
  sleep(0.01);
}
