// BillingOrdersFunctions.js
import axios from 'axios';
import { useEffect, useState } from 'react';

const useBilling = () => {

    const [billingOrder, setBillingOrder] = useState([]);
    const getBillingOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8181/orders/getBillingOrders");
            const allBillingOrders = response.data;
            setBillingOrder(allBillingOrders);
        } catch (error) {
            console.log("Error getting billing orders from db: ", error);
        }
    };

    useEffect(() => {
        getBillingOrders();
    }, []);





    return {
        billingOrder,
        getBillingOrders,
    };
};

export default useBilling;
