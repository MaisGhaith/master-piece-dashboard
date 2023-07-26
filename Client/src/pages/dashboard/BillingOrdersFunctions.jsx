import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BillingOrdersFunctions = () => {

    const [billingOrder, setBillingOrder] = useState([]);
    const getBillingOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8181/orders/getBillingOrders");
            const allBillingOrders = response.data;
            setBillingOrder(allBillingOrders);
        } catch (error) {
            console.log("Error getting billing orders from db : ", error)
        }
    }

    useEffect(() => {
        getBillingOrders();
    }, [])

    return {
        billingOrder
    }
}

export default BillingOrdersFunctions