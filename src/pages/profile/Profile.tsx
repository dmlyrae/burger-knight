import React, { useState, useEffect, ChangeEvent, FC } from 'react';
import ProfileStyles from './Profile.module.css';
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import OrderItemHistoryDetails from "../../components/OrderItemHistoryDetails/OrderItemHistoryDetails";
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import { useNavigate, useParams } from 'react-router-dom';
import { routerConfig } from '../../utils/routerConfig';
import { useAppSelector } from '../../types/redux';
import AuthFeed from '../../components/AuthFeed/AuthFeed';

interface Profile {
	tab: 'profile' | 'orders' | 'orderId';
	id?: string; 
}
const Profile:FC<Profile> = function(props) {

	const navigate = useNavigate();
	const { tab } = props;
	const { id } = useParams();
	const { isAuth } = useAppSelector( state => state.user )

	useEffect(() => {
		if (!isAuth) {
			navigate(routerConfig.login.path ?? `/`)
		}
	}, [isAuth])

	return (
		<div 
			className={ProfileStyles.root}
		>
			<ProfileMenu tab={tab} />
			{ 
				tab === 'profile' ? 
				(
					<ProfileForm />
				) : (
					tab === 'orders' && id ? 
						(
							<OrderItemHistoryDetails id={id} />
						) : (
							<AuthFeed />
						)
				)
			
			}
		</div>
)}


export default Profile