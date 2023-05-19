import PropTypes from "prop-types";
import { defaultData } from "./data";

export const cardDefaultProps = {
  cards: defaultData,
}

export const cardProps = PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
      id: PropTypes.number,
})

export const cardPropsTypes = {
  cards: PropTypes.arrayOf(cardProps),
}