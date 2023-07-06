import React, { FC } from "react";
import OrderItemHistoryDetailsStyles from './OrderItemHistoryDetails.module.css';

interface OrderItemHistoryDetails {
    id: String;
}

const OrderItemHistoryDetails:FC<OrderItemHistoryDetails> = function(props) {
    const { id } = props;
    return (
        <div 
            className={OrderItemHistoryDetailsStyles.root}
        >
            
            
        </div>
)}

export default OrderItemHistoryDetails