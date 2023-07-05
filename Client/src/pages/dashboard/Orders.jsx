import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
} from '@material-tailwind/react';
import { authorsTableData } from '@/data';
import useOrders from './OrdersFunctions';

function Orders() {

    const { doneOrders, orders, getOrders, getDoneOrders } = useOrders();


    const [showModal, setShowModal] = useState(false);

    const handleChangeStatus = async (orderNo) => {
        const confirmed = window.confirm('Are you sure you want to change the status of this order ? ');
        if (confirmed) {

            try {
                await axios.put(`http://localhost:8181/status/changeStatus/${orderNo}`);
                console.log("status changed successfully");
                setShowModal(true);
                await getOrders();
                await getDoneOrders();
            } catch (error) {
                console.error('Error updating order status:', error);
            }
        }
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        In progress orders
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {[
                                    'name/user_id',
                                    'order_no',
                                    'Service/Choice',
                                    'Phone',
                                    'status',
                                    'location',
                                    'Image',
                                ].map((el) => (
                                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
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
                            {orders.map(
                                (
                                    { name, phone, order_no, user_id, service_name, choice_name, location, image, status },
                                    key
                                ) => {
                                    const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
                                        }`;

                                    return (
                                        <tr key={name}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {name}
                                                        </Typography>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {user_id}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {order_no}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {service_name}
                                                </Typography>
                                                <Typography className="text-xs font-normal text-blue-gray-500">
                                                    {choice_name}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {phone}
                                                </Typography>
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
                                                <a
                                                    href={location}
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    {location}
                                                </a>
                                            </td>
                                            <td className={className}>
                                                <img src={image} alt="Order" className="text-xs font-semibold text-blue-gray-600" />
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>

                </CardBody>
            </Card>
            <Card>
                <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Done orders
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {[
                                    'name/user_id',
                                    'order_no',
                                    'Service/Choice',
                                    'Phone',
                                    'status',
                                    'location',
                                    'Image',
                                ].map((el) => (
                                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
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
                            {doneOrders.map(
                                (
                                    { name, phone, order_no, user_id, service_name, choice_name, location, image, status },
                                    key
                                ) => {
                                    const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
                                        }`;

                                    return (
                                        <tr key={name}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {name}
                                                        </Typography>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {user_id}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {order_no}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {service_name}
                                                </Typography>
                                                <Typography className="text-xs font-normal text-blue-gray-500">
                                                    {choice_name}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {phone}
                                                </Typography>
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
                                                <a
                                                    href={location}
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    {location}
                                                </a>
                                            </td>
                                            <td className={className}>
                                                <img src={image} alt="Order" className="text-xs font-semibold text-blue-gray-600" />
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}

export default Orders;
