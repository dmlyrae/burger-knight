import React from "react";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngridients";

const MainPage = function({ data }) {
  return (
    <>
      <BurgerIngredients />
      <BurgerConstructor />
    </>
  )
}

export default MainPage;
