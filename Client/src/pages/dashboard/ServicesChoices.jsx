import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
// import AddService from "./AddService";

export const getChoices = async () => {
    try {
        const response = await axios.get("http://localhost:8181/getChoices/getChoice");
        const choices = response.data;
        return choices.filter(choice => !choice.deleted);
    } catch (error) {
        console.log("Error getting choices data:", error);
        return [];
    }
};

// ! edit the choices
// export const editChoices = async (e, id) => {
//     e.preventDefault();
//     axios.put(`http://localhost:8181/editChoices/editChoice/${id}`,
//         {
//             choice: choice,
//             price: price
//         })
//         .then(function (response) {
//             console.log(response)
//         })
//         .catch(function (error) {
//             console.log("Failed to edit choices", error)
//         });
// }

const ServicesChoices = () => {

    const [choices, setChoices] = useState([]);
    const [choice, setChoice] = useState([]);
    const [price, setPrice] = useState([]);
    const [serviceId, setServiceId] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChoice, setNewChoice] = useState(null);

    // ! get choices with condition of deleted
    const getChoices = async () => {
        try {
            const response = await axios.get("http://localhost:8181/getChoices/getChoice");
            const choices = response.data;
            setChoices(choices.filter(choice => !choice.deleted));
        } catch (error) {
            console.log("Error getting choices data:", error);
        }
    }
    useEffect(() => {
        getChoices()
            .then(filteredChoices => setChoices(filteredChoices))
            .catch(error => console.log("Error setting choices:", error));
    }, []);


    // ! edit the choices

    const editChoices = async (e, id) => {
        e.preventDefault();

        // const { id } = choices;

        axios.put(`http://localhost:8181/editChoices/editChoice/${id}`,
            {
                choice: choice,
                price: price
            })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log("Failed to edit choices", error)
            });
    };

    // ! modal of edit 
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };


    // ! delete the choices

    const deleteChoice = async (id) => {
        const confirmed = await showConfirmationPrompt();
        if (confirmed) {
            try {
                await axios.put(`http://localhost:8181/deleteChoices/deleteChoice/${id}`);
                getChoices();

                console.log("delete successfully")
            } catch (error) {
                console.error("Error when trying to delete the choices:", error);

            }
        }
    }


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


    // ! add choices 

    const addChoice = async (event) => {
        event.preventDefault();

        try {

            const data = { choice: choice, price: price };
            const response = await axios.post(
                `http://localhost:8181/addChoices/addChoice${id}`, data
            );
            console.log(response.data)

            const addedChoice = {
                id: response.data.id,
                choice,
                price
            }

            setNewChoice(addedChoice);
            //Clear the form 
            setChoice("");
            setPrice("");

        } catch (error) {
            console.error("Failed to send choice data to the database:", error.message);

        }
    }

    useEffect(() => {
        if (newChoice) {
            setChoices((prevChoices) => [...prevChoices, newChoice]);
            setNewChoice(null);
        }
    }, [newChoice])



    return (
        <>
        </>


    )
}

export default ServicesChoices;