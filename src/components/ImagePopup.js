
function ImagePopup(props) {
  return (
    <div className={`popup popup-image ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__image-container">
            <button className="popup__close" onClick={props.onClose} type="button"></button>
            <img className="popup__image" src={props.card.link} alt={props.card.name} />
            <h2 className="popup__image-description">{props.card.name}</h2>
        </div>
    </div>
  )
}
export default ImagePopup

