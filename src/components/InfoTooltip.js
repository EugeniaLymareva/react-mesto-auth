import {useNavigate} from 'react-router-dom'
import imgSuccess from '../images/Union-success.svg'
import imgFail from '../images/Union-fail.svg'

function InfoTooltip(props) {
    const navigate = useNavigate()

    function handleClose() {
        props.onClose()
        if (props.isRegister) {
            navigate('/sign-in')
        }
    }

    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close" onClick={handleClose}  type="button"></button>
                <img className="popup__success-fail" src={props.isRegister ? imgSuccess : imgFail} />
                <h2 className="popup__message">{props.isRegister ? `Вы успешно зарегистрировались!` : `Что-то пошло не так!
Попробуйте ещё раз.`}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip 

// 