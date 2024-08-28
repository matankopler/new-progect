import { useEffect, useState } from "react";
import { CardType } from "../../@types/types";
import axios from "axios";
import "./FavCards.scss"

const FavCards = () => {
  const api = "http://localhost:8080/api/v1/cards";
  const [allCards, setAllCards] = useState<CardType[]>([]);
  const filteredCards = allCards.filter((c) => c.likes.length > 0);

  useEffect(() => {
    axios.get(api).then((res) => {
      setAllCards(res.data);
    });
  }, [])

  return (
    <div className="cards-container bg-blue-100 dark:bg-blue-600">
      {filteredCards.map((c) => (
        <div key={c._id} className="card-box">
          <h2>{c.title}</h2>
          <img src={c.image.url} alt={c.image.alt} className="img" />
          <span>Likes: {c.likes.length}</span>
        </div>
      ))}
    </div>
  )
}

export default FavCards