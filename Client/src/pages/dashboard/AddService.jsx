import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, Typography, } from "@material-tailwind/react";
import useFunctions from "./ChoicesFunctions";
import { Link } from "react-router-dom";

function AddService() {
    const [service_id, setServiceId] = useState(null);

    const {
        getAllChoices,
        getChoices,
        handleEdit,
        handleSave,
        handleCancel,
        deleteChoice,
        editingChoice,
        editedChoice,
        editedPrice,
        newChoice,
        newPrice,
        setEditedChoice,
        setEditedPrice,
        setNewChoice,
        setNewPrice,
        handleAddChoice,

        addChoice,
    } = useFunctions({ service_id });



    const [img, setImg] = useState("");
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [newService, setNewService] = useState(null);


    // Function to handle file input change
    const onChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            getBase64(file);
        }
    };

    // Function to convert file to base64 string
    const getBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
        };
    };

    // Function to handle base64 string
    const onLoad = (fileString) => {
        setImg(fileString);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = { title: title, image: img };
            const response = await axios.post(
                "http://localhost:8181/dash/addService",
                data
            );
            console.log(response.data);

            const addedService = {
                id: response.data.id,
                title,
                image: img.name,
            };

            setNewService(addedService);

            // Clear the form
            setTitle("");
            setImg("");
        } catch (error) {
            console.error("Failed to send data to the database:", error.message);
        }
    };

    useEffect(() => {
        if (newService) {
            setShowServices((prevServices) => [...prevServices, newService]);
            setNewService(null);
        }
    }, [newService]);

    // Function to get services data from the database
    const [showServices, setShowServices] = useState([]);
    const getServices = async () => {
        try {
            const response = await axios.get("http://localhost:8181/services/getService");
            const services = response.data;
            setShowServices(services.filter(service => !service.deleted));
        } catch (error) {
            console.log("Error getting services data:", error);
        }
    };


    useEffect(() => {
        getServices();
    }, []);


    // Function to update service data
    const handleUpdate = (e, service) => {
        e.preventDefault();
        const { id } = service;

        axios
            .put(`http://localhost:8181/edit/editService/${id}`, {
                title: title,
                image: img,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log("Failed to edit data on the frontend:", error);
            });
        getServices();
        closeModal();
    };

    // Function to open the modal for editing a specific service
    const openModal = (service) => {
        setSelectedService(service);
        setTitle(service.title);
        setImg(service.image);
        setOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedService(null);
        setTitle("");
        setImg("");
        setOpen(false);
    };


    // Function to handle drag over event
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Function to handle drop event
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            getBase64(file);
        }
    };

    // ! add choice modal 
    const [showModal, setShowModal] = useState(false);

    const addChoiceModal = (serviceId) => {
        setServiceId(serviceId);
        setShowModal(true);
        // console.log(serviceId)
    };
    const closeAddChoiceModal = () => {
        setShowModal(false);
    }

    // ! get data modal 
    const [getModal, setGetModal] = useState(false);

    const getDataModal = (id) => {
        setGetModal(true);
        console.log(id);
        setServiceId(id);
    };

    const closeGetDataModal = () => {
        setGetModal(false)
    }


    const addChoice0 = (id) => {
        console.log(id)
    }

    const [choice_id, setChoiceId] = useState(null);
    const getChoiceId = (choiceId) => {
        setChoiceId(choiceId);
        console.log(choiceId)
    };


    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [serviceIdToDelete, setServiceIdToDelete] = useState(null);

    const handleDelete = async (id) => {
        setServiceIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.put(`http://localhost:8181/delete/deleteService/${serviceIdToDelete}`);
            setIsDeleteModalOpen(false);
            getServices();
        } catch (error) {
            console.error("Error when trying to delete the service:", error);
        }
    };

    const handleDeleteCanceled = () => {
        setIsDeleteModalOpen(false);
    };

    return (

        <Card className="mt-12 mb-8 flex flex-col gap-12">
            <CardHeader variant="gradient" className="mb-8 p-6 bg-primary">
                <Typography variant="h6" color="black">
                    Add service
                </Typography>
            </CardHeader>
            <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
                <div className="mb-6">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>


                <div className="mb-6">
                    <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Image
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {img ? (
                                <div>
                                    <img
                                        src={img}
                                        alt="Selected"
                                        className="mx-auto h-12 w-12 text-gray-400"
                                    />
                                    <p className="text-xs text-gray-500">Selected</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            )}
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        accept="image/*"
                                        onChange={onChange}
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </form>

            <h1 className='flex justify-center text-3xl text-black font-bold'>Services</h1>

            <div className="py-12 flex flex-wrap justify-center">
                {showServices.map((service) => (
                    <div

                        key={service.id}
                        className="m-5 mx-10  p-6 max-w-[330px] w-full bg-white dark:bg-gray-800 shadow-2xl rounded-lg relative z-10"
                    >
                        <div className="rounded-lg mt-[-60px] relative h-[230px]">
                            <img
                                className="transition-all duration-300 ease-in-out absolute w-full h-full top-5 left-0 bg-cover bg-no-repeat rounded-lg"
                                style={{
                                    backgroundImage: `url(${service.image})`,
                                    zIndex: -1,
                                }}
                                src={service.image}
                                alt={service.title}
                            ></img>
                        </div>
                        <div className="pt-10">
                            <div className="flex flex-col items-center">
                                <h2 className="text-lg font-body text-black font-semibold">{service.title}</h2>
                                <div className="flex justify-center items-center">
                                    <div className="flex justify-between items-center flex-col">
                                        <div className="flex space-x-4">
                                            <button onClick={() => openModal(service)} className="border-2 my-1 w-32 h-10 border-gray-800 rounded-lg px-3 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                                                Edit service
                                            </button>
                                            <button onClick={() => handleDelete(service.id)} className="border-2 my-1 w-32 border-gray-800 rounded-lg px-3 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                                                Delete service
                                            </button>
                                        </div>
                                        <div className="flex space-x-4">
                                            <button onClick={() => addChoiceModal(service.id)} className="border-2 h-10 my-1 w-32 border-gray-800 rounded-lg px-3 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                                                Add choices
                                            </button>
                                            <button onClick={() => getDataModal(service.id)} className="border-2 my-1  w-32 border-gray-800 rounded-lg px-3 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                                                View choices
                                            </button>
                                        </div>
                                        {service.id}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                ))}
                {showModal && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-60">
                        <div className="flex justify-center flex-col items-center relative bg-white p-8 rounded-lg w-[400px]">
                            <button onClick={closeAddChoiceModal}
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                            <p className="text-xl">Add choices</p>
                            <div className="px-6 pt-6 lg:px-8">
                                <form className="space-y-6">
                                    <input
                                        type="text"
                                        name="choice"
                                        id="choice"
                                        className="input input-outline input-warning"
                                        placeholder="Choice"
                                        required=""
                                        value={newChoice}
                                        onChange={(e) => setNewChoice(e.target.value)}
                                    />
                                    <div>
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            className="input input-outline border-warning"
                                            placeholder="Price"
                                            required=""
                                            value={newPrice}
                                            onChange={(e) => setNewPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-center p-2 space-x-2 rounded-b">
                                        <button onClick={() => addChoice(service_id) ? closeAddChoiceModal() : null}
                                            data-modal-hide="bottom-right-modal" type="button" className="btn w-20 h-3 hover">Add </button>
                                        <button onClick={closeAddChoiceModal} data-modal-hide="bottom-right-modal"
                                            type="button" className="btn">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {getModal && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-scroll relative">
                            <button
                                onClick={closeGetDataModal}
                                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                            >
                                ✕
                            </button>
                            <div className="flex justify-center">
                                <h3 className=" text-xl font-semibold text-gray-900 mb-4">
                                    Details of Choices
                                </h3>
                            </div>
                            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                {getAllChoices.map((choice) => (
                                    <div key={choice.id}>
                                        {editingChoice && editingChoice.id === choice.id ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={editedChoice}
                                                    onChange={(e) => setEditedChoice(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    value={editedPrice}
                                                    onChange={(e) => setEditedPrice(e.target.value)}
                                                />
                                                <button onClick={handleSave}>Save</button>
                                                <button className="btn btn-error" onClick={handleCancel}>Cancel</button>
                                            </div>
                                        ) : (
                                            <div className="py-7" >
                                                <div className="flex justify-center mt-2  my-4 ">
                                                    <p className="mx-2">{choice.price}</p>
                                                    <p>{choice.choice}</p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <Link to={`/dashboard/Details?choiceId=${choice.id}`}>
                                                        <button className="btn btn-outline btn-success w-20">Add details </button>
                                                    </Link>
                                                    <button onClick={() => handleEdit(choice)} className="btn btn-outline btn-warning w-20 mx-5">Edit</button>
                                                    <button onClick={() => deleteChoice(choice.id)} className="btn btn-outline btn-error w-20" >Delete</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="btn btn-outline btn-ghost mt-2 w-24"
                                    onClick={closeGetDataModal} >Close </button>
                            </div>
                        </div>
                    </div>
                )}
                {isDeleteModalOpen && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-40">
                        <div className="bg-white p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">
                                Confirm Delete
                            </h2>
                            <p className="mb-6">
                                Are you sure you want to delete this Service ?
                            </p>
                            <div className="flex justify-end">
                                <button
                                    className="btn btn-red mr-2"
                                    onClick={() => handleDeleteConfirmed()}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-gray"
                                    onClick={() => handleDeleteCanceled(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {open && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-60">
                        <div className="flex justify-center flex-col items-center relative bg-white p-8 rounded-lg w-[400px]">
                            <button onClick={closeModal}
                                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
                            <p className="text-xl">Edit service</p>
                            <div className="flex justify-center flex-col">
                                <input type="text" name="edit-title" id="edit-title"
                                    className="input input-warning my-5" value={title} onChange={(e) => setTitle(e.target.value)} />

                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-warning border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        {img ? (
                                            <div>
                                                <img
                                                    src={img}
                                                    alt="Selected"
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                />
                                                <p className="text-xs text-gray-500">Selected</p>
                                            </div>
                                        ) : (
                                            <div>

                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG, GIF up to 10MB
                                                </p>
                                            </div>
                                        )}
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="edit-file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="edit-file-upload"
                                                    name="edit-file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={onChange}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-5 ">
                                <button
                                    type="submit"
                                    className="btn w-20 "
                                    onClick={(e) => handleUpdate(e, selectedService)}>Save
                                </button>
                                <button
                                    type="button"
                                    className="btn mx-3 w-20"
                                    onClick={closeModal}
                                > Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </Card >
    );
}

export default AddService;
