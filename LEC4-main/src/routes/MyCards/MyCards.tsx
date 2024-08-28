import { useEffect, useState } from "react";
import { CardType } from "../../@types/types";
import { getMyCards } from "../../services/cards";
import { useNavigate } from "react-router-dom";
import "./MyCards.scss"
import { FaPen } from "react-icons/fa";


const MyCards = () => {
  const navigate = useNavigate()
  const [myCards, setMyCards] = useState<CardType[]>([]);
  useEffect(() => {
    getMyCards().then((res) => {
      setMyCards(res.data)
    })
  }, [])

  const onEditClick = (id: string) => {
    navigate(`/CreateCard/${id}`)
  }


  return (

    <div className="cards-container bg-blue-100 dark:bg-blue-600">
      {myCards.map((c) => (
        <div key={c._id} className="card-box">
          <h2>{c.title}</h2>
          <p>{c.subtitle}</p>
          <img src={c.image.url} alt={c.image.alt} />
          <button onClick={() => onEditClick(c._id)} className="mt-5"><FaPen/></button>
        </div>
      ))}
    </div>
  )
}

export default MyCards

