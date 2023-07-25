export type TCard = {
    readonly _id: string;
    readonly name: string;
    readonly type: 'bun' | 'sauce' | 'main';
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
    id?: number;
}

export interface IBurgerIngredients {
  readonly cards: Array<TCard>;
}

export interface IBurgerConstructor {
  readonly cards: TCard[];
}