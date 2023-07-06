import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ForgotPasswordStyles from './ForgotPassword.module.css';
import { routerConfig } from "../../utils/routerConfig";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { passwordForgotAction, setEmail } from "../../store/actions/userActions";
import { useAppSelector } from "../../types/redux";

function ForgotPassword() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { passwordRestoreStep, email } = useAppSelector( state => state.user )
	const passwordRestore = (event:React.FormEvent) => {
		event.preventDefault();
		passwordForgotAction(email)(dispatch)
	}
	const onEmailChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setEmail(event.currentTarget.value));
	}

	useEffect(() => {
		if (passwordRestoreStep === 1) {
			navigate(routerConfig.resetPassword.path ?? `/`)
		}
	}, [passwordRestoreStep])

	return (
		<div 
			className={ForgotPasswordStyles.root}
		>
			<h2 className={['text text_type_main-medium mb-6', ForgotPasswordStyles.title].join(' ')}>
				{'Восстановление пароля'}
			</h2>
			<form 
				className={`${ForgotPasswordStyles.form} mb-20`} 
				onSubmit={passwordRestore}
			>
				<EmailInput
					extraClass={'mb-6'}
					value={email}
					placeholder={'Укажите e-mail'}
					onChange={onEmailChange}
				/>
				<Button
					extraClass={ForgotPasswordStyles.button}
					type={"primary"}
					htmlType={"submit"}
				>
					{'Восстановить'}
				</Button>
			</form>
			<span className={"text text_type_main-default text_color_inactive mb-4"}>
				{'Вспомнили пароль?'}{' '}
				<Link className={ForgotPasswordStyles.link} to={routerConfig.login.path ?? `/`}>
					{'Войти'}
				</Link>
			</span>
		</div>
)}


export default ForgotPassword