import IngridientStyles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { cardPropsTypes } from "../../utils/prop-types";

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

const IngredientsDetails = (props) => {
	const { ingredient } = props;
	const { ingredientDetails } = useSelector(store => store.singleIngredient);

	const renderIngredient = ingredient ?? ingredientDetails;

	return renderIngredient && (
			<div className={IngridientStyles["ingredient-details"]}>
				<img
					src={renderIngredient.image_large}
					alt={`Here depicted delicious burger ingredient: ${renderIngredient.name}.`}
					className={IngridientStyles["ingredient-details__image"]}
				/>
				<h2 className="text text_type_main-medium mt-4 mb-8">{renderIngredient.name}</h2>
				<section className={IngridientStyles["ingredient-details__section-info"]}>
					<IngredientElement value={renderIngredient.calories ?? 0} title={'calories'} />
					<IngredientElement value={renderIngredient.proteins ?? 0} title={'proteins'} />
					<IngredientElement value={renderIngredient.fat ?? 0} title={'fat'} />
					<IngredientElement value={renderIngredient.carbohydrates ?? 0} title={'carbohydrates'} />
				</section>
			</div>
		)
}

IngredientsDetails.propTypes = {
	igredient: cardPropsTypes
} 

export default IngredientsDetails