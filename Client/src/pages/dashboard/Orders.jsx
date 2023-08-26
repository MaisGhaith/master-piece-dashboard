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
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Orders() {

    const {
        doneOrders,
        orders,
        getDeletedOrder,
        pendingOrders,
        handleChangeApproved,
        handleChangeStatus,
        filteredDeletedOrders,
        handleDeleteSearch,
        handleDoneOrdersSearch,
        filteredDoneOrders,
        handlePendingOrdersSearch,
        filteredPendingOrders,
        handleInPorgressOrdersSearch,
        filteredInProgressOrders,
        getOrders,
        getDoneOrders,
        getPendingOrders,

    } = useOrders();


    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    const handleDelete = (detailId) => {
        setOrderToDelete(detailId);
        setOpenDeleteModal(true);
    };

    // ! delete user order 
    const deleteUserOrder = async () => {

        try {
            await axios.put(`http://localhost:5151/deleteUserOrders/deleteUserOrder/${orderToDelete}`);
            console.log("order deleted successfully");
            setOpenDeleteModal(false)
            await getOrders();
            await getDoneOrders();
            await getPendingOrders();
            await getDeletedOrder();
        } catch (error) {
            console.error('Error when trying to delete the Order:', error);

        }
    }







    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            {openDeleteModal && (
                <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-40">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            Confirm Delete
                        </h2>
                        <p className="mb-6">
                            Are you sure you want to delete this detail?
                        </p>
                        <div className="flex justify-end">
                            <button
                                className="btn btn-red mr-2"
                                onClick={() => deleteUserOrder()}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-gray"
                                onClick={() => setOpenDeleteModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Card>
                <CardHeader variant="gradient" className="flex justify-between mb-8 p-6 overflow-y-auto bg-primary ">
                    <Typography variant="h6" color="black">
                        Holding orders
                    </Typography>
                    <div className="flex justify-center items-center flex-row">
                        <Typography variant="h6" color="black">
                            <SearchBar onSearch={handlePendingOrdersSearch} />
                        </Typography>
                        <Typography className="mx-5" variant="h6" color="black">
                            Count :  {pendingOrders.length}
                        </Typography>
                    </div>
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
                                        'Price',
                                        'location',
                                        'Image',
                                        'Delete',
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
                                {filteredPendingOrders.map(
                                    (
                                        { id, name, phone, order_no, price, user_id, service_name, choice_name, location, image, approved },
                                        key
                                    ) => {
                                        const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
                                            }`;

                                        return (
                                            <tr key={id}>
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
                                                    <img src={image} alt="Order" className=" w-10 text-xs font-semibold text-blue-gray-600" />
                                                </td>
                                                <td className={className}>
                                                    <button
                                                        type="button"
                                                        variant="small"
                                                        color="red"
                                                        className="font-medium pl-3"
                                                        onClick={() => handleDelete(id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} size='lg' className='hover:scale-105' style={{ color: "#ce1c1c", }} />                                                    </button>

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
                    <div className="flex justify-center items-center flex-row">
                        <Typography variant="h6" color="black">
                            <SearchBar onSearch={handleInPorgressOrdersSearch} />
                        </Typography>
                        <Typography className="mx-5" variant="h6" color="black">
                            Count :  {filteredInProgressOrders.length}
                        </Typography>
                    </div>
                </CardHeader>
                <CardBody className=" px-0 pt-0 pb-2" style={{ maxHeight: '320px', maxWidth: '1500px' }}>
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
                                        'Delete',
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
                                {filteredInProgressOrders.map(
                                    (
                                        { id, name, phone, order_no, user_id, service_name, choice_name, location, image, status, price },
                                        key
                                    ) => {
                                        const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
                                            }`;

                                        return (
                                            <tr key={id}>
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
                                                <td className={className}>
                                                    <button
                                                        type="button"
                                                        variant="small"
                                                        color="red"
                                                        className="font-medium pl-3"
                                                        onClick={() => handleDelete(id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} size='lg' className='hover:scale-105' style={{ color: "#ce1c1c", }} />                                                    </button>

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
                        Done orders
                    </Typography>
                    <div className="flex justify-center items-center flex-row">
                        <Typography variant="h6" color="black">
                            <SearchBar onSearch={handleDoneOrdersSearch} />
                        </Typography>
                        <Typography className="mx-5" variant="h6" color="black">
                            Count :  {filteredDoneOrders.length}
                        </Typography>
                    </div>
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
                                {filteredDoneOrders.map(
                                    (
                                        { id, name, phone, order_no, price, user_id, service_name, choice_name, location, image, status },
                                        key
                                    ) => {
                                        const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
                                            }`;

                                        return (
                                            <tr key={id}>
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
                                                    <img src={image} alt="Order" className=" w-10 text-xs font-semibold text-blue-gray-600" />
                                                </td>
                                                {/* <td className={className}>
                                                    <button
                                                        type="button"
                                                        variant="small"
                                                        color="red"
                                                        className="font-medium pl-3"
                                                        onClick={() => handleDelete(id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} size='lg' className='hover:scale-105' style={{ color: "#ce1c1c", }} />                                                    </button>

                                                </td> */}
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
                        Deleted orders
                    </Typography>
                    <div className="flex justify-center items-center flex-row">
                        <Typography variant="h6" color="black">
                            <SearchBar onSearch={handleDeleteSearch} />
                        </Typography>
                        <Typography className="mx-5" variant="h6" color="black">
                            Count :  {filteredDeletedOrders.length}
                        </Typography>
                    </div>
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
                                {filteredDeletedOrders.map(
                                    (
                                        { id, name, phone, order_no, price, user_id, service_name, choice_name, location, image, status, approved },
                                        key
                                    ) => {
                                        const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
                                            }`;

                                        return (
                                            <tr key={id}>
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
                                                    {approved ? (
                                                        <Chip
                                                            variant="gradient"
                                                            color="yellow"
                                                            value="Was Approved"
                                                            className="py-0.5 px-2 text-[11px] font-medium"
                                                        />
                                                    ) : (
                                                        <Chip
                                                            variant="gradient"
                                                            color={status ? 'green' : 'blue-gray'}
                                                            value={status ? 'In progress' : `Wasn't approved`}
                                                            className="py-0.5 px-2 text-[11px] font-medium"
                                                            onClick={() => {
                                                                if (!status) {
                                                                    handleChangeStatus(order_no);
                                                                }
                                                            }}
                                                        />
                                                    )}
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
        </div >
    );
}

export default Orders;
