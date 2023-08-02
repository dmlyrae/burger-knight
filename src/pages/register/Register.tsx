import React, { useEffect, useState } from "react";
import RegisterStyles from './Register.module.css';
import { Link, useNavigate } from "react-router-dom";
import { registrationAction, setEmail, setUsername } from "../../store/actions/userActions";
import { routerConfig } from "../../utils/routerConfig";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../types/redux";

function Register() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { username, email, accessToken, isAuth } = useAppSelector( state => state.user );
	const [ password, setPassword ] = useState('');

	const onPasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

	const onUsernameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setUsername(event.target.value))
	}
	const onEmailChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setEmail(event.target.value))
	}
	const registrationSubmit = (event:React.FormEvent) => {
		event.preventDefault();
		if (password && email && username) {
			dispatch(registrationAction({
				name: username,
				email,
				password
			}));
		}
	}

	useEffect(() => {
		if (isAuth) navigate(routerConfig.main.path ?? `/`);
	}, [isAuth]);

	return (
		<div 
			className={RegisterStyles.root}
		>
			<h2 className={['text text_type_main-medium mb-6', RegisterStyles.title].join(' ')}>
				{'Регистрация'}
			</h2>
			<form 
				className={[RegisterStyles.form, 'mb-20'].join(' ')} 
				onSubmit={registrationSubmit}
			>
				<Input
					extraClass="mb-6"
					type="text"
					name={'name'}
					placeholder={'Имя'}
					value={username}
					onChange={onUsernameChange}
				/>
				<EmailInput
					extraClass="mb-6"
					placeholder={'e-mail'}
					name={'email'}
					value={email}
					onChange={onEmailChange}
				/>
				<PasswordInput
					extraClass="mb-6"
					name={'password'}
					value={password}
					placeholder={'Пароль'}
					icon={'ShowIcon'}
					onChange={onPasswordChange}
				/>
				<Button
					type="primary"
					htmlType={"submit"}
					extraClass={RegisterStyles.button}
				>
					{'Зарегистрироваться'}
				</Button>
			</form>
			<span className={"mb-4 text text_type_main-default text_color_inactive"}>
				{'Уже зарегистрированы?'}{' '}
				<Link 
					className={RegisterStyles.link} 
					to={routerConfig.login.path ?? `/`}
				>
					{'Войти'}
				</Link>
			</span>
		</div>
)}

export default Register