import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ServicesFunctions = () => {
    // const [img, setImg] = useState('');
    // const [title, setTitle] = useState('');
    // const [open, setOpen] = useState(false);
    // const [selectedService, setSelectedService] = useState(null);
    // const [newService, setNewService] = useState(null);

    // const cancelButtonRef = useRef(null);
    // const updatedServicesRef = useRef([]);

    // // Function to handle file input change
    // const onChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         getBase64(file);
    //     }
    // };

    // // Function to convert file to base64 string
    // const getBase64 = (file) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //         onLoad(reader.result);
    //     };
    // };

    // // Function to handle base64 string
    // const onLoad = (fileString) => {
    //     setImg(fileString);
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const data = { title: title, image: img };
    //         const response = await axios.post('http://localhost:8181/dash/addService', data);
    //         console.log(response.data);

    //         const addedService = {
    //             id: response.data.id,
    //             title,
    //             image: img.name,
    //         };

    //         setNewService(addedService);

    //         // Clear the form
    //         setTitle('');
    //         setImg('');
    //     } catch (error) {
    //         console.error('Failed to send data to the database:', error.message);
    //     }
    // };

    // useEffect(() => {
    //     if (newService) {
    //         setShowServices((prevServices) => [...prevServices, newService]);
    //         setNewService(null);
    //     }
    // }, [newService]);

    // // Function to get services data from the database
    // const [showServices, setShowServices] = useState([]);
    // const getServices = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8181/services/getService');
    //         const services = response.data;
    //         setShowServices(services.filter((service) => !service.deleted));
    //     } catch (error) {
    //         console.log('Error getting services data:', error);
    //     }
    // };

    // useEffect(() => {
    //     getServices();
    // }, []);

    // // Function to update service data
    // const handleUpdate = (e, service) => {
    //     e.preventDefault();
    //     const { id } = service;

    //     axios
    //         .put(`http://localhost:8181/edit/editService/${id}`, {
    //             title: title,
    //             image: img,
    //         })
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log('Failed to edit data on the frontend:', error);
    //         });

    //     const updatedService = {
    //         ...service,
    //         title,
    //         image: img.name,
    //     };

    //     updatedServicesRef.current = showServices.map((s) => (s.id === service.id ? updatedService : s));
    //     closeModal();
    // };

    // // Function to open the modal for editing a specific service
    // const openModal = (service) => {
    //     setSelectedService(service);
    //     setTitle(service.title);
    //     setImg(service.image);
    //     setOpen(true);
    // };

    // // Function to close the modal
    // const closeModal = () => {
    //     setSelectedService(null);
    //     setTitle('');
    //     setImg('');
    //     setOpen(false);
    // };

    // // Function to handle drag over event
    // const handleDragOver = (e) => {
    //     e.preventDefault();
    // };

    // // Function to handle drop event
    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     const file = e.dataTransfer.files[0];
    //     if (file) {
    //         getBase64(file);
    //     }
    // };

    // // Function to delete service
    // const handleDelete = async (id) => {
    //     const confirmed = await showConfirmationPrompt();
    //     if (confirmed) {
    //         try {
    //             await axios.put(`http://localhost:8181/delete/deleteService/${id}`);
    //             getServices(); // Refresh the service list after deletion
    //             // setShowServices(prevdata => prevdata.filter(service => service.id !== id))
    //         } catch (error) {
    //             console.error('Error when trying to delete the service:', error);
    //         }
    //     }
    // };

    // const showConfirmationPrompt = () => {
    //     return new Promise((resolve) => {
    //         Swal.fire({
    //             title: 'Are you sure?',
    //             text: "You won't be able to revert this!",
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonColor: '#3085d6',
    //             cancelButtonColor: '#d33',
    //             confirmButtonText: 'Yes, delete it!',
    //         }).then((result) => {
    //             resolve(result.isConfirmed);
    //         });
    //     });
    // };



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



    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [choice_id, setChoiceId] = useState(null);

    console.log(choice_id)
    const [openDetails, setOpenDetails] = useState(false);

    const handleOpen = (choiceId) => {
        setOpenDetails(!openDetails); // Toggle the state
        setGetModal(false)
        setChoiceId(choiceId);
        console.log(choiceId)
    };

    const handleClose = () => {
        setOpenDetails(false); // Close the dialog
    };
    const submitDetails = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8181/addChoices/details/${choice_id}`, {
                desc,
                price,
                choice_id
            });

            console.log('Data inserted successfully:', response.data);
            // هنا يمكنك تحديث حالة الواجهة الأمامية أو إجراء أي إجراءات أخرى
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    // Export the functions as an object
    return {
        img,
        setImg,
        title,
        setTitle,
        open,
        setOpen,
        selectedService,
        setSelectedService,
        newService,
        setNewService,
        cancelButtonRef,
        updatedServicesRef,
        onChange,
        getBase64,
        onLoad,
        handleSubmit,
        showServices,
        getServices,
        handleUpdate,
        openModal,
        closeModal,
        handleDragOver,
        handleDrop,
        handleDelete,
        showModal,
        getModal,
        openDetails,
        handleOpen,
        handleClose,
        submitDetails
    };
};

export default ServicesFunctions;
