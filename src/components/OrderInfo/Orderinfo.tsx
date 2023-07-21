import orderInfoStyles from './order-info.module.css';
import { countBurgerIngredients, countPrice, getIngredients } from "../../utils/ingredients";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../Loader/Loader';
import { getTimeFromTimestamp } from '../../utils/getTime';
import { useAppSelector } from '../../types/redux';

export const OrderInfo = () => {

	const {  ingredients  } = useAppSelector( store => store.ingredients);
	const { orderDetails } = useAppSelector( store => store.order);

	const orderIngredients = getIngredients(orderDetails.order?.ingredients, ingredients);
	const price: number = countPrice(ingredients);
	const filtretedIngredients = countBurgerIngredients(ingredients);
	const uniqueIngredients: Array<string> = Array.from(new Set(orderDetails.order?.ingredients))

	return (
		<>
			{
				orderDetails.order._id
					? (
						<div className={orderInfoStyles.page} >
							<p className={orderInfoStyles.number}>#{orderDetails.order.number}</p>
							<h2 className={orderInfoStyles.title}>{orderDetails.order.name}</h2>
							<p className={orderInfoStyles.status} 
								style={
										orderDetails.order.status === 'done' ? {color: '#00CCCC'} : orderDetails.order.status === 'done' ? {color: '#F2F2F3'} : {color: 'FF0000'}
								}
								>
								{orderDetails.order.status === 'done' ? 'Ready' : orderDetails.order.status === 'done' ? 'Preparing' : 'Canceled'}
						</p>
							<p className={orderInfoStyles.details}>Details:</p>
							<ul className={orderInfoStyles.list}>
								{
									uniqueIngredients.map((i) => {
										return (<li className={orderInfoStyles.ingredient} key={uuidv4()}>
											<div className={orderInfoStyles.block}>
												<div className={orderInfoStyles.wrapper}><img className={orderInfoStyles.image} src={filtretedIngredients.item[i]?.image} alt={filtretedIngredients.item[i]?.name} /></div>
												<p className={orderInfoStyles.name}>{filtretedIngredients.item[i]?.name}</p>
											</div>
											<div className={orderInfoStyles.block}>
												<p className={orderInfoStyles.price}>{filtretedIngredients.count[i]} x {filtretedIngredients.item[i]?.price}</p>
												<span className={orderInfoStyles.icon}><CurrencyIcon type='primary' /></span>
											</div>
										</li>)
									})
								}
							</ul>
							<div className={orderInfoStyles.info}>
								<p className={orderInfoStyles.date}>{getTimeFromTimestamp(orderDetails.order.createdAt)}</p>
								<div className={orderInfoStyles.block}>
									<p className={orderInfoStyles.price}>{price}</p>
									<span className={orderInfoStyles.icon}><CurrencyIcon type='primary' /></span>
								</div>
							</div>
						</ div>
					)
					: <Loader />
			}
		</>

	)
}