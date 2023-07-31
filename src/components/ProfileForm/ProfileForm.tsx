import React, { useEffect, useState } from "react";
import ProfileFormStyles from './ProfileForm.module.css';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { setEmail, setUsername, userGetAction, userPatchAction } from "../../store/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../types/redux";
import { useForm } from "../../hooks/useForm";

function ProfileForm() {

	const dispatch = useAppDispatch()
	const { username, email, accessToken } = useAppSelector( state => state.user )
	const { values, handleChange, changeValue } = useForm({ newEmail: email, newUsername: username, password: "" })

	const onSave = (event:React.FormEvent) => {
		event.preventDefault();
		const { newUsername, newEmail, password } = values;
		if ( newEmail && newUsername ) {
			dispatch(setUsername(newUsername))
			dispatch(setEmail(newEmail))
			dispatch(userPatchAction({
				user: {
					email: newEmail,
					name: newUsername,
					password
				}},
				accessToken
			))
		}
	}

	const onCancel = () => {
		changeValue("newEmail")(email)
		changeValue("newUsername")(username)
		dispatch(userPatchAction({
			user: {
				email,
				name: username,
			}},
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
				name={"newUsername"}
				type="text"
				value={values.newUsername ?? ""}
				onChange={handleChange}
			/>
			<EmailInput
				placeholder="E-mail"
				extraClass="mb-6"
				name={"newEmail"}
				value={values.newEmail ?? ""}
				isIcon
				onChange={handleChange}
			/>
			<PasswordInput
				placeholder="Пароль"
				icon="EditIcon"
				name={'password'}
				disabled={false}
				value={values.password ?? ""}
				onChange={handleChange}
			/>
			{
				Object.values(values).every( v => v) && (email !== values.newEmail || username !== values.newUsername ) && 
				(
					<div className={ProfileFormStyles["buttons-row"]}>
						<Button
							htmlType="submit" 
							type="primary" 
							size="medium"
						>
							{"Сохранить"}
						</Button>
						<Button
							htmlType="reset" 
							type="primary" 
							size="medium"
							onClick={onCancel}
						>
							{"Отменить"}
						</Button>
					</div>
				) 
			}
		</form>
)}

export default ProfileForm