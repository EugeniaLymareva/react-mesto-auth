import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup(props) {
    const inputRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault()
      
        props.onUpdateAvatar({
          avatar: inputRef.current.value
        })
        
      }  

      React.useEffect(() => {
        if(props.isOpen) {
            inputRef.current.value = ''
        }
      }, [props.isOpen])

    return(
        <PopupWithForm 
          name="update-avatar" 
          title="Обновить аватар" 
          type="submit" 
          isOpen={props.isOpen} 
          onClose={props.onClose}
          onSubmit={handleSubmit}
          textButton={props.isLoading ? 'Сохранение...' : 'Сохранить'}
        >
          <fieldset className="popup__input-container">
            <input ref={inputRef} type="url" name="avatar" className="popup__item" id="link-avatar-input" placeholder="Ссылка на картинку" required />
            <span className="popup__item-error link-avatar-input-error"></span>
          </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup