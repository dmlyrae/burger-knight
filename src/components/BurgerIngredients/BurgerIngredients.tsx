import React, {forwardRef, createRef, useRef, useMemo, useEffect, FC, ForwardRefRenderFunction, ForwardRefExoticComponent, RefAttributes, Ref, LegacyRef, ForwardedRef, UIEventHandler} from "react";
import BurgerIngredientsStyles from "./BurgerIngredients.module.css"
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import IngredientsDetails from "../IngredientDetails/IngredientDetails"
import { Modal } from "../Modal/Modal"
import { useDispatch, useSelector } from "react-redux";
import { ingredientToggleWindow, setIngredient } from "../../store/actions/singleIngredientActions";
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { routerConfig } from "../../utils/routerConfig";
import { TCard } from "../../types/cards";
import { useAppSelector } from "../../types/redux";
import { RefObject } from "react";



interface Ingredient {
	card: TCard,
	openIngredient: (arg0:TCard) => void,
}

const Ingredient:FC<Ingredient> = (props) => {
	const { openIngredient, card } = props;
  	const { burgerIngredients } = useAppSelector(state => state.burgerConstructor)
	const ingredientAmount = useMemo(() => {
		return burgerIngredients.reduce((amount:number,ingredient:TCard) => {
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



interface IngredientsList {
	list: TCard[];
	title: string;
	openIngredient: (arg0: TCard) => void
}
const IngredientsList = forwardRef<HTMLDivElement, IngredientsList>((props,ref) => {
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


type TIngredientsList = {
	list: TCard[];
	ref: RefObject<HTMLDivElement>;
	title: string;
}
interface IIngredientsList {
	bun: TIngredientsList,
	main: TIngredientsList,
	sauce: TIngredientsList,
}

type TIngredientsNames = keyof IIngredientsList;

const BurgerIngredients = function() {

	const dispatch = useDispatch()
	const location = useLocation()

	const { ingredients } = useAppSelector(state => state.ingredients)
	const { ingredientDetailsModalWindow, ingredientDetails } = useAppSelector(state => state.singleIngredient)
	const [ activeTab,setActiveTab ] = React.useState("bun")

	const buns = ingredients.filter((card:TCard) => card.type === "bun")
	const mains = ingredients.filter((card:TCard) => card.type === "main")
	const sauces = ingredients.filter((card:TCard) => card.type === "sauce")
	const rootListRef = useRef<HTMLUListElement>(null)

	const ingredientsLists:IIngredientsList = { 
		bun: {list: buns, ref: useRef<HTMLDivElement>(null), title: 'Булки', },
		main: {list: mains, ref: useRef<HTMLDivElement>(null), title: 'Соусы', },
		sauce: {list: sauces,  ref: useRef<HTMLDivElement>(null), title: 'Начинки', },
	}
	const selectTab = (tab: string) => {
		setActiveTab(tab)
		if (!(tab in ingredientsLists)) return;
		const assertionTab = tab as TIngredientsNames;

		if (ingredientsLists[assertionTab]['ref']['current'] === null) return;
		const list = ingredientsLists[assertionTab]['ref']['current'];
		if (list) {
			const rootList = rootListRef.current
			if (rootList === null) return;
			rootList.scrollTop = list.offsetTop
		}
	}
	type TToggleModalDisplay = {
		(data:TCard): void;
		(): void;
	}
	const toggleModalDisplay:TToggleModalDisplay = (...args: TCard[]) => {
		const data = args[0];
		if (data) {
	  		dispatch(setIngredient(data)) 
		} 
		dispatch(ingredientToggleWindow())
	}

	useEffect(() => {
		if (ingredientDetails) {
			document.title = ingredientDetails.name;
			const id = window.history.length;
			window.history.pushState({ id }, "", `/ingredients/${ingredientDetails._id}`);
		} else {
			document.title = 'Burger constructor';
			const id = window.history.length - 1;
			window.history.replaceState( { id }, "", `/`)
		}
	}, [ingredientDetails])

	type TScrollListItem = {listName: keyof IIngredientsList, offset: number};
	const scrollHandler = (evt:React.UIEvent<HTMLUListElement>) => {
		if (evt.currentTarget && rootListRef.current ) { 
			const parentOffset = rootListRef.current.getBoundingClientRect().top
			const listsOffset:Array<TScrollListItem> = 
				Object.keys(ingredientsLists)
				.map((listName:string) => {
					const assertionListName = listName as keyof IIngredientsList;
					const listElement = ingredientsLists[assertionListName]['ref']['current'];
					const result:TScrollListItem = {
						listName: assertionListName, 
						offset: listElement === null ? 
							Infinity 
							:
							Math.abs(listElement.getBoundingClientRect().top - parentOffset)
					} 
					return result;
				})
				.sort((a:TScrollListItem,b:TScrollListItem) => a.offset - b.offset)
			setActiveTab(listsOffset[0]['listName'])
		}
	}

	return (
		<section className={BurgerIngredientsStyles['additional-ingridients']}>
			<h2 className={`${BurgerIngredientsStyles.title} text text_type_main-large`}>
				{'Соберите бургер'}
			</h2>

			<nav className={BurgerIngredientsStyles['additional-ingridients__nav']}>
				<Tab 
					value={"bun"}
					active={activeTab === "bun"} 
					onClick={selectTab}
				>
					{'Булки'}
				</Tab>
				<Tab 
					value={"main"}
					active={activeTab === "main"} 
					onClick={selectTab}
				>
					{'Соусы'}
				</Tab>
				<Tab 
					value={"sauce"}
					active={activeTab === "sauce"} 
					onClick={selectTab}
				>
					{'Начинки'}
				</Tab>
			</nav>


			<ul 
				className={BurgerIngredientsStyles['additional-ingridients__list']}
				ref={rootListRef}
				onScroll={scrollHandler}
			>
				{
					Object.keys(ingredientsLists).map((key,i) => {
						const assertionKey = key as TIngredientsNames;
						return (
							<IngredientsList 
								title={ingredientsLists[assertionKey]['title']}
								list={ingredientsLists[assertionKey]['list']}
								key={i} 
								openIngredient={toggleModalDisplay} 
								ref={ingredientsLists[assertionKey]['ref']}
							/>
						)
					})
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

export default BurgerIngredients;