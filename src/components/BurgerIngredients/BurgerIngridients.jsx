import React, {useState, forwardRef, createRef, useContext} from "react";
import BurgerIngredientsStyles from "./BurgerIngredients.module.css"
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { cardDefaultProps, cardPropsTypes } from "../../utils/prop-types"
import IngredientsDetails from "../IngredientDetails/IngredientDetails"
import { Modal } from "../Modal/Modal"
import { IngredientsContext } from "../../services/appContext";

const IngridientsList = forwardRef((props,ref) => {
	const {list,title,openIngridient} = props
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
					<li 
						className={BurgerIngredientsStyles['additional-ingrigient']} 
						key={card._id}
						onClick={(e) => {
							e.stopPropagation()
							openIngridient(card)
						}}
					>
						<Counter count={1} size="default" />
						<img
							className={BurgerIngredientsStyles['additional-ingridient__image']}
							alt="ingridient"
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
				))}
			</ul>
		</div>
	)}
)

const BurgerIngredients = function() {

  	const { data: cards } = useContext(IngredientsContext)
	const [activeTab, setActiveTab] = React.useState("bun")

	const buns = cards.filter((card) => card.type === "bun")
	const mains = cards.filter((card) => card.type === "main")
	const sauces = cards.filter((card) => card.type === "sauce")
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
			/*list.scrollIntoView({
				behavior: 'smooth',
			})*/
		}
	}
	const [modalDisplay, setModalDisplay] = useState(false)
	const [modalData, setModalData] = useState(undefined)
	const toggleModalDisplay = (data) => {
		if (data) setModalData(data)
		setModalDisplay((display) => !display)
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
			>
				{
					Object.keys(ingridientsLists).map((key,i) => (
						<IngridientsList 
							title={ingridientsLists[key]['title']}
							list={ingridientsLists[key]['list']}
							key={i} 
							openIngridient={toggleModalDisplay} 
							ref={ingridientsLists[key]['ref']}
						/>
					))
				}
			</ul>

			{
				modalDisplay && (
						<Modal title={'Детали ингридиента'} closeModal={toggleModalDisplay}>
							<IngredientsDetails data={modalData} />
						</Modal>
					)
			}

		</section>
	)
}

BurgerIngredients.defaultProps = cardDefaultProps
//BurgerIngredients.propTypes = cardPropsTypes

export default BurgerIngredients;