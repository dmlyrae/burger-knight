import React from "react";
import PropTypes from "prop-types";
import ProfileMenuStyles from './ProfileMenu.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { routerConfig } from "../../utils/routerConfig";
import { logoutAction } from "../../store/actions/userActions";

function ProfileMenu(props) {

	const { tab } = props;
	const { refreshToken } = useSelector( state => state.user );
	const dispatch = useDispatch();

	return (
		<div 
			className={ProfileMenuStyles.root}
		>
			<ul className={ProfileMenuStyles.list}>
				<li
					className={['text text_type_main-medium text_color_inactive', ProfileMenuStyles.list__item].join(' ')}
				>
					<NavLink
						to={routerConfig.profile.path}
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
						to={routerConfig.orders.path}
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
							dispatch(logoutAction(refreshToken))
						}
					}}
					to={routerConfig.login}
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
)}

ProfileMenu.propTypes = {
	tab: PropTypes.oneOf(['profile', 'orders', 'orderId']).isRequired
}

export default ProfileMenu;