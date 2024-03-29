import { useEffect, useState } from "react";
import ResetPasswordStyles from './ResetPassword.module.css';
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { routerConfig } from "../../utils/routerConfig";
import Loader from "../../components/Loader/Loader";
import { passwordRestoreAction, setCode } from "../../store/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../types/redux";

function ResetPassword() {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [password, setPassword] = useState('')

	const onPasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value)
	}
	const onCodeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setCode(event.target.value))
	}
	const resetPasswordSubmit = (event:React.FormEvent) => {
		event.preventDefault();
		dispatch(passwordRestoreAction(password,code))
	}

	const { passwordRestoreRequest, code, passwordRestoreStep } = useAppSelector( state => state.user)

	useEffect(() => {
		if (passwordRestoreStep === 0 ) {
			navigate(routerConfig.main.path ?? '/');
		}
	}, [passwordRestoreStep])

	return (
		<div 
			className={ResetPasswordStyles.root}
		>
			<h2 className={['mb-6 text text_type_main-medium', ResetPasswordStyles.title].join(' ')}>
				{'Восстановление пароля'}
			</h2>
			<form 
				className={['mb-20', ResetPasswordStyles.form].join(' ')} 
				onSubmit={resetPasswordSubmit}
			>
				<PasswordInput
					icon={'ShowIcon'}
					extraClass="mb-6"
					name={'password'}
					value={password}
					placeholder={'Введите новый пароль'}
					onChange={onPasswordChange}
				/>
				<Input
					type="text"
					extraClass="mb-6"
					value={code}
					placeholder={'Введите код из письма'}
					onChange={onCodeChange}
				/>
				{
					passwordRestoreRequest ? (
						<Loader message={'Waiting answer...'} />
					) : (
						<Button
							type="primary"
							extraClass={ResetPasswordStyles.button}
							htmlType="submit"
						>
							{'Сохранить'}
						</Button>
					)
				}
			</form>
			<span className={"text text_type_main-default text_color_inactive mb-4"}>
				{'Вспомнили пароль?'}{' '}
				<Link className={ResetPasswordStyles.link} to={routerConfig.login.path ?? `/`}>
					{'Войти'}
				</Link>
			</span> 
		</div>
)}

export default ResetPassword