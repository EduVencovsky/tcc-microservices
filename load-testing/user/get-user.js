import http from "k6/http";
import { check, sleep } from "k6";

import { getUserByIdUrl } from "./index.js";

export let options = {
  vus: 101,
  iterations: 1001,
};

export const getUserById = (id) => http.get(getUserByIdUrl(id));

export default function () {
  const getUserResponse = getUserById(getRandomInt(1, 100));
  check(getUserResponse, { "status was 200": (r) => r.status == 200 });
  sleep(0.01);
}
