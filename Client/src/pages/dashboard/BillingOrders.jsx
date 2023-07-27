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



    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Billing orders
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Order id", "name & email", "Phone number", "Price", "Status", "Price"].map((el) => (
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
                            {billingOrder.map(({ id, user_id, name, price, phone, car_rent, deleted, status }, key) => {
                                const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                                return (
                                    <tr key={user_id}>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {id}
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
                </CardBody>
            </Card>
            {openModal && (
                <div className="relative w-full max-w-md max-h-full">
                    {/* Modal content */}
                    {id}{` price = ${price}`}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="authentication-modal"
                            onClick={handleCloseModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                Sign in to our platform
                            </h3>
                            <form onSubmit={handleFormSubmit} className="space-y-6" action="#">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        قيمة الخدمة
                                    </label>
                                    <input
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
                                    // onClick={() => editPrice(id, editedPrice)}
                                    type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Save
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
