import React, { useState, useEffect, ChangeEvent, FC } from 'react';
import PropTypes from "prop-types";
import ProfileStyles from './Profile.module.css';
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import OrdersHistory from "../../components/OrdersHistory/OrdersHistory";
import OrderItemHistoryDetails from "../../components/OrderItemHistoryDetails/OrderItemHistoryDetails";
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routerConfig } from '../../utils/routerConfig';
import { useAppSelector } from '../../types/redux';

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
							<OrdersHistory />
						)
				)
			
			}
		</div>
)}


export default Profile