import IngridientStyles from "./IngredientDetails.module.css";
import { FC } from "react";
import { TCard } from "../../types/cards";
import { useAppSelector } from "../../types/redux";

const IngredientVocabulary = {
	calories: 'Калорий, ккал',
	proteins: 'Белки, г',
	fat: 'Жиры, г',
	carbohydrates: 'Углеводы, г',
} as const;

interface IngredientElement {
	title: string;
	value: number;
}
const IngredientElement:FC<IngredientElement> = function(props) {
	const {title, value} = props;
	const assertionTitle = title as keyof typeof IngredientVocabulary;
	if (!IngredientVocabulary[assertionTitle]) return (<></>);
	return (
		<div className={IngridientStyles["ingredient-element"]}>
			<p className="text text_type_main-default text_color_inactive mb-2">
				{IngredientVocabulary[assertionTitle]}
			</p>
			<p className="text text_type_digits-default text_color_inactive">
				{value}
			</p>
		</div>
	) 
}

interface IngredientsDetails {
	ingredient?:TCard;
}
const IngredientsDetails:FC<IngredientsDetails> = (props) => {
	const { ingredient } = props;
	const { ingredientDetails } = useAppSelector(store => store.singleIngredient);

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

export default IngredientsDetails