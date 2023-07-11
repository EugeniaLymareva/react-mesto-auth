import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm.js'

function EditProfilePopup(props) {
    const [name , setName] = React.useState('')
    const [description, setDescription ] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext)

    React.useEffect(() => {
        if (Object.keys(currentUser).length !== 0) {
            setName(currentUser.name)
            setDescription(currentUser.about)
        }
      }, [currentUser, props.isOpen])

    function handleSubmit(e) {
        
        e.preventDefault();
      
        props.onUpdateUser({
            name,
            about: description,
        })
    } 
    
    function handlNameChange(e) {
        setName(e.target.value)
    }

    function handlDescriptionChange(e) {
        setDescription(e.target.value)
    }

    return (
        <PopupWithForm 
          title="Редактировать профиль" 
          name="edit" 
          type="submit"  
          isOpen={props.isOpen} 
          onClose={props.onClose} 
          onSubmit={handleSubmit}
          textButton={props.isLoading ? 'Сохранение...' : 'Сохранить'}
        >
          <fieldset className="popup__input-container">
            <input type="text" name="name" className="popup__item" id="name-input" placeholder="Имя" value={name} onChange={handlNameChange} required minLength="2" maxLength="40" />
            <span className="popup__item-error name-input-error"></span>

            <input type="text" name="about" className="popup__item" id="about-input" placeholder="О себе" value={description} onChange={handlDescriptionChange} required minLength="2" maxLength="200" />
            <span className="popup__item-error about-input-error"></span>
          </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup