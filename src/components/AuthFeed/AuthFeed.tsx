import cl from './AuthFeed.module.css';
import { SingleOrder } from '../SingleOrder/SingleOrder';
import React from 'react';
import { wsActionsAuth, wsAuthInit } from '../../store/reducers/wssOrders';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../types/redux';

const AuthFeed = () => {

	const dispatch = useAppDispatch();
	const { ordersAuth } = useAppSelector( state => state.wssOrders );
	const { wsConnected } = useAppSelector( state => state.wssOrders );
	const sortedOrders = [...ordersAuth]?.reverse();

	React.useEffect(() => {
		dispatch(wsAuthInit());
		return () => {
			dispatch(wsActionsAuth.onClose());
		}
	}, []);

	return (
		<div className={cl.page}>
			<h2 className={cl.title}>{'You have ordered:'}</h2>
			{
				wsConnected && sortedOrders.length !== 0 ? (
					<ul className={cl.list}>
						{
							sortedOrders.map( order => {
								return (
									<li className={cl.order} key={order.number}>
										<SingleOrder order={order} status/>
									</li>
								)
							})
						}
					</ul>
				)
				: <Loader />
			}
		</div>
	)
}

export default AuthFeed;