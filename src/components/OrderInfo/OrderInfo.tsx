import cl from './OrderInfo.module.css';
import { getIngredients, getPrice, countIngredients } from "../../utils/ingredients";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../Loader/Loader';
import { getTimeFromTimestamp } from '../../utils/getTime';
import { useAppDispatch, useAppSelector } from '../../types/redux';
import { TOrderDetails } from '../../store/reducers/orderReducer';
import { FC, useEffect, useMemo } from 'react';
import { IOrder } from '../../types/orders';
import { useNavigate, useParams } from 'react-router-dom';
import { wsActions, wsInit } from '../../store/reducers/wssOrders';

interface OrderInfo {
	order?: IOrder
}

export const OrderInfo:FC<OrderInfo> = function(props) {

	const {  ingredients: allIngredients  } = useAppSelector( state => state.ingredients )
	const { order: singleOrder } = useAppSelector( state => state.singleOrder)
	const { orders, wsConnection } = useAppSelector( state => state.wssOrders )
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const navigate = useNavigate()

	const order = useMemo(() => {
		const orderInHistory = (orders ?? [])
			.find( order => order._id === id );
		const result = orderInHistory ?? props?.order ??  singleOrder;
		const localOrders = JSON.parse(localStorage.getItem("__orders") ?? `[]`);
		if (result) {
			const newLocalOrders = localOrders
				.filter( (order:IOrder) => order._id !== result._id)
				.concat( result )
				.slice(-50);
			localStorage.setItem('__orders', JSON.stringify(newLocalOrders));
			return result;
		} else {
			return localOrders.find( (order:IOrder) => order._id === id );
		}
	}, [id, props, singleOrder ]);

	useEffect(() => {

		if ( !wsConnection || !orders.length ) {
			dispatch(wsInit());
		}

		return () => {
			if (wsConnection) {
				dispatch(wsActions.onClose());
			}
		}

	}, [])
	const isModal = !Boolean(props?.order)

	const orderIngredients = getIngredients(order?.ingredients, allIngredients)
	const ingredients: Array<string> = Array.from(new Set(order?.ingredients ?? []))

	const price: number = getPrice(orderIngredients);
	const { count, items } = countIngredients(orderIngredients);

	return order?._id
			? (
				<div className={cl["order__wrapper"]} >
					<p className={[cl["order__number"], "text text_type_main-medium"].join(" ")}>
						{`#${order?.number}`}
					</p>
					<h2 className={[cl["order__name"], "text text_type_main-medium" ].join(" ")}>
						{order?.name ?? 'Order name'}
					</h2>
					<p 
						className={[
							cl["order__status"], 
							"text text_type_main-default",
							(order.status === "done" ? cl["order__status_done"] : cl["order__status_proccess"])
						].join(" ")} 
					>
						{
							order.status === 'done' ? "Выполнен" : 'Готовится'
						}
					</p>
					<p 
						className={[cl["order__details"], "text text_type_main-medium"].join(" ")}
					>
						{"Состав:"}
					</p>
					<ul 
						className={[cl["order__ingredients"], (isModal ? cl["order__modal-list"] : "") ].join(" ")}
					>
						{
							ingredients.map((ingredient) => 
								(<li 
									className={cl["ingredient__line"]} 
									key={ingredient}
								>
									<div className={cl["ingredient__cell"]}>
										<div 
											className={cl["image__wrapper"]}
										>
											<div 
												className={cl["ingredient__image"]}
												style={{
													backgroundImage: `url(${items[ingredient]?.image})`,
												}}
											/>
										</div>
									</div>
									<div className={cl["ingredient__cell"]}>
										<p className={[cl["ingredient__name"], "text text_type_main-default"].join(" ")}>
											{items[ingredient]?.name}
										</p>
									</div>
									<div className={cl["ingredient__cell"]}>
										<p className={cl["ingredient__price"]}>
											{`${count[ingredient]} x ${items[ingredient]?.price}`}
										</p>
										<CurrencyIcon type='primary' />
									</div>
								</li>
							))
						}
					</ul>
					<div className={cl["order__info"]}>
						<p 
							className={[cl["order__date"], cl["order__cell"], "text text_type_main-default text_color_inactive"].join(" ")}
						>
							{getTimeFromTimestamp(order.createdAt)}
						</p>
						<div className={cl["order__cell"]}>
							<p className={cl["order__price"]}>
								{price}
							</p>
							<CurrencyIcon type="primary" />
						</div>
					</div>
				</ div>
			) : (
				<Loader />
			)
}