import OrderDetailsStyles from "./OrderDetails.module.css"
import done from "../../images/Done.svg"
import PropTypes from "prop-types"

const validateOrderNumber = (orderNumber) => {
    const result = orderNumber.toString() 
    return Array(6 - result.length).fill('0') + result
}

const OrderDetails = ({data}) => {
    return (
        <section className={OrderDetailsStyles["order-details"]}>
            <h2 className={`${OrderDetailsStyles["order__number"]} text text_type_digits-large mt-4`}>
              	{validateOrderNumber(data.number)}
            </h2>
            <p className="text text_type_main-medium mt-8">
              	идентификатор заказа
            </p>
            <img 
				className={OrderDetailsStyles["order__image"]} 
				src={done} 
				alt={'done'}
			/>
            <p className={`${OrderDetails["order__desktop"]} text text_type_main-default`}>
              	Ваш заказ начали готовить
            </p>
            <p className={`${OrderDetails["order__desktop"]} text text_type_main-default text_color_inactive mt-2`}>
              	Дождитесь готовности на орбитальной станции
            </p>
        </section>
    )
}

OrderDetails.propTypes = {
    data: PropTypes.shape({
        number: PropTypes.number.isRequired 
    })
}

export default OrderDetails;
