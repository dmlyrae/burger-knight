import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cl from './SingleOrder.module.css';
import { v4 as uuidv4 } from 'uuid';
import { countPrice, getIngredients } from '../../utils/ingredients';
import { maxIngredientsShowed } from '../../utils/data';
import { useLocation, Link } from 'react-router-dom';
import { getTimeFromTimestamp } from '../../utils/getTime';
import { TCard } from '../../types/cards';
import { IOrder } from '../../types/orders';
import { useAppDispatch, useAppSelector } from '../../types/redux';
import { singleOrderSlice } from '../../store/reducers/singleOrderReducer';

interface IOrderProps {
	order: IOrder;
	status: boolean;
}

export const SingleOrder: React.FunctionComponent<IOrderProps> = ({ order, status }) => {

	const { ingredients } = useAppSelector( state => state.ingredients );
	const { order: singleOrder } = useAppSelector( state => state.singleOrder)

	const location = useLocation();
	const dispatch = useAppDispatch();

	const chosenIngredients = getIngredients(order.ingredients, ingredients)
	const visiableIngredients = chosenIngredients.slice(0, maxIngredientsShowed + 1);
	const price: number = countPrice(chosenIngredients);
	const bun = chosenIngredients.find((i) => i.type === 'bun');

	const showOrderModalWindow = (e:React.MouseEvent) => {
		e.stopPropagation();
		dispatch(singleOrderSlice.actions.openOrder(order));
	}


	return (
			<article 
				className={[cl.root, "p-12"].join(" ")}
				onClick={showOrderModalWindow}
			>
				<div className={cl.description}>
					<p className={cl.number}>
						#{order.number}
					</p>
					<p className={cl.date}>
						{getTimeFromTimestamp(order.createdAt)}
					</p>
				</div>

				<h3 className={cl.title} style={status ? { marginBottom: 0 } : { marginBottom: 24 }}>
					{order.name}
				</h3>
				{
					status && (
						<p className={cl.status} style={order.status === 'done' ? { color: '#00CCCC' } : order.status === 'done' ? { color: '#F2F2F3' } : { color: 'FF0000' }}>
							{order.status === 'done' ? 'Ready' : order.status === 'done' ? 'Preparing' : 'Cancled'}
						</p>
					)
				}
				<div className={cl["main-info"]}>
					<ul className={cl["ingredient-list"]}>
						<li 
							className={cl["ingredient"]} 
							key={uuidv4()} 
						>
							<img src={bun?.image} alt={bun?.name} className={cl.image} style={{ opacity: 0.6 }} />
						</li>
						{
						visiableIngredients.map((i: TCard, index: number) => {
							if (index < maxIngredientsShowed && i.type !== 'bun') {
								return (
									<li 
										key={uuidv4()} 
										className={cl.ingredient} 
										style={{ zIndex: maxIngredientsShowed - index }}
									>
										<img src={i.image} alt={i.name} className={cl.image} />
									</li>
								)
							} else if (index === maxIngredientsShowed && chosenIngredients.length === 6 && i.type !== 'bun') {
								return (
									<li 
										key={uuidv4()} 
										className={cl.ingredient} 
										style={{ zIndex: maxIngredientsShowed - index }}
									>
										<img src={i.image} alt={i.name} className={cl.image} />
									</li>
								)
							} else if (i.type !== 'bun') {
								return (
									<li 
										key={uuidv4()} 
										className={cl.ingredient} 
										style={{ zIndex: maxIngredientsShowed - index }}
									>
										<img src={i?.image} alt={i?.name} className={cl.image} style={{ opacity: 0.6 }} />
										<p className={cl.rest}>+{chosenIngredients.length - maxIngredientsShowed}</p>
									</li>
								)
							}
						})
						}
					</ul>
					<div className={cl.sum}>
						<p className={cl.price}>
							{price}
							<span className={cl.icon}>
								<CurrencyIcon type="primary" />
							</span>
						</p>
					</div>
				</div>
			</article>
	)
}