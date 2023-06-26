import { useState, useEffect } from 'react';
import axios from 'axios';

const useFunctions = () => {
    const [getAllChoices, setGetAllChoices] = useState([]);
    const [newChoice, setNewChoice] = useState(null);
    const [editingChoice, setEditingChoice] = useState(null);
    const [editedChoice, setEditedChoice] = useState('');

    const getChoices = async () => {
        try {
            const response = await axios.get('http://localhost:8181/getChoices/getChoice');
            const getAllChoices = response.data;
            setGetAllChoices(getAllChoices.filter((choice) => !choice.deleted));
        } catch (error) {
            console.log('Error getting choices data:', error);
        }
    };

    const editChoices = async (id, choice, price) => {
        try {
            await axios.put(`http://localhost:8181/editChoices/editChoice/${id}`, {
                choice: choice,
                price: price,
            });
            console.log('Choice edited successfully');
            await getChoices();
        } catch (error) {
            console.log('Failed to edit choices:', error);
        }
    };

    const deleteChoice = async (id) => {
        const confirmed = await showConfirmationPrompt();
        if (confirmed) {
            try {
                await axios.put(`http://localhost:8181/deleteChoices/deleteChoice/${id}`);
                console.log('Choice deleted successfully');
                await getChoices();
            } catch (error) {
                console.error('Error when trying to delete the choices:', error);
            }
        }
    };

    const addChoice = async (choice, price) => {
        try {
            const data = { choice: choice, price: price };
            const response = await axios.post('http://localhost:8181/addChoices/addChoice', data);
            console.log(response.data);

            const addedChoice = {
                id: response.data.id,
                choice,
                price,
            };

            setNewChoice(addedChoice);
        } catch (error) {
            console.error('Failed to send choice data to the database:', error.message);
        }
    };

    const handleEdit = (choice) => {
        setEditingChoice(choice);
        setEditedChoice(choice.choice);
    };

    const handleSave = async () => {
        if (editingChoice) {
            await editChoices(editingChoice.id, editedChoice, editingChoice.price);
            setEditingChoice(null);
            setEditedChoice('');
        }
    };

    const handleCancel = () => {
        setEditingChoice(null);
        setEditedChoice('');
    };

    useEffect(() => {
        if (newChoice) {
            setGetAllChoices((prevChoices) => [...prevChoices, newChoice]);
            setNewChoice(null);
        }
    }, [newChoice]);

    useEffect(() => {
        getChoices();
    }, []);

    const showConfirmationPrompt = () => {
        return window.confirm('Are you sure you want to delete this choice?');
    };

    return {
        getAllChoices,
        editChoices,
        deleteChoice,
        addChoice,
        handleEdit,
        handleSave,
        handleCancel,
    };
};

export default useFunctions;
