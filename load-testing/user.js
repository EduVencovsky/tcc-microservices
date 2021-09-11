import http from 'k6/http';
import { check, sleep } from 'k6';

import { baseUrl, params } from './config.js';

export const getUserUrl = (userId) => {
  return `${baseUrl}/user/${userId}`;
};

export const createUserUrl = `${baseUrl}/user`;

export let options = {
  vus: 101,
  iterations: 1001,
};

export const userData = JSON.stringify({
  username: 'string',
  password: 'string',
  firstName: 'string',
  lastName: 'string',
  address: {
    state: 'string',
    country: 'string',
    street: 'string',
    number: 1,
    postalCode: 1,
  },
});

const getUser = () => http.post(createUserUrl, userData, params);
const getUserById = (id) => http.get(getUserUrl(id));

export default function () {
  let createUserResponse = getUser();
  check(createUserResponse, { 'status was 201': (r) => r.status == 201 });

  const userId = createUserResponse.json().id;
  const getUserResponse = getUserById(userId);
  check(getUserResponse, { 'status was 200': (r) => r.status == 200 });
  sleep(0.01);
}
