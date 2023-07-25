export interface IOrder {
	ingredients: Array<string>;
	_id: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
	name: string;
}

export interface IOrderSubmitted {
	success: boolean;
	name: string;
	order: IOrder;
}