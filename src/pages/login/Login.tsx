import { useState, useEffect } from "react";
import LoginStyles from './Login.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { loginAction, setEmail } from "../../store/actions/userActions";
import { routerConfig } from "../../utils/routerConfig";
import { useAppDispatch, useAppSelector } from "../../types/redux";
import { useForm } from "../../hooks/useForm";

function Login() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { email, isAuth, accessToken } = useAppSelector( state => state.user);
	const { values, handleChange } = useForm({ email, })

	const authSubmit = (e:React.FormEvent) => {
		e.preventDefault();
		const { email, password } = values;
		if (email && password) {
			dispatch(setEmail(email))
			dispatch(loginAction({
				email,
				password
			}))
		}
	}

	const onRegistration  = () => {
		navigate("/registration");
	}

	const onPasswordReset  = () => {
		navigate("/forgot-password");
	}

	useEffect(() => {
		if (isAuth && accessToken ) navigate(routerConfig.main.path ?? `/`);
	}, [isAuth])

	return (
		<div 
			className={LoginStyles.root}
		>
			<div 
				className={LoginStyles['registration-card']}
			>
				<h2 
					className="text text_type_main-medium mb-6"
				>
					{'Вход'}
				</h2>
				<form 
					className={LoginStyles.form}
					onSubmit={authSubmit}
				>
					<Input
						type={'text'}
						placeholder={'E-mail'}
						onChange={handleChange}
						value={values.email ?? ""}
						name={'email'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass={"mb-6"}
						data-test={"email-input"}
					/>
					<PasswordInput
						placeholder={"Пароль"}
						onChange={handleChange}
						value={values.password ?? ""}
						name={'password'}
						extraClass={"mb-6"}
						data-test={"pass-input"}
					/> 
					<Button 
						htmlType={"submit"}
						type={"primary"}
						size={"medium"}
						extraClass={[LoginStyles["registration-card__button"], "mb-28"].join(" ")}
						data-test={"login"}
					>
						{"Войти"}
					</Button>
				</form>
				<p 
					className={[LoginStyles["registration-card__additional"], "mb-2"].join(" ")}
				>
					<span
						className={"text text_type_main-small text_color_inactive mr-2"}
					>
						{"Вы — новый пользователь?"}
					</span>
					<Button 
						htmlType="button" 
						type="secondary" 
					 	size="small"
						cellPadding={0}
						extraClass={LoginStyles["registration-card__secondary-button"]}
						onClick={onRegistration}
					>
						{"Зарегистрироваться"}
					</Button>
				</p>
				<p 
					className={[LoginStyles["registration-card__additional"], "mb-0"].join(" ")}
				>
					<span
						className={"text text_type_main-small text_color_inactive mr-2"}
					>
						{"Забыли пароль?"}
					</span>
					<Button 
						htmlType="button" 
						type="secondary" 
						size="small"
						extraClass={LoginStyles["registration-card__secondary-button"]}
						onClick={onPasswordReset}
					>
						{"Восстановить пароль"}
					</Button>
				</p>
			</div>
		</div>
)}

export default Login