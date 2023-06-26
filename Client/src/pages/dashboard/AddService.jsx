import React, { Fragment, useRef, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import Swal from 'sweetalert2';
import {
    Card,
    CardHeader,
    Typography,
} from "@material-tailwind/react";


// import { ExclamationCircleIcon } from "@heroicons/react/solid";

function AddService() {

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

    // ...


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

            {/* tryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy */}


            {/* Service List */}

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
                                    backgroundImage: `url(${service.img})`,
                                    zIndex: -1,
                                }}
                                src={service.image}
                                alt={service.title}
                            ></img>
                        </div>
                        {/* <img
                            className="w-full h-48 object-cover"
                            src={service.image}
                            alt={service.title}
                        /> */}
                        <div className="pt-10">
                            {/* <h4 className="font-bold text-lg">{service.title}</h4> */}
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
                                        {/* <button className="border-2 border-gray-800 rounded-lg px-3 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                                             الخدمة
                                        </button> */}
                                        <button className="border-2 border-gray-800 rounded-lg px-3 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                                            إضافة خيارات
                                        </button>
                                    </div>
                                </div>
                            </div>


                            {/* <div className="mt-2 flex justify-between">
                                <button
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onClick={() => openModal(service)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onClick={() => handleDelete(service.id)}
                                >
                                    delete
                                </button>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>


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
