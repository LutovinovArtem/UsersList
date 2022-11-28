import { instance } from "../axios";

export const getUsers = () =>
  instance.get("users").then((response) => response.data.data);

export const getUser = (id) =>
  instance.get(`users/${id}`).then((response) => response.data.data);
  // .then((response) => response.data.data);
export const deleteUser = (userID) =>
  instance.delete(`users/${userID}`).then((response) => response);

export const postUser = (values) =>
  instance.post("users", values).then((response) => response);

export const putUser = (values, id) => instance.put(`users/${id}`, values);
