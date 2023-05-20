import OrderDetailsStyles from "./OrderDetails.module.css"
import done from "../../images/Done.svg"
import { useSelector } from "react-redux"

const validateOrderNumber = (orderNumber) => {
    const result = orderNumber.toString() 
    return Array(6 - result.length).fill('0').join('') + result
}

const OrderDetails = () => {

  	const { orderDetails, orderSendError } = useSelector(state => state.order)

    return (
        <section className={OrderDetailsStyles["order-details"]}>
            {
                orderSendError ? (
                    <h2 className={`${OrderDetailsStyles["order__number"]} text text_type_digits-large mt-4`}>
                        {orderSendError}
                    </h2>
                ) : (
                    <>
                        <h2 className={`${OrderDetailsStyles["order__number"]} text text_type_digits-large mt-4`}>
                            {validateOrderNumber(orderDetails.order.number)}
                        </h2>
                        <p className="text text_type_main-medium mt-8">
                            идентификатор заказа
                        </p>
                        <img 
                            className={OrderDetailsStyles["order__image"]} 
                            src={done} 
                            alt={'Order done'}
                        />
                        <p className={`${OrderDetails["order__desktop"]} text text_type_main-default`}>
                            Ваш заказ начали готовить
                        </p>
                        <p className={`${OrderDetails["order__desktop"]} text text_type_main-default text_color_inactive mt-2`}>
                            Дождитесь готовности на орбитальной станции
                        </p>
                    </>
                )
            }
        </section>
    )
}

export default OrderDetails