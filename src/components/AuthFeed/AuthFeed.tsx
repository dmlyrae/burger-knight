import cl from './AuthFeed.module.css';
import { SingleOrder } from '../SingleOrder/SingleOrder';
import React, { FC, useCallback, useEffect } from 'react';
import { wsActionsAuth, wsAuthInit } from '../../store/reducers/wssOrders';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../types/redux';
import Modal from '../Modal/Modal';
import { OrderInfo } from '../OrderInfo/OrderInfo';
import { singleOrderSlice } from '../../store/reducers/singleOrderReducer';

interface AuthFeed {
	id?: string;
}

const AuthFeed:FC<AuthFeed> = ({id}) => {

	const dispatch = useAppDispatch();
	const { ordersAuth } = useAppSelector( state => state.wssOrders )
	const { wsConnection, wsConnectionAuth } = useAppSelector( state => state.wssOrders )
	const sortedOrders = [...ordersAuth]?.reverse()
	const { order: singleOrder } = useAppSelector( state => state.singleOrder )

	useEffect(() => {
		dispatch(wsAuthInit());
		return () => {
			dispatch(wsActionsAuth.onClose());
		}
	}, [])

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

	const closeOrderModalWindow = useCallback(() => {
		dispatch(singleOrderSlice.actions.closeOrder())
	}, [])

	return (
	<>
		<div className={cl["feed__wrapper"]}>
			{
				(wsConnection || wsActionsAuth) && Array.isArray(sortedOrders) ? (
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
		{
			singleOrder && (
				<Modal title={''} closeModal={closeOrderModalWindow}>
					<OrderInfo />
				</Modal>
			)
		}
	</>
	)
}

export default AuthFeed