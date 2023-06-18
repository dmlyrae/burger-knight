import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ForgotPasswordStyles from './ForgotPassword.module.css';
import { routerConfig } from "../../utils/routerConfig";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { passwordForgotAction, setEmail } from "../../store/actions/userActions";

function ForgotPassword() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { passwordRestoreStep, email } = useSelector( state => state.user )
	const passwordRestore = (event) => {
		event.preventDefault();
		dispatch(passwordForgotAction(email))
	}
	const onEmailChange = (event) => {
		dispatch(setEmail(event.target.value));
	}

	useEffect(() => {
		if (passwordRestoreStep === 1) {
			navigate(routerConfig.resetPassword.path)
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
					htmlType="button"
					onClick={passwordRestore}
				>
					{'Восстановить'}
				</Button>
			</form>
			<span className={"text text_type_main-default text_color_inactive mb-4"}>
				{'Вспомнили пароль?'}{' '}
				<Link className={ForgotPasswordStyles.link} to={routerConfig.login.path}>
					{'Войти'}
				</Link>
			</span>
		</div>
)}


export default ForgotPassword