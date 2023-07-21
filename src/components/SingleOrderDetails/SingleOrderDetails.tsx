import cl from "./SingleOrderDetails.module.css"
import done from "../../images/Done.svg"
import { useAppSelector } from "../../types/redux"

const validateOrderNumber = (orderNumber:number) => {
	const result = orderNumber.toString() 
	return Array(6 - result.length).fill('0').join('') + result
}

const SingleOrderDetails = () => {

  	const { order } = useAppSelector(state => state.singleOrder)

	return order && (
		<section className={cl["order-details"]}>
			<h2 className={`${cl["order__number"]} text text_type_digits-large mt-4`}>
				{validateOrderNumber(order.number)}
			</h2>
			<p className="text text_type_main-medium mt-8">
				идентификатор заказа
			</p>
			<img 
				className={cl["order__image"]} 
				src={done} 
				alt={'Order done'}
			/>
			<p className={`${cl["order__desktop"]} text text_type_main-default`}>
				Ваш заказ начали готовить
			</p>
			<p className={`${cl["order__desktop"]} text text_type_main-default text_color_inactive mt-2`}>
				Дождитесь готовности на орбитальной станции
			</p>
		</section>
	)
}

export default SingleOrderDetails;