import { baseUrl } from "../config.js";
import { getRandomInt } from "../utils.js";

export const getUserByIdUrl = (userId) => {
  return `${baseUrl}/user/${userId}`;
};

export const createUserUrl = `${baseUrl}/user`;

export const getUserData = () => {
  const number = getRandomInt(1, 5000);
  const postalCode = getRandomInt(1, 99999);
  const randomNumber = getRandomInt(1, 1000);

  return JSON.stringify({
    username: `username-${randomNumber}`,
    password: `password-${randomNumber}`,
    lastName: `lastName-${randomNumber}`,
    firstName: `firstName-${randomNumber}`,
    address: {
      number,
      postalCode,
      state: `state-${randomNumber}`,
      street: `street-${randomNumber}`,
      country: `country-${randomNumber}`,
    },
  });
};
