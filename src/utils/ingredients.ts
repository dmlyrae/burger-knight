import { TCard } from "../types/cards"

type TGetBurgerIngredientsObjWithCountReduceAcc = {
  item: { [name: string]: TCard }, count: { [name: string]: number }
}

export const countPrice = (ingredients: Array<TCard>) => ingredients?.reduce((acc: number, curr: TCard) => acc += curr.price, 0);

export const getIngredients = (ingredients: Array<string>, allIngredients: Array<TCard>) => (
  ingredients?.map((id: string) => (allIngredients.filter((item: TCard) => item._id === id))))?.flat();

export const countBurgerIngredients = (arr: Array<TCard>) => arr?.reduce((acc: TGetBurgerIngredientsObjWithCountReduceAcc, curr: TCard) => {
  const id = curr._id
  acc.item[id] = curr;
  acc.count[id] = (acc.count[id] || 0) + 1
  return acc
}, { item: {}, count: {} })