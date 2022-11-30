import { instance } from "../axios";

export const login = (values) => instance.post(`login`, values);

export const registration = (values) => instance.post('register', values);
