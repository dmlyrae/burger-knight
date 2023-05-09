import IngridientStyles from "./IngredientDetails.module.css";
import { cardDefaultProps, cardProps } from "../../utils/prop-types"
import PropTypes from "prop-types";

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
	value: PropTypes.oneOf([PropTypes.string, PropTypes.number])
}

const IngredientsDetails = ({data}) => {
	const {calories,proteins,fat,carbohydrates} = data
	return (
		  <div className={IngridientStyles["ingredient-details"]}>
			   <img
					src={data.image_large}
					alt=""
					className={IngridientStyles["ingredient-details__image"]}
			   />
			   <h2 className="text text_type_main-medium mt-4 mb-8">{data.name}</h2>
			   <section className={IngridientStyles["ingredient-details__section-info"]}>
					<IngredientElement value={calories} title={'calories'} />
					<IngredientElement value={proteins} title={'proteins'} />
					<IngredientElement value={fat} title={'fat'} />
					<IngredientElement value={carbohydrates} title={'carbohydrates'} />
			   </section>
		  </div>
	 )
}

IngredientsDetails.defaultProps = {
	data: cardDefaultProps[0]
}

IngredientsDetails.propTypes = {
	data: cardProps
}

export default IngredientsDetails