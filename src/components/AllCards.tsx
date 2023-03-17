import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getAllCards } from "../services/CardsService";

interface AllCardsProps {}

const AllCards: FunctionComponent<AllCardsProps> = () => {
  let [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    getAllCards()
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h4 className="mt-10 display-2 text-opacity-75">All Cards</h4>
      {cards.length ? (
        <div className="container">
          <div className="row">
            {cards.map((card: Card) => (
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
                  <small className="card-text">{card.phone}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No cards found</p>
      )}
    </>
  );
};

export default AllCards;
