import React, {useState} from 'react'
import * as auth from '../utils/auth'

function Login(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formValue.email || !formValue.password) {
            return
        }
        auth.login(formValue.email, formValue.password) 
        .then((data) => {
            localStorage.setItem('jwt', data.token)
            props.onLoggedIn({ email: formValue.email })
        })
        .catch((err) => {
            console.log(err)
          })
    }

    return (
        <div className='login'>
            <p className="login__title">Вход</p>

            <form className="login__form" onSubmit={handleSubmit}>
                <input type="email" name="email" value={formValue.email} onChange={handleChange} className="login__input" id="email" placeholder="Email"required minLength="2" maxLength="40" />
                <span className="login__error"></span>

                <input type="password" name="password" value={formValue.password} onChange={handleChange} className="login__input" id="password" placeholder="Пароль" required minLength="2" maxLength="20" />
                <span className="login__error"></span>
 
                <button type="submit" className="login__submit-button">Войти</button>
                
            </form>
        </div>
    )
}

export default Login 