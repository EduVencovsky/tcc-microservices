import http from "k6/http";
import { check, sleep } from "k6";

import { params } from "../config.js";
import { getUserByIdUrl, createUserUrl, getUserData } from "./index.js";

export let options = {
  vus: 101,
  iterations: 1001,
};

const createUser = () => http.post(createUserUrl, getUserData(), params);

const getUserById = (id) => http.get(getUserByIdUrl(id));

export default function () {
  let createUserResponse = createUser();
  check(createUserResponse, { "status was 201": (r) => r.status == 201 });

  const userId = createUserResponse.json().id;
  const getUserResponse = getUserById(userId);
  check(getUserResponse, { "status was 200": (r) => r.status == 200 });
  sleep(0.01);
}
