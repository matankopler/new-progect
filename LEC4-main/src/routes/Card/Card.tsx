
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardType, ErrorType } from "../../@types/types";
import { getCardsById } from "../../services/cards";
import "./Card.scss"


const Card = () => {
    const { id } = useParams();
    const [card, setCard] = useState<CardType>();
    const [error, setError] = useState<ErrorType>();

    useEffect(() => {
        getCardsById(id ?? "")
            .then((res) => {
                setCard(res.data);
            })
            .catch((e) => {
                const status = e.response.status;
                const message = e.message;
                const details = e.response.data;

                setError({ status, message, details });
            });
    }, []);

    return error ? (
        <div>
            <h2>{error.message}</h2>
        </div>
    ) : (
        <div className="card-container bg-blue-100 dark:bg-blue-600">
            <h2>{card?.title}</h2>
            <p>{card?.subtitle}</p>
            <img src={card?.image.url} alt={card?.image.alt} className="img" />
        </div>
    );
};
export default Card;