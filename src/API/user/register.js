import { instance } from "../axios";

export const registration = (values) => instance.post('register', values);
