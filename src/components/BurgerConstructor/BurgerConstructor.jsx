import React from "react"
import BurgerConstructorStyles from "./BurgerConstructor.module.css"
import Subtract from "../../images/Subtract.svg"
import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { cardDefaultProps, cardPropsTypes } from "../../utils/prop-types"


const BurgerConstructor = function ({cards}) {
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
        {unlockCards.map((item) => {
            return (
                <li 
                  className={BurgerConstructorStyles['ingridient']} 
                  key={item._id} 
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


BurgerConstructor.defaultProps = cardDefaultProps
BurgerConstructor.propTypes = cardPropsTypes

export default BurgerConstructor;