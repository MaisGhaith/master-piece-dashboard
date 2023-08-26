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

    const {
        doneOrders,
        orders,
        pendingOrders,
        handleChangeApproved,
        handleChangeStatus,
        deletedOrder
    }
        = useOrders();

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" className="flex justify-between mb-8 p-6 bg-primary">
                    <Typography variant="h6" color="black">
                        Holding orders
                    </Typography>
                    <Typography variant="h6" color="black">
                        {pendingOrders.length}
                    </Typography>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2">
                    <div className="h-56 overflow-auto">

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
                                {pendingOrders.map(
                                    (
                                        { name, phone, order_no, user_id, service_name, choice_name, location, image, approved },
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
                                                        color={approved ? 'green' : 'blue-gray'}
                                                        value={approved ? 'Done' : 'not approved'}
                                                        className="py-0.5 px-2 text-[11px] font-medium"
                                                        onClick={() => handleChangeApproved(order_no)}
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
                                                    <img src={image} alt="Order" className=" w-10 text-xs font-semibold text-blue-gray-600" />
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardHeader variant="gradient" className="flex justify-between mb-8 p-6 overflow-y-auto bg-primary ">
                    <Typography variant="h6" color="black">
                        In progress orders
                    </Typography>
                    <Typography variant="h6" color="black">
                        {orders.length}
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-scroll px-0 pt-0 pb-2" style={{ maxHeight: '320px', maxWidth: '1500px' }}>
                    <div className="h-56 overflow-auto">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {[
                                        'name/user_id',
                                        'order_no',
                                        'Service/Choice',
                                        'Phone',
                                        'status',
                                        'Price',
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
                                        { name, phone, order_no, user_id, service_name, choice_name, location, image, status, price },
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

                                                        className={`py-0.5 px-2 text-[11px] font-medium ${price === '0' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                        title={price === '0' ? 'Button disabled because price is 0' : 'Click to change status'}
                                                        onClick={() => {
                                                            if (price !== '0') {
                                                                handleChangeStatus(order_no)
                                                            }
                                                        }
                                                        }
                                                    />
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {price}
                                                    </Typography>
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
                                                    <img src={image} alt="Order" className="w-10 text-xs font-semibold text-blue-gray-600" />
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardHeader variant="gradient" className=" flex justify-between mb-8 p-6 bg-primary">
                    <Typography variant="h6" color="black">
                        Done orders
                    </Typography>
                    <Typography variant="h6" color="black">
                        {doneOrders.length}
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <div className="h-56 overflow-auto">
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
                                                    <img src={image} alt="Order" className=" w-10 text-xs font-semibold text-blue-gray-600" />
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardHeader variant="gradient" className="flex justify-between mb-8 p-6 bg-primary">
                    <Typography variant="h6" color="black">
                        Deleted orders
                    </Typography>
                    <Typography variant="h6" color="black">
                        {deletedOrder.length}
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <div className="h-56 overflow-auto">
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
                                {deletedOrder.map(
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
                                                        color="red"
                                                        value="Deleted"
                                                        className="py-0.5 px-2 text-[11px] font-medium"
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
                                                    <img src={image} alt="Order" className="w-10 text-xs font-semibold text-blue-gray-600" />
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>

                </CardBody>
            </Card>
        </div>
    );
}

export default Orders;
