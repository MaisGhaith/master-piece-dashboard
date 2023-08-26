import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UsersFunctions = () => {

    // ! get users function
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8181/getAllUsers/getUsers`);
            const allUsers = response.data;
            setUsers(allUsers);
        } catch (error) {
            console.log("Error getting users data: ", error);
        }
    };
    useEffect(() => {
        getUsers();
    }, []);


    // ! delete users function

    const [showModal, setShowModal] = useState(false);

    const removeUser = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this choice?');
        if (confirmed) {
            try {
                await axios.put(`http://localhost:8181/deleteUsers/deleteUser/${id}`);
                console.log("User deleted successfully");
                setShowModal(true);
                await getUsers(); // Assuming you have a function to fetch users data
            } catch (error) {
                console.error('Error when trying to delete the user:', error);
            }
        }
    }


    const [activeUsers, setActiveUsers] = useState([]);
    const fetchActiveUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8181/getAllUsers/activeUsers");
            setActiveUsers(response.data);
        } catch (error) {
            console.error("Error fetching active users:", error);
        }
    };
    useEffect(() => {
        fetchActiveUsers();
    }, []);


    const [deletedUsers, setDeletedUsers] = useState([]);
    const fetchDeletedUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8181/getAllUsers/deletedUsers");
            setDeletedUsers(response.data);
        } catch (error) {
            console.error("Error fetching active users:", error);
        }
    };
    useEffect(() => {
        fetchDeletedUsers();
    }, []);


    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Filter the orders based on the search query for activeUsers
    const filteredActiveUsers = activeUsers.filter((user) =>
        user.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone_number.includes(searchQuery)
    );


    const [searchDeleteQuery, setSearchDeleteQuery] = useState("");

    const handleDeletedSearch = (query) => {
        setSearchDeleteQuery(query);
    }

    const filteredDeletedUsers = deletedUsers.filter((user) =>
        user.user_name.toLowerCase().includes(searchDeleteQuery.toLowerCase()) ||
        user.user_email.toLowerCase().includes(searchDeleteQuery.toLowerCase()) ||
        user.user_id.toLowerCase().includes(searchDeleteQuery.toLowerCase()) ||
        user.phone_number.includes(searchDeleteQuery)
    );



    return {
        users,
        removeUser,
        activeUsers,
        deletedUsers,
        handleSearch,
        filteredActiveUsers,
        handleDeletedSearch,
        filteredDeletedUsers,
        searchQuery
    }
}

export default UsersFunctions