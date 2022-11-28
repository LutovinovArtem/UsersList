import { instance } from "../axios";

export const login = (values) => instance.post(`login`, values);
