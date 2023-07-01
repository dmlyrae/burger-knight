import React, { useEffect, useState } from "react";
import ProfileFormStyles from './ProfileForm.module.css';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setUsername, userGetAction, userPatchAction } from "../../store/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../types/redux";

function ProfileForm() {

	const dispatch = useAppDispatch();
	const { refreshToken, username, email, accessToken } = useAppSelector( state => state.user );
	const [ password, setPassword ] = useState('');
	const [ newEmail, setNewEmail ] = useState<string>(email);
	const [ newUsername, setNewUsername ] = useState(username);

	const onUsernameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setUsername(event.target.value))
	}

	const onEmailChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setEmail(event.target.value))
	}

	const onPasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

	const onSave = (event:React.FormEvent) => {
		event.preventDefault();
		userPatchAction({
			user: {
				email: newEmail,
				name: newUsername,
			}},
			accessToken
		)(dispatch)
	}

	const onCancel = (event:React.MouseEvent) => {
		event.preventDefault();
		userPatchAction({
			user: {
				email,
				name: username,
			}},
			accessToken
		)(dispatch)
	}

	useEffect(() => {
		userGetAction(accessToken)(dispatch)
	}, [])

	return (
		<form 
			className={ProfileFormStyles.root}
			onSubmit={onSave}
		>
			<Input
				placeholder="Имя"
				icon="EditIcon"
				extraClass="mb-6"
				name={"name"}
				type="text"
				value={username}
				onChange={onUsernameChange}
			/>
			<EmailInput
				placeholder="E-mail"
				extraClass="mb-6"
				name={"email"}
				value={email}
				isIcon
				onChange={onEmailChange}
			/>
			<PasswordInput
				placeholder="Пароль"
				icon="EditIcon"
				name={'password'}
				disabled={false}
				value={password}
				onChange={onPasswordChange}
			/>
			{/*<div className={ProfileFormStyles.buttons}>
				<Button 
					htmlType={"submit"}
					type="primary" 
				>
					{'Изменить'}
				</Button>
				<Button 
					htmlType={"button"}
					type="primary" 
					onClick={onCancel}
				>
					{'Отменить'}
				</Button>
			</div>*/}
		</form>
)}

export default ProfileForm