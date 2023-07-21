import cl from './Feed.module.css';
import React from 'react';
import { wsInit, wsActions } from "../../store/reducers/wssOrders"
import { IOrder } from "../../types/orders";
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../types/redux';
import { SingleOrder } from '../../components/SingleOrder/SingleOrder';

const OrdersFeed = () => {
	const dispatch = useAppDispatch();

	const { orders } = useAppSelector((store) => store.wssOrders )

	const ordersSuccess = orders.filter((order) => order.status === 'done');
	const ordersCreated = orders.filter((order) => order.status === 'created');

	const { total, totalToday, wsConnected } = useAppSelector( store => store.wssOrders );

	React.useEffect(() => {
		dispatch(wsInit());
		return () => {
			dispatch(wsActions.onClose());
		}
	}, []);

	return (
		<div className={cl.page}>
			<h2 className={cl.title}>Real-time order feed</h2>
			{
				wsConnected ?
					(
						<section className={cl.section}>
							<ul className={cl.orderList}>
								{orders.map((o: IOrder) => (
									<li key={o.number} className={cl.order}><SingleOrder order={o} status={false} /></li>
								))}
							</ul>
							<div className={cl.container}>
								<div className={cl.orders}>
									<div className={cl.block}>
										<p className={cl.ordersTitle}>Ready:</p>
										<ul className={cl.numberList}>
											{
												ordersSuccess.map((order) => {
													return (<li className={cl.number} style={{ color: '#00CCCC' }} key={order.number}>{order.number}</li>)
												})
											}
										</ul>
									</div>
									<div className={cl.block}>
										<p className={cl.ordersTitle}>Preparing:</p>
										<ul className={cl.numberList}>
											{
												ordersCreated.map((order) => {
													return (<li className={cl.number} key={order.number}>{order.number}</li>)
												})
											}
										</ul>
									</div>
								</div>
								<div className={cl.summarize}>
									<p className={cl.total}>Total burgers made:</p>
									<p className={cl.sum}>{total}</p>
								</div>
								<div className={cl.summarize}>
									<p className={cl.total}>Burgers made today:</p>
									<p className={cl.sum}>{totalToday}</p>
								</div>
							</div>
						</section>
					)
					: <Loader />
			}
		</div>
	)
};

export default OrdersFeed;