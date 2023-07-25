import { TCard } from "../types/cards"

type TReducerResult = {
	count: { [name: string]: number };
	items: { [name: string]: TCard }, 
}

export const getIngredients = (ingredients?: Array<string>, allIngredients?: Array<TCard>) => (
	(ingredients ?? [])
		.map((id: string) => ((allIngredients ?? []).filter((item: TCard) => item._id === id)))
	).flat();

export const countIngredients = (ingredients: Array<TCard>) => {
	return ingredients.reduce((result: TReducerResult, ingredient: TCard) => {
		const id = ingredient._id
		result.items[id] = ingredient;
		result.count[id] = (result.count[id] ?? 0) + 1
		return result
	}, { items: {}, count: {} })
}

export const getPrice = (ingredients: Array<TCard>) => {
	return ingredients.reduce((sum: number, ingredient: TCard) => sum += ingredient.price, 0);
}