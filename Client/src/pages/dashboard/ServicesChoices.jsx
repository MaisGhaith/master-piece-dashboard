import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";

const ServicesChoices = () => {

    const [choices, setChoices] = useState([]);
    const [choice, setChoice] = useState([]);
    const [price, setPrice] = useState([]);
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
        getChoices
    }, [])


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
                "http://localhost:8181/addChoices/addChoice", data
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
        <div className='flex justify-center'>
            {choices.map((showChoices) => (
                <div key={showChoices.id}>
                    <a
                        href="#"
                        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {showChoices.choice}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {showChoices.price}
                        </p>
                        <button onClick={openModal}>Edit</button>
                        <button onClick={() => deleteChoice(showChoices.id)}>delete</button>

                        {/* <
                        button onClick={editChoices} className="m-5 bg-black text-white" >edit data</> */}
                        {isModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>Edit Choice</h2>
                                    <form onSubmit={(e) => editChoices(e, showChoices.id)}>
                                        <label>Choice</label>
                                        <input
                                            type="text"
                                            value={choice}
                                            onChange={(e) => setChoice(e.target.value)}
                                        />
                                        <label>Price</label>
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <button type="submit">Save</button>
                                        <button onClick={closeModal}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        )}

                    </a>

                </div>
            ))
            }

            {/* form to add choices  */}
            <>
                {/* component */}
                <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                            <div className="max-w-md mx-auto">
                                <div>
                                    <h1 className="text-2xl font-semibold">
                                        Login Form with Floating Labels
                                    </h1>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <input
                                                autoComplete="off"
                                                id="email"
                                                name="email"
                                                type="text"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                placeholder="Email address"
                                                value={choice}
                                                onChange={(e) => setChoice(e.target.value)}
                                            />
                                            <label
                                                htmlFor="email"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                choice
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                autoComplete="off"
                                                id="password"
                                                name="password"
                                                type="text"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                placeholder="Password"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}

                                            />
                                            <label
                                                htmlFor="password"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                price
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <button
                                                onClick={addChoice}
                                                type="submit" className="bg-blue-500 text-white rounded-md px-2 py-1">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>


            <button onClick={getChoices}>get data</button>
        </div>

    )
}
export default ServicesChoices;