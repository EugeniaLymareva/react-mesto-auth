import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as auth from '../utils/auth'
import InfoTooltip from './InfoTooltip'

function Register() {
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false)
    const [isRegister, setIsRegister] = React.useState(false)
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    
    function closeInfoTooltip() {
        setIsInfoTooltipPopupOpen(false)
    }

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        auth.register(formValue.email, formValue.password)
        .then(() => {
            setIsRegister(true)
        })
        .catch((err) => {
            setIsRegister(false)
            console.log(err)
        })
        .finally(() => {
            setIsInfoTooltipPopupOpen(true)
        }) 
    }

    return (
        <>
            <div className='register'>
                <p className="register__title">Регистрация</p>

                <form onSubmit={handleSubmit} className="register__form">
                    <input type="email" name="email" value={formValue.email} onChange={handleChange} className="register__input" id="email" placeholder="Email"required minLength="2" maxLength="40" />
                    <span className="register__error"></span>

                    <input type="password" name="password" value={formValue.password} onChange={handleChange} className="register__input" id="password" placeholder="Пароль" required minLength="2" maxLength="20" />
                    <span className="register__error"></span>
    
                    <button type="submit" className="register__submit-button">Зарегистрироваться</button>
                    
                </form>
                <div className='register__signin'>
                    <p>Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="register__login-link">Войти</Link>
                </div>
            </div>

            <InfoTooltip
                isOpen={isInfoTooltipPopupOpen}
                onClose={closeInfoTooltip}
                isRegister={isRegister}
            />
        </>
    )
}

export default Register 

