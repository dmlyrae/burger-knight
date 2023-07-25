import React, { FC, useEffect } from "react";
import ProfileMenuStyles from './ProfileMenu.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { routerConfig } from "../../utils/routerConfig";
import { logoutAction } from "../../store/actions/userActions";
import { useAppSelector } from "../../types/redux";
import Modal from "../Modal/Modal";
import { singleOrderSlice } from "../../store/reducers/singleOrderReducer";
import OrderDetails from "../OrderDetails/OrderDetails";
import SingleOrderDetails from "../SingleOrderDetails/SingleOrderDetails";
import { OrderInfo } from "../OrderInfo/OrderInfo";


interface ProfileMenu {
	tab: 'profile' | 'orders' | 'orderId'
}
const ProfileMenu:FC<ProfileMenu> = function(props) {

	const { tab } = props;
	const { refreshToken } = useAppSelector( state => state.user );
	const { order: singleOrder } = useAppSelector( state => state.singleOrder );
	const dispatch = useDispatch();

	const closeOrderModalWindow = () => {
		dispatch(singleOrderSlice.actions.closeOrder())
	}

	useEffect(() => {
		if (singleOrder) {
			document.title = singleOrder.name;
			const id = window.history.length;
			window.history.pushState({ id }, "", `/profile/orders/${singleOrder._id}`);
		} else {
			document.title = 'Order details';
			const id = window.history.length - 1;
			window.history.replaceState( { id }, "", `/`)
		}
	}, [singleOrder])

	return (
	<>
		<div 
			className={ProfileMenuStyles.root}
		>
			<ul className={ProfileMenuStyles.list}>
				<li
					className={['text text_type_main-medium text_color_inactive', ProfileMenuStyles.list__item].join(' ')}
				>
					<NavLink
						to={routerConfig.profile.path ?? `/`}
						className={
							tab === 'profile' ? ProfileMenuStyles.active : ProfileMenuStyles.link
						}
						end
					>
						{'Профиль'}
					</NavLink>
				</li>
				<li
					className={`text text_type_main-medium text_color_inactive ${ProfileMenuStyles.list__item}`}
				>
					<NavLink
						to={routerConfig.orders.path ?? `/`}
						className={
							tab === 'orders' ? ProfileMenuStyles.active : ProfileMenuStyles.link
						}
					>
						{'История заказов'}
					</NavLink>
				</li>
				<li
					className={`text text_type_main-medium text_color_inactive ${ProfileMenuStyles.list__item}`}
				>
				<NavLink
					onClick={() => {
						if (refreshToken) {
							logoutAction(refreshToken)(dispatch)
						}
					}}
					to={routerConfig.login.path ?? `/`}
					className={ ProfileMenuStyles.link }
				>
					{'Выход'}
				</NavLink>
				</li>
			</ul>
			<p className={['text text_type_main-default text_color_inactive', ProfileMenuStyles.text].join(' ')}>
				{
					tab === 'profile' ? 
						'В этом разделе вы можете изменить свои персональные данные'
						: 
						'В этом разделе вы можете просмотреть свою историю заказов'
				}
			</p> 
		</div>

		{
			singleOrder && (
				<Modal title={''} closeModal={closeOrderModalWindow}>
					<OrderInfo />
				</Modal>
			)
		}
	</>
)}

export default ProfileMenu;