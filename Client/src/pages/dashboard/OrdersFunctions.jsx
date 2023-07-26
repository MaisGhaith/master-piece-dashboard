import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'

const OrdersFunctions = () => {

    const [showModal, setShowModal] = useState(false);

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



    // ! get pending orders
    const [pendingOrders, setPendingOrders] = useState([]);
    const getPendingOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8181/orders/getPending");
            const allOrders = response.data;
            setPendingOrders(allOrders);
        } catch (error) {
            console.log("Error getting pending orders data : ", error)

        }
    }
    useEffect(() => {
        getPendingOrders();
    }, [])


    // ! get deleted orders 
    const [deletedOrder, setDeletedOrder] = useState([]);
    const getDeletedOrder = async () => {
        try {
            const response = await axios.get("http://localhost:8181/orders/getDeletedOrder");
            const allOrders = response.data;
            setDeletedOrder(allOrders);
        } catch (error) {
            console.log("Error getting deleted orders data : ", error)
        }
    }

    useEffect(() => {
        getDeletedOrder();
    }, [])

    // ! edit the approved column status 
    const handleChangeApproved = async (orderNo) => {
        const confirmed = window.confirm('Are you sure you want to Approve this order ? ');
        if (confirmed) {
            try {
                await axios.put(`http://localhost:8181/status/ifApproved/${orderNo}`);
                console.log("order approved successfully");
                await getOrders();
                await getDoneOrders();
                await getPendingOrders();
                await getDeletedOrder();
            } catch (error) {
                console.error('Error approved order:', error);

            }
        }
    }

    // ! edit the status of order 
    const handleChangeStatus = async (orderNo) => {
        const confirmed = window.confirm('Are you sure you want to change the status of this order ? ');
        if (confirmed) {

            try {
                await axios.put(`http://localhost:8181/status/changeStatus/${orderNo}`);
                console.log("status changed successfully");
                setShowModal(true);
                await getOrders();
                await getDoneOrders();
                await getPendingOrders();
                await getDeletedOrder();
            } catch (error) {
                console.error('Error updating order status:', error);
            }
        }
    };

    return {
        orders,
        doneOrders,
        getOrders,
        getDoneOrders,
        pendingOrders,
        handleChangeApproved,
        handleChangeStatus,
        deletedOrder


    }
}

export default OrdersFunctions