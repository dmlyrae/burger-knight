import React, { FunctionComponent } from "react"
import PropTypes from "prop-types"
import BurgerConstructorStyles from "./BurgerConstructor.module.css"
import Subtract from "../../images/Subtract.svg"
import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { TCard } from "../../types/cards"
import { data } from "../../utils/data"

interface IBurgerConstructor {
  cards: TCard[];
  [s:string]: any;
};

const BurgerConstructor:FunctionComponent<IBurgerConstructor> = function ({cards}) {
  const [firstCard, ...unlockCards] = cards
  const lastCard = unlockCards.pop() ?? firstCard
  return (
    <section className={BurgerConstructorStyles['ingridients']}>

      <div className={`${BurgerConstructorStyles['ingridient']} ml-8 mb-4`}>
        <ConstructorElement
          text={`${firstCard.name} (верх)`}
          isLocked={true}
          price={firstCard.price}
          thumbnail={firstCard.image}
          type="top"
        />
      </div>

      <ul className={BurgerConstructorStyles['ingridients__list']}>
        {unlockCards.map((item:TCard) => {
            return (
                <li 
                  key={item._id} 
                  className={BurgerConstructorStyles['ingridient']} 
                >
                    <DragIcon type={"secondary"} />
                    <ConstructorElement 
                      thumbnail={item.image} 
                      price={item.price} 
                      text={item.name} 
                    />
                </li>
        )})}
      </ul>

      <div className={`${BurgerConstructorStyles['ingridient']} ml-8 mb-10`}>
        <ConstructorElement
          price={lastCard.price}
          thumbnail={lastCard.image}
          isLocked={true}
          type="bottom"
          text={`${lastCard.name} (низ)`}
        />
      </div>

      <div className={BurgerConstructorStyles['ingridients__info']}>
        <div className={BurgerConstructorStyles.priceGroup}>
          <p className="text text_type_digits-medium">610</p>
          <img src={Subtract} alt="" />
        </div>
        <Button type="primary" htmlType="button" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};


BurgerConstructor.defaultProps = {
  cards: data,
}

BurgerConstructor.propTypes = {
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

export default BurgerConstructor;