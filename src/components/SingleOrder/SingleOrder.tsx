import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cl from './SingleOrder.module.css';
import { v4 as uuid } from 'uuid';
import { getPrice, getIngredients } from '../../utils/ingredients';
import { maxIngredientsInList } from '../../utils/data';
import { getTimeFromTimestamp } from '../../utils/getTime';
import { TCard } from '../../types/cards';
import { IOrder } from '../../types/orders';
import { useAppDispatch, useAppSelector } from '../../types/redux';
import { singleOrderSlice } from '../../store/reducers/singleOrderReducer';
import { FC } from 'react';

const statusVocabulary:Record<string, string> = {
	done: 'Выполнен',
	prepare: 'Готовится',
	default: 'Готовится'
}

interface IOrderProps {
	order: IOrder;
	navigateOnClick?: boolean;
	orderSuccess?: 'done' | 'ready';
	maxWidth?: string;
}

export const SingleOrder: FC<IOrderProps> = ({ navigateOnClick, order, maxWidth }) => {

	const { ingredients } = useAppSelector( state => state.ingredients );
	const { order: singleOrder } = useAppSelector( state => state.singleOrder)

	const dispatch = useAppDispatch()

	const chosenIngredients = getIngredients(order.ingredients, ingredients)
	const bunIngredient = chosenIngredients.find( ingredient => ingredient.type === 'bun')
	const showedIngredients = chosenIngredients
		.filter( ing => ing.type !== 'bun' )
		.slice(0, maxIngredientsInList)
	const orderPrice = getPrice(chosenIngredients);
	const restIngredientsCount = showedIngredients.length + 1 - maxIngredientsInList;

	const showOrderModalWindow = (e:React.MouseEvent) => {
		e.stopPropagation()
		if (!singleOrder) {
			document.title = order.name;
			const id = window.history.length;
			window.history.pushState({ id }, "", `/feed/${order._id}`);
			dispatch(singleOrderSlice.actions.openOrder(order))
		} else {
			document.title = 'Orders feed';
			const id = window.history.length - 1;
			window.history.replaceState( { id }, "", `/`)
		}
	}

	return (
			<article 
				className={[cl.root, "p-12"].join(" ")}
				onClick={showOrderModalWindow}
				style={{
					...(maxWidth ? {maxWidth} : {})
				}}
			>
				<div className={cl.description}>
					<p className={"text text_type_digits-default"}>
						{`#${order.number}`}
					</p>
					<p className={"text text_type_main-default text_color_inactive"}>
						{getTimeFromTimestamp(order.createdAt)}
					</p>
				</div>

				<h3 className={[cl["title"], "text text_type_main-medium"].join(" ")}>
					{order.name}
				</h3>
				
				<p
					className={[
						cl["order__status"], 
						"text text_type_main-default",
						cl[order.status]
					].join(" ")}
				>
					{statusVocabulary[order.status] ?? statusVocabulary["default"]}
				</p>

				<div className={cl["main-info"]}>
					<ul className={cl["ingredient-list"]}>
						<li 
							className={cl["ingredient-image__wrapper"]}
						>
							<div 
								className={cl["ingredient-image"]} 
								key={uuid()} 
								style = {{
									backgroundImage: `url(${bunIngredient?.image})`,
									display: 'block',
								}}
							/>
						</li>
						{
							showedIngredients.map((ingredient: TCard, index: number) => (
								<li 
									className={cl["ingredient-image__wrapper"]}
									key={index}
								>
									<div 
										className={cl["ingredient-image"]} 
										key={index} 
										style = {{
											backgroundImage: `url(${ingredient?.image})`,
										}}
									/>
								</li>
							))
						}
						{
							restIngredientsCount > 0 && (
								<li 
									className={cl["ingredient-image__wrapper"]}
								>
									<div 
										className={[cl["ingredient-image"], cl["last-ingredient-image"]].join(" ")} 
									/>
									<p className={cl["rest-ingredients"]}>
										{`+${restIngredientsCount}`}
									</p>
								</li>
							)
						}
					</ul>
					<div className={cl["sum"]}>
						<p className={[cl.price, "text text_type_main-medium"].join(" ")}>
							{orderPrice}
						</p>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</article>
	)
}