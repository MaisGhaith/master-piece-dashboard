import axios from 'axios'
import React, { useEffect, useState } from 'react'

const OrdersFunctions = () => {

    // ! get orders function

    const [orders, setOrders] = useState([]);
    const getOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8181/orders/getOrders");
            const allOrders = response.data;
            setOrders(allOrders);
        } catch (error) {
            console.log("Error getting orders data:", error);
        }
    };
    useEffect(() => {
        getOrders();
    }, [])


    // ! get Done orders

    const [doneOrders, setDoneOrders] = useState([]);
    const getDoneOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8181/orders/getDoneOrders");
            const allOrders = response.data;
            setDoneOrders(allOrders);
        } catch (error) {
            console.log("Error getting orders data:", error);
        }
    };
    useEffect(() => {
        getDoneOrders();
    }, [])


    return {
        orders,
        doneOrders,
        getOrders,
        getDoneOrders
    }
}

export default OrdersFunctions