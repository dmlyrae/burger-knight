import React, {useState, useContext, useMemo} from "react"
import BurgerConstructorStyles from "./BurgerConstructor.module.css"
import Subtract from "../../images/Subtract.svg"
import {
	ConstructorElement,
	DragIcon,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { cardDefaultProps, cardPropsTypes } from "../../utils/prop-types"
import { Modal } from "../Modal/Modal"
import OrderDetails from "../OrderDetails/OrderDetails"
import { BurgerContext } from '../../services/appContext'
import { burgerActionsTypes } from "../../store/actions/burgerActions"
import { fillOrder } from "../../utils/burger-api"

const BurgerConstructor = function() {

	const [modalDisplay, setModalDisplay] = useState(false)
  	const { burgerState, burgerDispatcher } = useContext(BurgerContext)

	const {bun, innerIngredients} = useMemo(() => {
		return burgerState.ingredients.reduce((separatedIngredients,ingredient) => {
			if (ingredient.type === 'bun') {
				separatedIngredients.bun = ingredient
			} else {
				separatedIngredients.innerIngredients = [...separatedIngredients.innerIngredients, ingredient]
			}
			return separatedIngredients
		}, {bun: null, innerIngredients: []})
	}, [burgerState.ingredients])

	const removeIngredient = (ingredientId) => {
		burgerDispatcher({
			type: burgerActionsTypes.REMOVE_INGREDIENT,
			payload: ingredientId,
		})
	}

	const toggleModalDisplay = () => {
		setModalDisplay((display) => !display)
	}

	const sendOrder = () => {
		const ingredients = burgerState.ingredients.reduce((list,ingredient) => [...list, ingredient._id], [])
		fillOrder({ingredients})
			.then(({data, error}) => {
				burgerDispatcher({
					type: burgerActionsTypes.FILL_ORDER,
					payload: {
						...data,
						error
					}, 
				})
				toggleModalDisplay()
			})
	}

	return (
		<section className={BurgerConstructorStyles["ingridients"]}>

			<div className={`${BurgerConstructorStyles["ingridient"]} ml-8 mb-4`}>
				{
					bun && <ConstructorElement
						text={`${bun.name} (верх)`}
						isLocked={true}
						price={bun.price}
						thumbnail={bun.image}
						type="top"
						handleClose={function(){
							removeIngredient(bun.id)
						}}
					/>
				}
			</div>

			<ul className={BurgerConstructorStyles["ingridients__list"]}>
				{innerIngredients.map((item) => {
					return (
						<li
							className={BurgerConstructorStyles["ingridient"]}
							key={item._id}
						>
							<DragIcon type={"secondary"} />
							<ConstructorElement
								thumbnail={item.image}
								price={item.price}
								text={item.name}
								handleClose={function() {
									removeIngredient(item._id)
								}}
							/>
						</li>
					);
				})}
			</ul>

			<div className={`${BurgerConstructorStyles["ingridient"]} ml-8 mb-10`}>
				{
					bun && <ConstructorElement
						text={`${bun.name} (низ)`}
						isLocked={true}
						price={bun.price}
						thumbnail={bun.image}
						type="bottom"
						handleClose={function(){
							removeIngredient(bun.id)
						}}
					/>
				}
			</div>

			<div className={BurgerConstructorStyles["ingridients__info"]}>
				<div className={BurgerConstructorStyles.price__group}>
					<p className="text text_type_digits-medium">
						{burgerState.totalPrice}
					</p>
					<img src={Subtract} alt="" />
				</div>
				<Button 
					type="primary" 
					htmlType="button" 
					size="large"
					onClick={sendOrder}
				>
					Оформить заказ
				</Button>
			</div>

			{
				modalDisplay && (
						<Modal title={''} closeModal={toggleModalDisplay}>
							<OrderDetails data={burgerState.orderDetails} />
						</Modal>
					)
			}

		</section>
	)
}

BurgerConstructor.defaultProps = cardDefaultProps
//BurgerConstructor.propTypes = cardPropsTypes

export default BurgerConstructor