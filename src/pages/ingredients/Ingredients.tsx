import React, { useEffect } from "react";
import IngredientsStyles from './Ingredients.module.css';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IngredientsDetails from "../../components/IngredientDetails/IngredientDetails";
import Error from "../error/Error";
import { useAppSelector } from "../../types/redux";
import { TCard } from "../../types/cards";

function Ingredients() {
	const { id } = useParams();

	const { ingredients } = useAppSelector( state => state.ingredients )

	const ingredient = ingredients.find( (ingredient:TCard) => ingredient._id === id)  

	return ingredient ? (
		<div 
			className={IngredientsStyles.root}
		>
			<div className={['pl-10 pr-10', IngredientsStyles.header].join(' ')}>
				<h2 className={['text text_type_main-large', IngredientsStyles.title].join(' ')}>
					{'Детали ингредиента'}
				</h2>
			</div>
			<IngredientsDetails ingredient={ingredient} />
		</div>
	) : (
		<Error errorMessage={"Ingredient not found."} />
	)
}

export default Ingredients