import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import useBilling from './BillingOrdersFunctions';
const BillingOrders = () => {
    const { billingOrder } = useBilling();


    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
        console.log("Hlelo")
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
                                {["user id", "name & email", "Phone number", "Date of register", "Status", "Orders"].map((el) => (
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
                            {billingOrder.map(({ user_id, user_name, price, phone_number, car_rent, deleted }, key) => {
                                const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                                return (
                                    <tr key={user_id}>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {user_id}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <div>
                                                <Typography variant="small" color="blue-gray" className="font-semibold">
                                                    {user_name}
                                                </Typography>
                                                <Typography className="text-xs font-normal text-blue-gray-500">
                                                    {price}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    <button onClick={handleOpenModal}>
                                                        ارسال الفاتورة
                                                    </button>
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {car_rent}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Chip
                                                as="button"
                                                title={"Click to change user status"}
                                                onClick={() => removeUser(user_id)}
                                                variant="gradient"
                                                color={"orange"}
                                                value={"Active"}
                                                className="py-0.5 px-2 text-[11px] font-medium"
                                            />
                                        </td>
                                        <td className={className}>
                                            <button
                                                onClick={() => removeUser(user_id)}
                                                className="text-xs font-semibold text-blue-gray-600">
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>

            <>
                {openModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <div className="modal-action flex justify-center">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="flex flex-col gap-6">
                                        <input
                                            // value={user_name}
                                            // onChange={(e) => setNameUser(e.target.value)}
                                            // className={`block mb-2 text-sm font-medium ${nameError
                                            //     ? 'border-red-500'
                                            //     : 'border-slate-900 text-gray-900 dark:text-white'
                                            //     }`}
                                            placeholder="تعديل الإسم"
                                        />
                                        <input
                                            // value={phone_number}
                                            // onChange={(e) => setPhone(e.target.value)}
                                            // className={`block mb-2 text-sm font-medium ${phoneNumberError
                                            //     ? 'border-red-500'
                                            //     : 'border-slate-900 text-gray-900 dark:text-white'
                                            //     }`}
                                            placeholder="تعديل رقم الهاتف"
                                        />
                                    </div>
                                    <div className="flex justify-start">
                                        <button
                                            // onClick={handleEditSubmit}
                                            type="submit"
                                            className="btn mx-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                        >
                                            تأكيد
                                        </button>
                                        <button
                                            // onClick={handleCloseModal} 
                                            type="button" className="btn mx-5">
                                            إلغاء
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                )}
            </>

        </div>
    )
}

export default BillingOrders