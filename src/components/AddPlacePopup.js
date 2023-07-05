import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup(props) {
    const inputNameRef = React.useRef()
    const inputLinkRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault()

        props.onAddPlace({
            name: inputNameRef.current.value,
            link: inputLinkRef.current.value
        })
    }

    React.useEffect(() => {
        if(props.isOpen) {
            inputNameRef.current.value = ''
            inputLinkRef.current.value = ''
        }
    }, [props.isOpen])

    return(
        <PopupWithForm 
          name="add" 
          title="Новое место" 
          type="submit" 
          isOpen={props.isOpen} 
          onClose={props.onClose}
          onSubmit={handleSubmit}
          textButton={props.isLoading ? 'Сохранение...' : 'Создать'}
        >
          <fieldset className="popup__input-container">
            <input ref={inputNameRef} type="text" name="name" className="popup__item" id="name-picture-input" placeholder="Название" required minLength="2" maxLength="30" />
            <span className="popup__item-error name-picture-input-error"></span>

            <input ref={inputLinkRef} type="url" name="link" className="popup__item" id="link-input" placeholder="Ссылка на картинку" required />
            <span className="popup__item-error link-input-error"></span>
          </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup