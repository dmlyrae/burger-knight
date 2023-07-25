import cl from './AuthFeed.module.css';
import { SingleOrder } from '../SingleOrder/SingleOrder';
import React from 'react';
import { wsActionsAuth, wsAuthInit } from '../../store/reducers/wssOrders';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../types/redux';

const AuthFeed = () => {

	const dispatch = useAppDispatch();
	const { ordersAuth } = useAppSelector( state => state.wssOrders );
	const { wsConnection } = useAppSelector( state => state.wssOrders );
	const sortedOrders = [...ordersAuth]?.reverse();

	React.useEffect(() => {
		dispatch(wsAuthInit());
		return () => {
			dispatch(wsActionsAuth.onClose());
		}
	}, []);

	return (
		<div className={cl["feed__wrapper"]}>
			{
				wsConnection && Array.isArray(sortedOrders) ? (
					<div className={cl["feed__list"]}>
						{
							sortedOrders.map( order => (
								<SingleOrder 
									order={order} 
									maxWidth={"100%"} 
									key={order._id}
								/>
							))
						}
					</div>
				)
				: <Loader />
			}
		</div>
	)
}

export default AuthFeed;