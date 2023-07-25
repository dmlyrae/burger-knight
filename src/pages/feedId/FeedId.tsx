import { FC, useMemo } from "react";
import { OrderInfo } from "../../components/OrderInfo/OrderInfo";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../types/redux";
import Loader from "../../components/Loader/Loader";
import cl from "./FeedId.module.css"


interface FeedIdProps {
}

export const FeedId:FC<FeedIdProps> = function() {

	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { orders } = useAppSelector( state => state.wssOrders )
	const { total, totalToday, wsConnection } = useAppSelector( state => state.wssOrders );
	const { isAuth } = useAppSelector( state => state.user )

	const order = useMemo(() => {
		return orders.find( o => o._id === id );
	}, [ orders, id ])

	return order || id ? (
		<div 
			className={cl["root"]}
		>
			<OrderInfo order={order} />
		</div>
	) : (
		<Loader />
	)
}