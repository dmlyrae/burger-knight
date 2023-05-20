import React, {forwardRef, createRef, useRef, useMemo} from "react";
import BurgerIngredientsStyles from "./BurgerIngredients.module.css"
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { cardDefaultProps, cardProps } from "../../utils/prop-types"
import IngredientsDetails from "../IngredientDetails/IngredientDetails"
import { Modal } from "../Modal/Modal"
import { useDispatch, useSelector } from "react-redux";
import { ingredientToggleWindow, setIngredient } from "../../store/actions/singleIngredientActions";
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";


const Ingredient = (props) => {
	const { openIngredient,card } = props;
  	const { burgerIngredients } = useSelector(state => state.burgerConstructor)
	const ingredientAmount = useMemo(() => {
		return burgerIngredients.reduce((amount,ingredient) => {
			return ingredient._id === card._id ? amount + 1 : amount;
		}, 0)
	}, [burgerIngredients])
	
	const [{isDrag},dragRef] = useDrag({
		type: card.type,
		item: {
			id: card._id,
		}, 
		collect: (monitor) => ({
			isDrag: monitor.isDragging,
		})
	})
	return (
		<li 
			className={BurgerIngredientsStyles['additional-ingrigient']} 
			onClick={(e) => {
				e.stopPropagation()
				openIngredient(card)
			}}
			ref={dragRef}
			draggable
		>
			{Boolean(ingredientAmount) && (
				<Counter count={ingredientAmount} size="default" />
			)}
			<img
				className={BurgerIngredientsStyles['additional-ingridient__image']}
				alt={`Here we depict the most delicious ingredient for your burger: ${card.name}.`}
				src={card.image}
			/>
			<div className={BurgerIngredientsStyles['additional-ingridient__price']}>
				<p className="text text_type_digits-default">{card.price}</p>
				<CurrencyIcon type="primary" />
			</div>
			<p className={`${BurgerIngredientsStyles['additional-ingridient__name']} text text_type_main-default`}>
				{card.name}
			</p>
		</li>
	)
}

Ingredient.propTypes = {
	card: cardProps,
	openIngredient: PropTypes.func,
}

const IngridientsList = forwardRef((props,ref) => {
	const {list,title,openIngredient} = props
	return (
		<div 
			className={BurgerIngredientsStyles['additional-ingridients__list_item']}
			ref={ref}
		>
			<h3 className={"text text_type_main-medium mb-6"}>
				{title}
			</h3>
			<ul className={BurgerIngredientsStyles['ingridients-list']}>
				{list.map((card) => (
					<Ingredient card={card} openIngredient={openIngredient} key={card._id} />
				))}
			</ul>
		</div>
	)}
)

IngridientsList.propTypes = {
	list: PropTypes.arrayOf(cardProps),
	title: PropTypes.string,
	openIngredient: PropTypes.func,
}

const BurgerIngredients = function() {

	const dispatch = useDispatch()

	const { ingredients } = useSelector(state => state.ingredients)
	const { ingredientDetailsModalWindow } = useSelector(state => state.singleIngredient)
	const [ activeTab,setActiveTab ] = React.useState("bun")

	const buns = ingredients.filter((card) => card.type === "bun")
	const mains = ingredients.filter((card) => card.type === "main")
	const sauces = ingredients.filter((card) => card.type === "sauce")
	const rootListRef = createRef(null)

	const ingridientsLists = { 
		bun: {list: buns, ref: createRef(null), title: 'Булки', },
		main: {list: mains, ref: createRef(null), title: 'Соусы', },
		sauce: {list: sauces,  ref: createRef(null), title: 'Начинки', },
	}
	const selectTab = (tab) => {
		setActiveTab(tab)
		const list = ingridientsLists[tab]['ref']['current'];
		if (list) {
			const rootList = rootListRef.current
			rootList.scrollTop = list.offsetTop
		}
	}
	const toggleModalDisplay = (data) => {
		if (data) {
	  		dispatch(setIngredient(data)) 
		} 
		dispatch(ingredientToggleWindow())
	}

	const scrollHandler = (evt) => {
		if (evt.currentTarget && rootListRef.current ) { 
			const parentOffset = rootListRef.current.getBoundingClientRect().top
			const listsOffset = Object.keys(ingridientsLists)
				.map(listName => {
					const listElement = ingridientsLists[listName]['ref']['current'];
					return {
						listName, 
						offset: Math.abs(listElement.getBoundingClientRect().top - parentOffset)
					} 
				})
				.sort((a,b) => a.offset - b.offset)
			setActiveTab(listsOffset[0]['listName'])
		}
	}

	return (
		<section className={BurgerIngredientsStyles['additional-ingridients']}>
			<h2 className={`${BurgerIngredientsStyles.title} text text_type_main-large`}>
				Соберите бургер
			</h2>

			<nav className={BurgerIngredientsStyles['additional-ingridients__nav']}>
				<Tab 
					value={"bun"}
					active={activeTab === "bun"} 
					onClick={selectTab}
				>
					Булки
				</Tab>
				<Tab 
					value={"main"}
					active={activeTab === "main"} 
					onClick={selectTab}
				>
					Соусы
				</Tab>
				<Tab 
					value={"sauce"}
					active={activeTab === "sauce"} 
					onClick={selectTab}
				>
					Начинки
				</Tab>
			</nav>


			<ul 
				className={BurgerIngredientsStyles['additional-ingridients__list']}
				ref={rootListRef}
				onScroll={scrollHandler}
			>
				{
					Object.keys(ingridientsLists).map((key,i) => (
						<IngridientsList 
							title={ingridientsLists[key]['title']}
							list={ingridientsLists[key]['list']}
							key={i} 
							openIngredient={toggleModalDisplay} 
							ref={ingridientsLists[key]['ref']}
						/>
					))
				}
			</ul>

			{
				ingredientDetailsModalWindow && (
						<Modal title={'Детали ингридиента'} closeModal={toggleModalDisplay}>
							<IngredientsDetails />
						</Modal>
					)
			}

		</section>
	)
}

BurgerIngredients.defaultProps = cardDefaultProps

export default BurgerIngredients;