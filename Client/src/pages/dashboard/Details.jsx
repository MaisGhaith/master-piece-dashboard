import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { Card, Typography, CardHeader, CardBody } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Details = () => {
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const choiceId = searchParams.get('choiceId');

    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');

    const [openDetails, setOpenDetails] = useState(false);

    const handleClose = () => {
        setOpenDetails(false); // Close the dialog
    };

    const submitDetails = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8181/addChoices/details/${choiceId}`, {
                desc,
                price,
                choiceId
            });
            console.log('Data inserted successfully:', response.data);
            // Update the frontend as needed
            await getDetails();
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    const [getDetailsData, setGetDetailsData] = useState([]);
    const getDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8181/getChoices/getDetails/${choiceId}`);
            setGetDetailsData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error getting details data:', error);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);




    const [detailId, setDetailId] = useState(null)

    // const getIdModal = (detail_id) => {
    //     setDetailId(detail_id)
    //     setOpenEditModal(true)
    // }
    console.log(detailId)

    const [editedDesc, setEditedDesc] = useState('');
    const [editedPrice, setEditedPrice] = useState('');

    const handleEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:8181/editChoices/editDetail/${detailId}`, {
                desc: editedDesc,
                price: editedPrice
            });
            console.log('Details updated:', response.data);
            await getDetails();
        } catch (error) {
            console.error('Error updating details:', error);
        }
    };


    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [detailToDelete, setDetailToDelete] = useState(null);

    const handleDelete = (detailId) => {
        setDetailToDelete(detailId);
        setOpenDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.put(`http://localhost:8181/deleteChoices/deleteDetails/${detailToDelete}`);
            console.log('Choice detail has been deleted successfully');
            // Update the frontend or perform any other actions
            setOpenDeleteModal(false); // Close the modal
            await getDetails(); // Refresh the details after deletion
        } catch (error) {
            console.error('Error deleting choice detail:', error);
            // Handle error if needed
        }
    };


    const [openEditModal, setOpenEditModal] = useState(false);

    // Function to open the edit modal
    const openEditDialog = (detail_id) => {
        setDetailId(detail_id)
        setOpenEditModal(true);
    };

    // Function to close the edit modal
    const closeEditDialog = () => {
        setOpenEditModal(false);
    };
    const TABLE_HEAD = ["id", "Details", "Price", "properities"];



    return (
        <div className='flex flex-col  justify-center'>
            <div className='flex justify-center'>
                <div className='flex overflow-y-auto flex-col mt-20 p-10 border-2 shadow-lg border-[#FBF0B2] bg-gray-50 border-solid rounded-lg w-full sm:w-full md:3/4 lg:w-1/2 items-center justify-center'>
                    <p className='text-3xl'> Add Details</p>
                    <form onSubmit={submitDetails} className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
                        <div className='mb-4 flex flex-col items-center gap-6'>
                            <input onChange={(e) => setPrice(e.target.value)} className='input border-[#FBF0B2] w-3/4 sm:w-3/4 md:w-3/4 lg:w-full' type='text' placeholder='Price' />
                            <textarea onChange={(e) => setDesc(e.target.value)} className='textarea border-[#FBF0B2] my-5 w-3/4 sm:w-3/4 md:w-3/4 lg:w-full' placeholder='Details' />
                            <button className='btn btn-outline hover:bg-primary bg-amber-400 w-32  hover:text-black' type='submit'>
                                Add details
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='mt-20 mb-72'>
                <Card>
                    <CardHeader variant="gradient" className="flex justify-between mb-8 p-6 bg-primary" >
                        <Typography variant="h6" color="black">
                            Details
                        </Typography>
                    </CardHeader>
                    <CardBody className="px-0 pt-0 pb-2">
                        <div className='overflow-auto h-56'>
                            <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                    <tr>
                                        {[
                                            'number',
                                            'Details',
                                            'Price',
                                            'Edit',
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
                                    {getDetailsData.map(
                                        (
                                            { id, desc, price },
                                            key
                                        ) => {
                                            const className = `py-3 px-5 ${key === getDetailsData.length - 1 ? '' : 'border-b border-blue-gray-50'
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
                                                                    {id}
                                                                </Typography>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={className}>
                                                        <Typography className="text-xs font-semibold text-blue-gray-600">
                                                            {desc}
                                                        </Typography>
                                                    </td>
                                                    <td className={className}>
                                                        <Typography className="text-xs font-semibold text-blue-gray-600">
                                                            {price}
                                                        </Typography>
                                                    </td>
                                                    <td className={className}>
                                                        <button
                                                            type="button"
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-medium "
                                                            onClick={() => openEditDialog(id)}
                                                        >
                                                            <FontAwesomeIcon icon={faPenToSquare} size='lg' className='hover:scale-105' style={{ color: "#dfdb5d", }} />
                                                        </button>

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

                {/* Edit Modal */}
                {openEditModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="modal-overlay absolute inset-0 bg-black bg-opacity-50" onClick={() => setOpenEditModal(false)} />
                        <div className="modal-content bg-white p-6 rounded-lg shadow-lg relative z-10">
                            <button className="modal-close" onClick={() => setOpenEditModal(false)}>
                                &times;
                            </button>
                            {/* Your modal content goes here */}
                            <h3>Edit Details</h3>
                            <div className="mb-3">
                                <label htmlFor="editedDesc" className="block font-medium mb-1">Edited Desc:</label>
                                <input
                                    type="text"
                                    id="editedDesc"
                                    value={editedDesc}
                                    onChange={(e) => setEditedDesc(e.target.value)}
                                    className="input input-success w-full"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editedPrice" className="block font-medium mb-1">Edited Price:</label>
                                <input
                                    type="text"
                                    id="editedPrice"
                                    value={editedPrice}
                                    onChange={(e) => setEditedPrice(e.target.value)}
                                    className="input input-success w-full"
                                />
                            </div>
                            <button
                                className="btn btn-outline btn-success"
                                onClick={() => {
                                    handleEdit(); // Call your edit function
                                    setOpenEditModal(false); // Close the modal
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}

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
                                    onClick={() => confirmDelete()}
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


            </div>
        </div >
    );
};

export default Details;
