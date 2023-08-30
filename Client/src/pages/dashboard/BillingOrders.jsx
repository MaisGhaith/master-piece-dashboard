import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import useBilling from './BillingOrdersFunctions';
import axios from 'axios';
import '../../../src/style.css'
import SearchBar from './SearchBar';

const BillingOrders = () => {

    const {
        billingOrder,
        getBillingOrders
    } = useBilling();

    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState(null);

    const handleOpenModal = (id, price) => {
        setOpenModal(true);
        setId(id);
        setPrice(price);
        setEditedPrice(price);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const [editedPrice, setEditedPrice] = useState('');
    const [price, setPrice] = useState(null);
    const editPrice = async (id, price) => {
        { id, price }
        try {
            await axios.put(`http://localhost:8181/editPrice/editPrice/${id}`, {
                price: price,
            });
            console.log('Price has been edited successfully');
            await getBillingOrders();
            setOpenModal(false);
        } catch (error) {
            console.log("Failed to edit price", error);
        }
    };

    const handlePriceChange = (e) => {
        setEditedPrice(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent form submission to avoid page refresh

        editPrice(id, editedPrice);
        console.log(editedPrice)
    };


    const [billingOrderSearchQuery, setBillingOrderSearchQuery] = useState("");

    const handleBillingOrderSearch = (query) => {
        setBillingOrderSearchQuery(query);
    };

    const filteredBillingOrder = billingOrder.filter((order) => {
        const lowercaseName = order.name?.toLowerCase() || "";
        const lowercaseOrderNo = order.order_no?.toLowerCase() || "";
        const phoneNumber = order.phone || "";

        return (
            lowercaseName.includes(billingOrderSearchQuery.toLowerCase()) ||
            lowercaseOrderNo.includes(billingOrderSearchQuery.toLowerCase()) ||
            phoneNumber.includes(billingOrderSearchQuery)
        );
    });


    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" className="flex justify-between mb-8 p-6 overflow-y-auto bg-primary ">
                    <Typography variant="h6" color="black">
                        Billing orders
                    </Typography>
                    <div className="flex justify-center items-center flex-row">
                        <Typography variant="h6" color="black">
                            <SearchBar onSearch={handleBillingOrderSearch} />
                        </Typography>
                        <Typography className="mx-5" variant="h6" color="black">
                            Count :  {filteredBillingOrder.length}
                        </Typography>
                    </div>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2">
                    <div className='h-56 overflow-auto'>
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {["Order no", "name", "Phone number", "Price", "Status", "Edit"].map((el) => (
                                        <th
                                            key={el}
                                            className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                        >
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBillingOrder.map(({ id, user_id, name, price, phone, order_no, status }, key) => {
                                    const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                                    return (
                                        <tr key={user_id}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {order_no}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <div>
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                                        {name}
                                                    </Typography>

                                                </div>
                                            </td>
                                            <td className={className}>
                                                <div>
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                                        {phone}
                                                    </Typography>

                                                </div>
                                            </td>
                                            <td className={className}>
                                                <div>
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">
                                                        {price}
                                                    </Typography>

                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={status ? 'green' : 'blue-gray'}
                                                    value={status ? 'Done' : 'In progress'}
                                                    className="py-0.5 px-2 text-[11px] font-medium"
                                                    onClick={() => handleChangeStatus(order_no)}
                                                />
                                            </td>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        <button onClick={() => handleOpenModal(id, price)}>
                                                            ارسال الفاتورة
                                                        </button>
                                                    </Typography>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
            {openModal && (
                <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-40">
                    <div className="bg-white p-6 rounded-lg relative">

                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleCloseModal}
                        >
                            ✕</button>

                        <div className="flex justify-center flex-col px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium flex justify-center text-gray-900 dark:text-white">
                                تعديل سعر الخدمة
                            </h3>
                            <form onSubmit={handleFormSubmit} className="space-y-6" action="handleSubmit">
                                <div>
                                    <input
                                        dir='rtl'
                                        type="text"
                                        name="price"
                                        id="price"
                                        value={editedPrice}
                                        onChange={handlePriceChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="اكتب القيمة"
                                        required=""
                                    />
                                </div>
                                <button
                                    type="submit"
                                    // onClick={handleCloseModal}
                                    className="w-full text-white bg-amber-300 hover:bg-primary hover:text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    حفظ
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingOrders;