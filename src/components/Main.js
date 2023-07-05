import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)
   
  return (
      <main className="content">
          <section className="profile">
            <div className="profile__container">
              <a href="#" className="update-avatar" onClick={props.onEditAvatar} ><img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" /></a>
              <div className="profile__info">
                <div className="profile__user-name">
                  <h1 className="profile__name">{currentUser.name}</h1> 
                  <button className="profile__edit-button" onClick={props.onEditProfile} type="button">
                  </button>
                </div>
                <p className="profile__occupation">{currentUser.about}</p>
              </div>
            </div>
            <button className="profile__add-button" onClick={props.onAddPlace}  type="button"></button>
          </section>

          <section className="elements">
            <ul className="elements__grid">
                {props.cards.map((card) => (
                    <Card 
                        key={card._id}
                        _id={card._id}
                        likes={card.likes} 
                        name={card.name} 
                        link={card.link}
                        owner={card.owner} 
                        onDeleteCard={props.onDeleteCard} 
                        onCardClick={props.onCardClick} 
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </ul>
          </section> 
      </main>
  )
}

  
export default Main