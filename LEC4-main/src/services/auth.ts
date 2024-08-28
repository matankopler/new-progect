import axios from "axios";
import { CardType, LoginUser, RegisterUser } from "../@types/types";

export const baseUrl = "http://localhost:8080/api/v1/users";
export const usersUrl = `${baseUrl}`;
export const loginUrl = `${baseUrl}/login`;

export const register = (data: RegisterUser) => axios.post(usersUrl, data);
export const login = (data: LoginUser) => axios.post(loginUrl, data);


export const auth = {
    register,login
};

export default auth;