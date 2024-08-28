import axios from "axios";
import { CardType } from "../@types/types";

const baseUrl = "http://localhost:8080/api/v1/cards";

export const getCards = () => axios.get(baseUrl);
export const getCardsById = (id: string) => axios.get(`${baseUrl}/${id}`)
export const setCardLike = (token: string, id: string) => axios.patch(`${baseUrl}/${id}`, {}, { headers: { 'x-auth-token': token } })
const getHeaders = () => (
    {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    }
)
// export const setCreateCard = (token: string, data: CardType) => axios.post(baseUrl, data, { headers: { 'x-auth-token': localStorage.settItem(token), } })

export const setCreateCard = (data: CardType) => {
    const url = `${baseUrl}`;
    return axios.post(url, data, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    })
}

export const getMyCards = () => axios.get(`${baseUrl}/my-cards`, getHeaders());

export const updateMyCard = (id: string, data: CardType) => axios.put(`${baseUrl}/${id}`, data, getHeaders())
