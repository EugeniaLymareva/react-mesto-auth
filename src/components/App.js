import React from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import api from '../utils/api'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import Register from './Register.js'
import Login from './Login.js'
import ProtectedRoute from './ProtectedRoute.js'
import * as auth from '../utils/auth.js'

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(null)
  const [userData, setUserData] = React.useState(null)
  const navigate = useNavigate()


  React.useEffect(() => {
    api.getUserInfo()
    .then(response => {
      setCurrentUser(response)
    })
    .catch((err) => {console.log(err)})

    api.getInitialCards()
    .then(response => {
        setCards(
            response.map((data) => ({
                _id: data._id,
                likes: data.likes,
                link: data.link,
                name: data.name,
                owner: data.owner,
            }))
        )
    })
    .catch((err) => {console.log(err)})

    
}, [])

function handleLogin() {
  handleCheckToken()
}

function handleCheckToken() {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    auth.checkToken(jwt)
    .then((response) => {
      if(!response) {
        return
      }
      setUserData(response.data)
      setIsLoggedIn(true)
      navigate('/mesto')
    })
    .catch((err) => {
      setIsLoggedIn(false)
      console.log(err)
    })

    return
  }

  setIsLoggedIn(false)
}

React.useEffect(() => {
  // if (isLoggedIn) {
    handleCheckToken();
  // }
}, [])

if (isLoggedIn === null) {
  return <div className="popup"><p>Загрузка...</p></div>
}

function handleUpdateAvatar(userData) {
  setIsLoading(true)
  api.updateAvatar(userData)
    .then(response => {
      setCurrentUser(response)
      setIsEditAvatarPopupOpen(false)
    })
    .catch((err) => {
      console.log(err)
    }) 
    .finally(() => {
      setIsLoading(false)
    })      
}

function handleUpdateUser(userData) {
  setIsLoading(true)
  api.updateUserInfo(userData)
    .then(response => {
      setCurrentUser(response)
      setIsEditProfilePopupOpen(false)
    })
    .catch((err) => {
      console.log(err)
    })  
    .finally(() => {
      setIsLoading(false)
    })     
}

function handleAddPlaceSubmit(cardData) {
  setIsLoading(true)
  api.addNewCard(cardData)
    .then(newCard => {
      setCards([newCard, ...cards])
      setIsAddPlacePopupOpen(false)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setIsLoading(false)
    }) 
}

function handleCardDelete(_id) {
  api.deleteCard(_id)
    .then(() => {
      setCards(cards => cards.filter((c) => c._id !== _id))

    })
    .catch((err) => {
      console.log(err)
    })
}

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id)

  ;(!isLiked ? api.likeCard(card._id) : api.dislikeCard(card._id))
  .then(newCard => {
    setCards(
      state => state.map(c => (c._id === newCard._id ? newCard : c))
    );
  })
  .catch((err) => {console.log(err)})
}
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setIsImagePopupOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <div className="page">
        <Header userData={userData}/>
        <Routes>
          <Route path="/mesto" element={<ProtectedRoute
            element={Main}
            isLoggedIn={isLoggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onDeleteCard={handleDeleteCardClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} 
          />}/>
          
          <Route path="/sign-in" element={<Login onLoggedIn={handleLogin} />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/" element={isLoggedIn ? <Navigate to="/mesto" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} /> 

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} /> 

       
        <PopupWithForm 
          name="delete" 
          title="Вы уверены?" 
          type="button" 
          value="Да" 
          isOpen={isDeleteCardPopupOpen} 
          onClose={closeAllPopups}
        >
        </PopupWithForm>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} ></ImagePopup>

        
      </div>   
    </div>
    </CurrentUserContext.Provider>
  )
}

export default App
