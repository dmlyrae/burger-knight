import React from "react";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngridients";
import { data } from "../utils/data";

const MainPage = function() {
  return (
    <>
      <BurgerIngredients cards={data} />
      <BurgerConstructor cards={data} />
    </>
  )
}

export default MainPage