import Card from "./Card";

export default interface Account {
  id?: number;
  userId: number;
  userCards: Card[];
}
