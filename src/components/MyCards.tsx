import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../interfaces/Card";
import {
  findUserAndDeleteCard,
  getCardsByAccountId,
} from "../services/AccountService";
import { deleteCard } from "../services/CardsService";

interface MyCardsProps {
  cardId: number;
  setCardId: Function;
}

const MyCards: FunctionComponent<MyCardsProps> = ({ setCardId }) => {
  let [userCards, setUserCards] = useState<Card[]>([]);

  useEffect(() => {
    getCardsByAccountId()
      .then((res: any) => {
        setUserCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  let navigate = useNavigate();

  return (
    <>
      <h4 className="mt-10 display-2 text-opacity-75">My Cards</h4>
      <button
        className="btn btn-success w-35 d-flex"
        onClick={() => navigate("/newCard")}
      >
        Add new card
      </button>

      {userCards ? (
        <div className="container">
          <div className="row">
            {userCards.map((card: Card) => (
              <div
                key={card.id}
                className="card ms-2"
                style={{ width: "18rem" }}
              >
                <img
                  className="card-img-top"
                  src={card.image}
                  alt={card.name}
                  style={{ height: "100%" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{card.name}</h5>
                  <p className="card-text">{card.description}</p>
                  <p className="card-text">{card.address}</p>
                  <p className="card-text">{card.phone}</p>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      setCardId(card.id as number);
                      navigate("/updateCard");
                    }}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      setCardId(card.id as number);
                      findUserAndDeleteCard(Number(card.id));
                      deleteCard(Number(card.id))
                        /*  .then((res) => console.log(res)) */
                        .catch((err) => console.log(err));
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-primary display-3">No data found</p>
      )}
    </>
  );
};

export default MyCards;
