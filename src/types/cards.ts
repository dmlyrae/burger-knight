export type TCard = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v: number;
    readonly key: string;
}

export interface IBurgerIngredients {
  readonly cards: Array<TCard>;
}

export interface IBurgerConstructor {
  readonly cards: TCard[];
}