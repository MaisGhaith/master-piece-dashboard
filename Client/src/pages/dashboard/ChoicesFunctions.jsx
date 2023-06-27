// ChoicesFunctions.js
import { useState, useEffect } from 'react';
import axios, { all } from 'axios';

const useFunctions = ({ service_id }) => {
    const [getAllChoices, setGetAllChoices] = useState([]);
    const [editingChoice, setEditingChoice] = useState(null);
    const [editedChoice, setEditedChoice] = useState('');
    const [editedPrice, setEditedPrice] = useState('');
    const [newChoice, setNewChoice] = useState('');
    const [newPrice, setNewPrice] = useState('');

    console.log(service_id)
    const getChoices = async () => {
        try {
            const response = await axios.get(`http://localhost:8181/getChoices/getChoice/${service_id}`);
            // console.log(response)
            const allChoices = response.data;
            console.log(allChoices)
            setGetAllChoices(allChoices.filter((choice) => !choice.deleted));
        } catch (error) {
            console.log('Error getting choices data:', error);
        }
    };

    useEffect(() => {
        if (service_id !== null) {
            getChoices();
        }
    }, [service_id]);

    const editChoice = async (id, choice, price) => {
        try {
            await axios.put(`http://localhost:8181/editChoices/editChoice/${id}`, {
                choice: choice,
                price: price,
            });
            console.log('Choice edited successfully');
            await getChoices();
        } catch (error) {
            console.log('Failed to edit choice:', error);
        }
    };

    const deleteChoice = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this choice?');
        if (confirmed) {
            try {
                await axios.put(`http://localhost:8181/deleteChoices/deleteChoice/${id}`);
                console.log('Choice deleted successfully');
                await getChoices();
            } catch (error) {
                console.error('Error when trying to delete the choice:', error);
            }
        }
    };

    const addChoice = async (id) => {
        try {
            console.log("mais")
            console.log(id)
            const data = {
                choice: newChoice,
                price: newPrice,
            };
            const response = await axios.post(`http://localhost:8181/addChoices/addChoice/${id}`, data);
            // console.log(response.data);

            const addedChoice = {
                id: response.data.id,
                choice: response.data.choice,
                price: response.data.price,
            };

            setGetAllChoices((prevChoices) => [...prevChoices, addedChoice]);
            setNewChoice('');
            setNewPrice('');
        } catch (error) {
            console.error('Failed to send choice data to the database:', error.message);
        }
    };



    const handleEdit = (choice) => {
        setEditingChoice(choice);
        setEditedChoice(choice.choice);
        setEditedPrice(choice.price);
    };

    const handleSave = async () => {
        if (editingChoice) {
            await editChoice(editingChoice.id, editedChoice, editedPrice);
            setEditingChoice(null);
            setEditedChoice('');
            setEditedPrice('');
        }
    };

    const handleCancel = () => {
        setEditingChoice(null);
        setEditedChoice('');
        setEditedPrice('');
    };


    // console.log(getAllChoices)

    return {
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
        addChoice,
    };
};

export default useFunctions;
