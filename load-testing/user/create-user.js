import http from "k6/http";
import { check, sleep } from "k6";

import { params } from "../config.js";
import { createUserUrl, getUserData } from "./index.js";

export let options = {
  vus: 101,
  iterations: 1001,
};

const createUser = () => http.post(createUserUrl, getUserData(), params);

export default function () {
  let createUserResponse = createUser();
  check(createUserResponse, { "status was 201": (r) => r.status == 201 });
  sleep(0.01);
}
