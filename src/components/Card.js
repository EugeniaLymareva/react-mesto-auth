import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = props.owner._id === currentUser._id
    const isLiked = props.likes.some(i => i._id === currentUser._id)
    const cardLikeButtonClassName = (`element__group ${isLiked && 'element__group_active'}`)
    
  

    function handleClick() {
        props.onCardClick({
            name: props.name,
            link: props.link,
        })
    }

    function handleLikeClick() {
        props.onCardLike(props)  
    }

    function handleDeleteClick() {
        props.onCardDelete(props._id)
    }

    return (
        <li className="element">
            <img className="element__mask-group" src={props.link} alt={props.name} onClick={handleClick} />
            {isOwn && <button className="element__trash" type="button" onClick={handleDeleteClick} />}
            <div className="element__info">
                <h2 className="element__title">{props.name}</h2>
                <div className="element__likes">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <h2 className="element__like-counter">{props.likes.length}</h2>
                </div>
            </div>
        </li>
    )
  }
  export default Card