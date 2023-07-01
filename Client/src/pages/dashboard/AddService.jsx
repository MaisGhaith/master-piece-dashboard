import React, { Fragment, useRef, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import Swal from 'sweetalert2';
import {
    Card,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import useFunctions from "./ChoicesFunctions";

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

    const cancelButtonRef = useRef(null);
    const updatedServicesRef = useRef([]);

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

        const updatedService = {
            ...service,
            title,
            image: img.name,
        };

        updatedServicesRef.current = showServices.map((s) => (s.id === service.id ? updatedService : s));
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


    // ! delete service 
    // Function to delete service
    const handleDelete = async (id) => {
        const confirmed = await showConfirmationPrompt();
        if (confirmed) {
            try {
                await axios.put(`http://localhost:8181/delete/deleteService/${id}`);
                getServices(); // Refresh the service list after deletion
                // setShowServices(prevdata => prevdata.filter(service => service.id !== id))
            } catch (error) {
                console.error("Error when trying to delete the service:", error);
            }
        }
    };


    const showConfirmationPrompt = () => {
        return new Promise((resolve) => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                resolve(result.isConfirmed);
            });
        });
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

    return (

        <Card className="mt-12 mb-8 flex flex-col gap-12">
            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                <Typography variant="h6" color="white">
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
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </form>


            {/* Service List */}

            <h1 className='flex justify-center text-3xl text-black font-bold'>Services</h1>

            <div className="py-12 flex flex-wrap justify-center">
                {/* {console.log(showServices)} */}
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
                        {/* <button onClick={() => addChoice0(service)}>majddiiiiiiiiiii</button> */}

                        <div className="pt-10">
                            <div className="flex flex-col items-center">
                                <h2 className="text-lg font-body text-black font-semibold">{service.title}</h2>
                                <div className="flex justify-between items-center flex-col">
                                    <div className="flex justify-between items-center flex-col">
                                        <button onClick={() => openModal(service)} className="border-2 border-gray-800 rounded-lg px-3 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                                            تعديل الخدمة
                                        </button>
                                        <button onClick={() => handleDelete(service.id)} className="border-2 border-gray-800 rounded-lg px-3 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                                            حذف الخدمة
                                        </button>
                                        <button onClick={() => addChoiceModal(service.id)} className="border-2 border-gray-800 rounded-lg px-3 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                                            إضافة خيارات
                                        </button>
                                        <button
                                            onClick={() => getDataModal(service.id)}

                                            // onClick={getDataModal}
                                            className="border-2 border-gray-800 rounded-lg px-3 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                                            عرض الخيارات
                                        </button>
                                        {service.id}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
                {showModal && (
                    <div
                        id="authentication-modal"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center"
                    >
                        <div className="relative bg-white rounded-lg shadow">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                onClick={closeAddChoiceModal}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <form className="space-y-6" action="#">
                                    <div>
                                        <input
                                            type="hidden"
                                            name="service_id"
                                            value={service_id}
                                            onChange={(e) => setServiceId(e.target.value)}
                                            service_id={service_id}
                                        />

                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            أضف الخيار
                                        </label>
                                        <input
                                            type="text"
                                            name="choice"
                                            id="choice"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="الخيار"
                                            required=""
                                            value={newChoice}
                                            onChange={(e) => setNewChoice(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="choice"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            أضف السعر
                                        </label>
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="السعر"
                                            required=""
                                            value={newPrice}
                                            onChange={(e) => setNewPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button onClick={closeAddChoiceModal} data-modal-hide="bottom-right-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">إلغاء</button>
                                        <button onClick={() => addChoice(service_id) ? closeAddChoiceModal() : null}
                                            data-modal-hide="bottom-right-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">إضافة </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {getModal && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            {/* Modal content goes here */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Terms of Service
                            </h3>
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
                                                <button onClick={handleCancel}>Cancel</button>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>{choice.price}</p>
                                                <p>{choice.choice}</p>
                                                <button onClick={() => handleEdit(choice)}>Edit</button>
                                                <button onClick={() => deleteChoice(choice.id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                                    onClick={closeGetDataModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
            <>

                {/* Main modal */}

            </>

            {/* Add choices  */}


            {/* Edit Service Modal */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    open={open}
                    onClose={closeModal}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex justify-center sm:items-end">

                                        <div className=" mt-3 text-center sm:mt-0 sm:ml-4 sm:text-right">
                                            <Dialog.Title as="h3" className=" flex justify-center text-lg leading-6 font-medium text-gray-900">
                                                تعديل الخدمة
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <label
                                                    htmlFor="edit-title"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    اسم الخدمة
                                                </label>
                                                <input
                                                    type="text"
                                                    name="edit-title"
                                                    id="edit-title"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <label
                                                    htmlFor="edit-image"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    الصورة
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
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center bg-gray-50 px-4 py-3 sm:px-6 sm:flex ">
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={closeModal}
                                        ref={cancelButtonRef}
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={(e) => handleUpdate(e, selectedService)}
                                    >
                                        حفظ
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </Card >
    );
}

export default AddService;
