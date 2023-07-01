import { ReactNode } from "react";
import { AppDispatch } from "../store";

export type TChildren = {
	children: ReactNode,
}

export type Without<A, B> = A extends B ? never : B; 


type typedAction = {
	<T extends string>(arg0: T): {type: T, payload: undefined};
	<T extends string, P>(arg0: T, arg1: P): {type: T, payload: P};
}
export const typedAction:typedAction = function(type: string, payload?: any) {
	return { type, payload };
}


type errorMessage = {
	(arg0: unknown | Error):string;
}
export const errorMessage:errorMessage = (e) => e instanceof Error ? e.message : typeof e === "string" ? e : String(e);


export type TDispatchAction = (dispatch: AppDispatch) => void 

export type TAction = () => void;