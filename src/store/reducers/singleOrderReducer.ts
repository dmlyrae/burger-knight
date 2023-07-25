import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../types/orders';


type TSingleOrderReducer = {
  order: IOrder | null;
}
const initialState: TSingleOrderReducer = {
  order: null
}

export const singleOrderSlice = createSlice({
	name: 'orderInModalWindow',
	initialState,
	reducers: {
		openOrder: (state, action: PayloadAction<IOrder>) => {
			return {
				order: action.payload,
			}
		},
		closeOrder: () => {
			return {
				order: null,
			}
		}
	}
});

export default singleOrderSlice.reducer