import cl from './Feed.module.css';
import { useEffect, useMemo } from 'react';
import { wsInit, wsActions } from "../../store/reducers/wssOrders"
import { IOrder } from "../../types/orders";
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../types/redux';
import { SingleOrder } from '../../components/SingleOrder/SingleOrder';
import { singleOrderSlice } from '../../store/reducers/singleOrderReducer';
import Modal from '../../components/Modal/Modal';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { OrderInfo } from '../../components/OrderInfo/OrderInfo';

const OrdersFeed = () => {
	const dispatch = useAppDispatch();
	const { orders } = useAppSelector( state => state.wssOrders )
	const { order: singleOrder } = useAppSelector( state => state.singleOrder )

	const safeOrders = useMemo(() => {
		return (orders ?? []);
	}, [orders])

	const ordersCreated = useMemo(() => {
		return safeOrders.filter( order => order.status === 'created');
	}, [safeOrders])

	const ordersSuccess = useMemo(() => {
		return safeOrders.filter( order => order.status === 'done');
	}, [safeOrders])

	const { total, totalToday, wsConnection } = useAppSelector( state => state.wssOrders );

	const ordersSuccessDivide = useMemo(() => {
		let result = [];
		let localOrders = [...ordersSuccess];
		const chunkLimit = 10;
		while (localOrders.length > 0) {
			result.push(localOrders.splice(0, chunkLimit));
		}
		return result;
	}, [ordersSuccess])

	useEffect(() => {
		dispatch(wsInit());
		return () => {
			if (wsConnection) {
				dispatch(wsActions.onClose());
			}
		}
	}, [])

	const closeSingleOrderWindow = () => {
		document.title = 'Orders feed';
		const id = window.history.length - 1;
		window.history.replaceState( { id }, "", `/`)
		dispatch(singleOrderSlice.actions.closeOrder())
	}

	return wsConnection ? (
	<>
		<h2 className={[cl["title"], "text text_type_main-large"].join(" ")}>
			{'Лента заказов'}
		</h2>
		<div className={cl["feed-page"]}>
			<div className={cl["feed"]}>


				<section className={cl["feed__list"]}>
					{
						safeOrders.map( (order: IOrder) => (
							<SingleOrder 
								navigateOnClick
								order={order} 
								key={order._id}
							/>
						))
					}
				</section>
			</div>
			<div className={cl["stats"]} >

				<div className={cl["stats__main"]}>
					<div className={cl["stats__ready"]}>
						<h4 className={"text text_type_main-medium mb-6"}>
							{'Готовы:'}
						</h4>
						<div
							className={cl["orders-columns__list"]}
						>
							{
								ordersSuccessDivide.map( (orderArray,i) => (
									<div
										className={cl["order-column"]}
										key={i}
									>
										{
											orderArray.map((order) => (
												<span 
													className={"text text_type_main-medium"}
													key={order.number}
												>
													{order.number}
												</span>
											))
										}
									</div>
								))
							}
						</div>
					</div>
					<div className={cl["stats__in-work"]}>
						<h4 className={"text text_type_main-medium mb-6"}>
							{'В работе:'}
						</h4>
						{
							ordersCreated.map((order) => (
								<span 
									className={"text text_type_main-medium"}
									key={order.number}
								>
									{order.number}
								</span>
							))
						}
					</div>
				</div>

				<div className={cl["stats__all-time"]}>
					<h4 className={"text text_type_main-medium mb-6"}>
						{'Выполнено за все время:'}
					</h4>
					<span
						className={[cl["huge-large"], "text text_type_main-large"].join(" ")}
					>
						{total}
					</span>
				</div>

				<div className={cl["stats__today"]}>
					<h4 className={"text text_type_main-medium mb-6"}>
						{'Выполнено за сегодня:'}
					</h4>
					<span
						className={[cl["huge-large"], "text text_type_main-large"].join(" ")}
					>
						{totalToday}
					</span>
				</div>
			</div>
		</div>

		{
			singleOrder && (
					<Modal title={''} closeModal={closeSingleOrderWindow}>
						<OrderInfo order={singleOrder} />
					</Modal>
				)
		}

	</>
	) : (
		<Loader />
	)
};

export default OrdersFeed;