import IngridientStyles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const IngredientVocabulary = {
	calories: 'Калорий, ккал',
	proteins: 'Белки, г',
	fat: 'Жиры, г',
	carbohydrates: 'Углеводы, г',
}

const IngredientElement = ({title, value}) => (
	<div className={IngridientStyles["ingredient-element"]}>
		<p className="text text_type_main-default text_color_inactive mb-2">
			{IngredientVocabulary[title] ?? title}
		</p>
		<p className="text text_type_digits-default text_color_inactive">
			{value}
		</p>
	</div>
) 

IngredientElement.propTypes = {
	title: PropTypes.string,
	value: PropTypes.number,
}

const IngredientsDetails = () => {
	const { ingredientDetails } = useSelector(store => store.singleIngredient);
	return ingredientDetails && (
			<div className={IngridientStyles["ingredient-details"]}>
				<img
					src={ingredientDetails.image_large}
					alt={`Here depicted delicious burger ingredient: ${ingredientDetails.name}.`}
					className={IngridientStyles["ingredient-details__image"]}
				/>
				<h2 className="text text_type_main-medium mt-4 mb-8">{ingredientDetails.name}</h2>
				<section className={IngridientStyles["ingredient-details__section-info"]}>
					<IngredientElement value={ingredientDetails.calories ?? 0} title={'calories'} />
					<IngredientElement value={ingredientDetails.proteins ?? 0} title={'proteins'} />
					<IngredientElement value={ingredientDetails.fat ?? 0} title={'fat'} />
					<IngredientElement value={ingredientDetails.carbohydrates ?? 0} title={'carbohydrates'} />
				</section>
			</div>
		)
}

export default IngredientsDetails