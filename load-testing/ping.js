import http from "k6/http";
import { check, sleep } from "k6";

import { getPingProduct } from "./product/get-product.js";

export let options = {
  vus: 10,
  iterations: 1000,
};

export default function () {
  getPingProduct();
}
