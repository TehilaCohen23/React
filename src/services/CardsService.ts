import axios from "axios";
import Card from "../interfaces/Card";

const api: string = process.env.REACT_APP_API + "/cards" || "";

// add new card
export function addCard(newCard: Card) {
  return axios.post(api, newCard);
}

//get all cards
export function getAllCards() {
  return axios.get(api);
}

//get cards by id
export function getCardById(userId: number) {
  const userCards = axios.get(`${api}/${userId}`);
  return userCards;
}

//update card by card id
export function updateCard(newCard: Card) {
  return axios.put(`${api}/${newCard.id}`, newCard);
}

//delete card
export function deleteCard(id: number) {
  return axios.delete(`${api}/${id}`);
}
