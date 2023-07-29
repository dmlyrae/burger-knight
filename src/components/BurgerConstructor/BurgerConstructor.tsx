import React, { FC, useMemo, useRef } from "react"
import BurgerConstructorStyles from "./BurgerConstructor.module.css"
import Subtract from "../../images/Subtract.svg"
import {
	ConstructorElement,
	DragIcon,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { Modal } from "../Modal/Modal"
import OrderDetails from "../OrderDetails/OrderDetails"
import { sendOrderAction, toggleOrderModal } from "../../store/actions/orderActions"
import { addIngredient, changeOrderIngredients, removeIngredientAction } from "../../store/actions/burgerActions"
import { useDrag, useDrop } from "react-dnd"
import { v4 as uuidv4 } from 'uuid'
import Loader from "../Loader/Loader"
import { useNavigate } from "react-router-dom"
import { routerConfig } from "../../utils/routerConfig"
import { TCard } from "../../types/cards"
import { useAppDispatch, useAppSelector } from "../../types/redux"


type TDragItem = {
	id: TCard['_id'],
	index: number,
}

const BurgerIngredient:FC<{item:TCard,index:number}> = ({item,index}) => {

 	const ingredientRef = useRef<HTMLLIElement>(null)
	const dispatch = useAppDispatch()

  	const [{ handlerId,draggingItem}, dropRef] = useDrop<TDragItem, TDragItem, {handlerId:any, draggingItem:TDragItem}>({
    	accept: 'burgerIngredient',
    	collect: monitor => ({
        	handlerId: monitor.getHandlerId(),
			isOver: !!monitor.isOver(),
			draggingItem: monitor.getItem(),
		}),
		hover: (item:TDragItem,monitor) => {
      		if (!ingredientRef.current) return;
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ingredientRef.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;

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

	const removeIngredient = (ingredientNumber:number) => {
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

const BurgerConstructor:FC = function() {

	const dispatch = useAppDispatch()
	const [_, dropAreaRef] = useDrop({
        accept: ['bun', 'sauce', 'main'],
		drop: (item:TDragItem) => {
			const addedIngredient = structuredClone(ingredients.find((ingredient: { _id: string }) => ingredient._id === item.id ));
			addedIngredient.key = uuidv4()
			dispatch(addIngredient(addedIngredient))
		},
    });
	const navigate = useNavigate()
	const { ingredients } = useAppSelector(state => state.ingredients)
  	const { burgerIngredients, totalPrice } = useAppSelector(state => state.burgerConstructor)
	const { orderModalOpen, orderSend } = useAppSelector(state => state.order)
	const { accessToken } = useAppSelector( state => state.user )

	const {bun, innerIngredients} = useMemo(() => {
		return burgerIngredients.reduce((separatedIngredients:{bun: TCard | null,innerIngredients: TCard[]},ingredient:TCard) => {
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
		if (!bun) return;
		if (!accessToken) {
			navigate(routerConfig.login.path ?? `/`, {replace: false})
			return;
		}
		sendOrderAction(burgerIngredients, accessToken)(dispatch)
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
				data-test={"drop-area"}
				ref={dropAreaRef}
			>
				{innerIngredients.map((item:TCard,i:number) => (
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
						data-test={"send-order"}
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

export default BurgerConstructor