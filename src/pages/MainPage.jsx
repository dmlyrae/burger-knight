import React from "react";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngridients";

const MainPage = function({ data }) {
  return (
    <>
      <BurgerIngredients cards={data} />
      <BurgerConstructor cards={data} />
    </>
  )
}

export default MainPage;
