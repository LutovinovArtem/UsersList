import { instance } from "../axios";
import { createSearchParams } from "react-router-dom";

export const getUsers = (data) =>
  instance
    .get(`users?${createSearchParams(data)}`)
    .then((response) => response.data.data);

export const getUser = (id) =>
  instance.get(`users/${id}`).then((response) => response.data.data);

export const deleteUser = (userID) =>
  instance.delete(`users/${userID}`).then((response) => response);

export const postUser = (values) =>
  instance.post("users", values).then((response) => response);

export const putUser = (values, id) => instance.put(`users/${id}`, values);
