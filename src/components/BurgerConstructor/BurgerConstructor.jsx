import React, { useMemo, useRef } from "react"
import BurgerConstructorStyles from "./BurgerConstructor.module.css"
import Subtract from "../../images/Subtract.svg"
import {
	ConstructorElement,
	DragIcon,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { cardDefaultProps, cardProps } from "../../utils/prop-types"
import { Modal } from "../Modal/Modal"
import OrderDetails from "../OrderDetails/OrderDetails"
import { useDispatch,useSelector } from "react-redux"
import { sendOrderAction, toggleOrderModal } from "../../store/actions/orderActions"
import { addIngredient, changeOrderIngredients, removeIngredientAction } from "../../store/actions/burgerActions"
import { useDrag, useDrop } from "react-dnd"
import PropTypes from "prop-types"


const BurgerIngredient = ({item,index}) => {

 	const ingredientRef = useRef(null)
	const dispatch = useDispatch()

  	const [{ handlerId,isOver}, dropRef] = useDrop({
    	accept: 'burgerIngredient',
    	collect: monitor => ({
        	handlerId: monitor.getHandlerId(),
			isOver: !!monitor.isOver(),
		}),
		drop(item) {
      		if (!ingredientRef.current) { return; }
			const dragIndex = item.index
			const dropIndex = index
			if (dragIndex === dropIndex) {
				return
			}
			dispatch(changeOrderIngredients(dragIndex, dropIndex))
			return;
		},
	})

	const [{ isDragging }, dragRef] = useDrag({
		type: 'burgerIngredient',
		item:  { index } ,
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

  	dragRef(dropRef(ingredientRef))

	const removeIngredient = (ingredientNumber) => {
		dispatch(removeIngredientAction(ingredientNumber))
	}

	return (
		<li
			className={BurgerConstructorStyles["ingridient"]}
			data-handler-id={handlerId}
			ref={ingredientRef}
			style={{
				display: isDragging ? 'none': 'block',
				paddingTop: isOver ? 60 : 0,
			}}
			draggable
		>
			<DragIcon 
				type={"secondary"} 
			/>
			<ConstructorElement
				thumbnail={item.image}
				price={item.price}
				text={item.name}
				handleClose={function() {
					removeIngredient(index)
				}}
			/>
		</li>
	)
}

BurgerIngredient.propTypes = {
	item: cardProps,
	index: PropTypes.number,
}

const BurgerConstructor = function() {

	const [{}, dropAreaRef] = useDrop({
        accept: ['bun', 'sauce', 'main'],
		drop: (item) => {
			const addedIngredient = ingredients.find((ingredient) => ingredient._id === item.id );
			dispatch(addIngredient(addedIngredient))
		},
    });
	const dispatch = useDispatch()
  	const { burgerIngredients, totalPrice } = useSelector(state => state.burgerConstructor)
	const { ingredients } = useSelector(state => state.ingredients)
	const { orderModalOpen } = useSelector(state => state.order)

	const {bun, innerIngredients} = useMemo(() => {
		return burgerIngredients.reduce((separatedIngredients,ingredient) => {
			if (ingredient.type === 'bun') {
				separatedIngredients.bun = ingredient
			} else {
				separatedIngredients.innerIngredients = [...separatedIngredients.innerIngredients, ingredient]
			}
			return separatedIngredients
		}, {bun: null, innerIngredients: []})
	}, [burgerIngredients])


	const toggleModalDisplay = () => {
		dispatch(toggleOrderModal())
	}

	const sendOrder = () => {
		dispatch(sendOrderAction(burgerIngredients))
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
					/>
				}
			</div>

			<ul 
				className={BurgerConstructorStyles["ingridients__list"]}
				ref={dropAreaRef}
			>
				{innerIngredients.map((item,i) => (
						<BurgerIngredient 
							item={item} 
							key={i + 1} 
							index={i + 1} 
						/>
					)
				)}
			</ul>

			<div className={`${BurgerConstructorStyles["ingridient"]} ml-8 mb-10`}>
				{
					bun && <ConstructorElement
						text={`${bun.name} (низ)`}
						isLocked={true}
						price={bun.price}
						thumbnail={bun.image}
						type="bottom"
					/>
				}
			</div>

			<div className={BurgerConstructorStyles["ingridients__info"]}>
				<div className={BurgerConstructorStyles.price__group}>
					<p className="text text_type_digits-medium">
						{totalPrice}
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
				orderModalOpen && (
						<Modal title={''} closeModal={toggleModalDisplay}>
							<OrderDetails />
						</Modal>
					)
			}

		</section>
	)
}

BurgerConstructor.defaultProps = cardDefaultProps
//BurgerConstructor.propTypes = cardPropsTypes

export default BurgerConstructor