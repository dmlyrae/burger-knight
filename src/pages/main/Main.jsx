import React from "react";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainStyles from "./Main.module.css"

const Main = function() {
	return (
		<DndProvider backend={HTML5Backend} >
				<BurgerIngredients />
				<BurgerConstructor />
		</DndProvider>
	)
}

export default Main;