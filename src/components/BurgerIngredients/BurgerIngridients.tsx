import React, { FunctionComponent } from "react"
import PropTypes from "prop-types"
import BurgerIngredientsStyles from "./BurgerIngredients.module.css"
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { data } from "../../utils/data"
import { TCard } from "../../types/cards"


interface IBurgerIngridients {
  cards: TCard[];
  [s:string]: any;
};

const IngridientsList = ({list,title}:{list:TCard[],title:string}) => (
    <div className={BurgerIngredientsStyles['additional-ingridients__list_item']}>
      <h3 className={"text text_type_main-medium mb-6"}>
        {title}
      </h3>
      <ul className={BurgerIngredientsStyles['ingridients-list']}>
        {list.map((card:TCard) => (
          <li className={BurgerIngredientsStyles['additional-ingrigient']} key={card._id}>
            <Counter count={1} size="default" />
            <img
              className={BurgerIngredientsStyles['additional-ingridient__image']}
              alt="ingridient"
              src={card.image}
            />
            <div className={BurgerIngredientsStyles['additional-ingridient__price']}>
              <p className="text text_type_digits-default">{card.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className={`${BurgerIngredientsStyles['additional-ingridient__name']} text text_type_main-default`}>
              {card.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
)

const BurgerIngredients:FunctionComponent<IBurgerIngridients> = function({cards}) {
  const [activeTab, setActiveTab] = React.useState("bun")

  const buns = cards.filter((card) => card.type === "bun")
  const mains = cards.filter((card) => card.type === "main")
  const sauces = cards.filter((card) => card.type === "sauce")

  /*const selectTab = (e:React.MouseEvent) => {
    const target = e.currentTarget
    target.scrollIntoView()
    setActiveTab(target.value)
  }*/

  return (
    <section className={BurgerIngredientsStyles['additional-ingridients']}>
      <h2 className={`${BurgerIngredientsStyles.title} text text_type_main-large`}>
        Соберите бургер
      </h2>

      <nav className={BurgerIngredientsStyles['additional-ingridients__nav']}>
        <Tab 
          value={"bun"}
          active={activeTab === "bun"} 
          onClick={setActiveTab}
        >
          Булки
        </Tab>
        <Tab 
          value={"main"}
          active={activeTab === "main"} 
          onClick={setActiveTab}
        >
          Соусы
        </Tab>
        <Tab 
          value={"sauce"}
          active={activeTab === "sauce"} 
          onClick={setActiveTab}
        >
          Начинки
        </Tab>
      </nav>


      <ul className={BurgerIngredientsStyles['additional-ingridients__list']}>
        {
          [
            {list:buns,title:'Булки'},
            {list:mains,title:'Соусы'},
            {list:sauces,title:'Начинки'}
          ].map((item:{list:TCard[],title:string}) => (
            <IngridientsList {...item} />
          ))
        }
      </ul>
    </section>
  );
};
BurgerIngredients.defaultProps = {
  cards: data,
}
BurgerIngredients.propTypes = {
  // @ts-ignore
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number, 
      price: PropTypes.number,
      image: PropTypes.string, 
      image_mobile: PropTypes.string, 
      image_large: PropTypes.string,
      __v: PropTypes.number,
  }))
}

export default BurgerIngredients;