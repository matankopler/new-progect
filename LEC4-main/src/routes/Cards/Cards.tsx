import { useContext, useEffect, useState } from "react"
import { CardType } from "../../@types/types"
import { getCards, setCardLike } from "../../services/cards";
import "./Cards.scss"
import { Link } from "react-router-dom";
import { Heart, HeartFilled } from '@wix/wix-ui-icons-common';
import { IconButton } from "@wix/design-system";
import { AuthContext } from "../../context/AuthContext";

const Cards = () => {
    const { getLoggedInUser } = useContext(AuthContext);

    const [cards, setCards] = useState<CardType[]>([])

    const refreshCards = async () => {
        const res = await getCards()
        setCards(res.data)
    }

    useEffect(() => {
        refreshCards()
    }, []);


    return (
        <div className="cards-container bg-blue-100 dark:bg-blue-600">
            {cards.map((c) => {

                const isLike = c.likes.includes(getLoggedInUser().id);
                return <Link to={`cards/${c._id}`}>
                    <div key={c._id} className="card-box">
                        <h2 className="">{c.title}</h2>
                        <p >{c.subtitle}</p>
                        <img src={c.image.url} alt={c.image.alt} className="imge" />
                        <IconButton onClick={async (e) => {
                            e.preventDefault()
                            try {
                                await setCardLike(getLoggedInUser().token, c._id)
                                await refreshCards();
                            }
                            catch { }
                        }}>
                            {isLike ? <HeartFilled /> : <Heart />}
                        </IconButton>
                    </div>
                </Link>
            })}

        </div>
    )
}

export default Cards
