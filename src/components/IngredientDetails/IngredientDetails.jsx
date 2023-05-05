import IngridientStyles from "./IngredientDetails.module.css";
import { cardDefaultProps, cardProps } from "../../utils/prop-types"
import PropTypes from "prop-types";

const IngridientVocabulary = {
	calories: 'Калорий, ккал',
	proteins: 'Белки, г',
	fat: 'Жиры, г',
	carbohydrates: 'Углеводы, г',
}

const IngridientElement = ({title, value}) => (
	<div className={IngridientStyles["ingredient-element"]}>
		<p className="text text_type_main-default text_color_inactive mb-2">
			{IngridientVocabulary[title] ?? title}
		</p>
		<p className="text text_type_digits-default text_color_inactive">
			{value}
		</p>
	</div>
) 

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
					<IngridientElement value={calories} title={'calories'} />
					<IngridientElement value={proteins} title={'proteins'} />
					<IngridientElement value={fat} title={'fat'} />
					<IngridientElement value={carbohydrates} title={'carbohydrates'} />
			   </section>
		  </div>
	 )
}

IngredientsDetails.defaultProps = {
	data: cardDefaultProps[0]
}
IngredientsDetails.propTypes = PropTypes.shape({
	data: cardProps
})

export default IngredientsDetails