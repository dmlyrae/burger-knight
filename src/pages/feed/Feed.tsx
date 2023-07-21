import cl from './Feed.module.css';
import { useEffect } from 'react';
import { wsInit, wsActions } from "../../store/reducers/wssOrders"
import { IOrder } from "../../types/orders";
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../types/redux';
import { SingleOrder } from '../../components/SingleOrder/SingleOrder';
import { useNavigate } from 'react-router-dom';
import { routerConfig } from '../../utils/routerConfig';

const OrdersFeed = () => {
	const dispatch = useAppDispatch();

	const { orders } = useAppSelector((store) => store.wssOrders )

	const ordersSuccess = orders.filter((order) => order.status === 'done');
	const ordersCreated = orders.filter((order) => order.status === 'created');

	const { total, totalToday, wsConnected } = useAppSelector( store => store.wssOrders );
	const { isAuth } = useAppSelector( state => state.user )

	const navigate = useNavigate();


	useEffect(() => {
		if (!isAuth) {
			navigate(routerConfig.login.path ?? `/`)
		} else {
			dispatch(wsInit());
		}
		return () => {
			if (wsConnected) {
				dispatch(wsActions.onClose());
			}
		}
	}, []);

	return (
		<div className={cl["feed-page"]}>
			<div className={cl["feed"]}>

				<h2 className={cl.title}>
					{'Лента заказов'}
				</h2>

				{
					wsConnected ?
						(
							<section className={cl.section}>

								<ul className={cl.orderList}>
									{orders.map( (order: IOrder) => (
										<li key={order.number} className={cl.order}>
											<SingleOrder order={order} status={false} />
										</li>
										)
									)}
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
			<div className={cl["stats"]} >

				<div className={cl["stats__main"]}>
					<div className={cl["stats__ready"]}>
						<h4>{'Готовы:'}</h4>
						<span>034533</span>
						<span>034533</span>
						<span>034533</span>
						<span>034533</span>
						<span>034533</span>
					</div>
					<div className={cl["stats__in-work"]}>
						<h4>{'В работе:'}</h4>
						<span>034533</span>
						<span>034533</span>
						<span>034533</span>
						<span>034533</span>
					</div>
				</div>

				<div className={cl["stats__all-time"]}>
					<h2>{'Выполнено за все время:'}</h2>
					<span>28752</span>
				</div>

				<div className={cl["stats__today"]}>
					<h2>{'Выполнено за сегодня:'}</h2>
					<span>752</span>
				</div>
			</div>
		</div>
	)
};

export default OrdersFeed;