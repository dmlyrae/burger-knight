import React, { useEffect, useState } from "react";
import ProfileFormStyles from './ProfileForm.module.css';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setUsername, userGetAction, userPatchAction } from "../../store/actions/userActions";

function ProfileForm() {

	const dispatch = useDispatch();
	const { refreshToken, username, email, accessToken } = useSelector( state => state.user );
	const [ password, setPassword ] = useState('');
	const [ newEmail, setNewEmail ] = useState(email);
	const [ newUsername, setNewUsername ] = useState(username);

	const onUsernameChange = (event) => {
		dispatch(setUsername(event.target.value))
	}

	const onEmailChange = (event) => {
		dispatch(setEmail(event.target.value))
	}

	const onPasswordChange = (event) => setPassword(event.target.value);

	const onSave = (event) => {
		event.preventDefault();
		dispatch(userPatchAction(
			{
				email: newEmail,
				name: newUsername,
			},
			accessToken
		))
	}

	const onCancel = (event) => {
		event.preventDefault();
		dispatch(userPatchAction(
			{
				email,
				name: username,
			},
			accessToken
		))
	}

	useEffect(() => {
		dispatch(userGetAction(accessToken))
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