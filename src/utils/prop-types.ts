import PropTypes from "prop-types"
import { data } from "./data"

export const cardDefaultProps = {
  cards: data,
}

export const cardPropsTypes = {
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