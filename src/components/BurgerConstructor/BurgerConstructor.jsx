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
import { v4 as uuidv4 } from 'uuid'
import Loader from "../Loader/Loader"
import { Navigate, useNavigate } from "react-router-dom"
import { routerConfig } from "../../utils/routerConfig"

const BurgerIngredient = ({item,index}) => {

 	const ingredientRef = useRef(null)
	const dispatch = useDispatch()

  	const [{ handlerId,draggingItem}, dropRef] = useDrop({
    	accept: 'burgerIngredient',
    	collect: monitor => ({
        	handlerId: monitor.getHandlerId(),
			isOver: !!monitor.isOver(),
			draggingItem: monitor.getItem(),
		}),
		hover: (item,monitor) => {
      		if (!ingredientRef.current) return;
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ingredientRef.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

			dispatch(changeOrderIngredients(dragIndex, hoverIndex))
			item.index = hoverIndex;
		}
	})

	const [ , dragRef] = useDrag({
		type: 'burgerIngredient',
		item: () => ({ id: item.key, index }),
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
				opacity: (draggingItem && draggingItem.id === item.key )  ? 0.1 : 1,
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
			const addedIngredient = structuredClone(ingredients.find((ingredient) => ingredient._id === item.id ));
			addedIngredient.key = uuidv4()
			dispatch(addIngredient(addedIngredient))
		},
    });
	const dispatch = useDispatch()
	const navigate = useNavigate()
  	const { burgerIngredients, totalPrice } = useSelector(state => state.burgerConstructor)
	const { ingredients } = useSelector(state => state.ingredients)
	const { orderModalOpen, orderSend } = useSelector(state => state.order)
	const { accessToken } = useSelector( state => state.user )

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
		if (!accessToken) {
			navigate(routerConfig.login.path)
			return;
		}
		if (!bun) return;
		dispatch(sendOrderAction(burgerIngredients, accessToken))
	}

	return (
		<section className={BurgerConstructorStyles["ingridients"]}>
			{!burgerIngredients.length && (
				<h3 className={`text text_type_main-medium mt-2 text_color_inactive`}>
					{'Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа.'}
				</h3>
			)}
			<div className={`${BurgerConstructorStyles["ingridient"]} ml-8 mb-4`}>
				{
					bun && <ConstructorElement
						text={`${bun.name} (верх)`}
						isLocked={true}
						price={bun.price}
						thumbnail={bun.image}
						type="top"
						//key={bun.key}
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
							key={item.key}
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
					<img 
						src={Subtract} 
						alt={"Here are depicted standard galactic coins."} 
					/>
				</div>
				{orderSend ? (
					<Loader loaderType={'spinner'} message={'Order is processing...'} size={'normal'} />
				) : (
					<Button 
						type={"primary"}
						htmlType="button" 
						size="large"
						onClick={sendOrder}
						style={{
							opacity: bun ? 1 : 0.5,
						}}
					>
						{bun ? 'Оформить заказ' : 'Добавьте булку'}
					</Button>
				)}
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