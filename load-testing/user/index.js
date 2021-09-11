import { baseUrl } from "../config.js";

export const getUserByIdUrl = (userId) => {
  return `${baseUrl}/user/${userId}`;
};

export const createUserUrl = `${baseUrl}/user`;

export const getUserData = () => {
  const randomNumber = Math.random() * 10;

  return JSON.stringify({
    username: `username-${randomNumber}`,
    password: `password-${randomNumber}`,
    firstName: `firstName-${randomNumber}`,
    lastName: `lastName-${randomNumber}`,
    address: {
      state: `state-${randomNumber}`,
      country: `country-${randomNumber}`,
      street: `street-${randomNumber}`,
      number: 1,
      postalCode: 1,
    },
  });
};
