import axios from "axios";
import Card from "../interfaces/Card";

const api: string = process.env.REACT_APP_API + "/usersAccounts" || "";

//create account for user (during the register phase)
export function newAccount(userId: number) {
  const userAccount = axios.post(api, { userId, userCards: [] }); //create an account
  return userAccount;
}

//add cards to user's account
export async function addCardToAccount(CardId: number) {
  let cardsArr: number[] = [];
  let accountId: number = 0;
  let userId: number = await JSON.parse(
    sessionStorage.getItem("IsLogin") as string
  ).userId;
  try {
    let info = await axios.get(`${api}?userId=${userId}`); //get account object

    accountId = info.data[0].id;

    cardsArr = info.data[0].userCards;

    cardsArr.push(CardId);
    return axios.patch(`${api}/${accountId}`, { userCards: cardsArr });
  } catch (error) {
    console.log(error);
  }
}

//get user's cards by accountId
export async function getCardsByAccountId() {
  let info: Card[] = [];
  try {
    let userid = await JSON.parse(sessionStorage.getItem("IsLogin") as string)
      .userId;

    let account = await axios.get(`${api}?userId=${userid}`);
    let cardIds: number[] = account.data[0].userCards;

    const promiseCard = await Promise.all(
      cardIds.map((id) => axios.get(`${process.env.REACT_APP_API}/cards/${id}`))
    );
    info = promiseCard.map((res) => res.data);
    return info;
  } catch (error) {
    console.log(error);
  }
}

//delete card from account (by cardId)
export async function findUserAndDeleteCard(cardId: number) {
  try {
    const userid = JSON.parse(
      sessionStorage.getItem("IsLogin") as string
    ).userId;
    let account = await axios.get(`${api}?userId=${userid}`);
    const userCardsArr: number[] = account.data[0].userCards.filter(
      (id: number) => id !== cardId
    );
    let { data } = await axios.patch(`${api}/${userid}`, {
      userCards: userCardsArr,
    });
    // get new userCards
    getCardsByAccountId();

    return data;
  } catch (error) {
    console.log(error);
  }
}

//ui=userId, ai=accountId
