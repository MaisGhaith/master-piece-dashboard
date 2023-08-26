import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip,
    ModalFooter,
    ModalBody,
    Button,
    Modal,
} from '@material-tailwind/react';
import { authorsTableData } from '@/data';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Faqs = () => {

    const [questions, setQuestions] = useState([])
    const fetchQuestion = async () => {
        try {
            const response = await axios.get('http://localhost:8181/faqs/faqs-get');
            const data = response.data;
            setQuestions(data);
            console.log(data);
        } catch (error) {
            console.error('حدث خطأ أثناء استدعاء الـ endpoint:', error);
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, [])

    const [open, setOpen] = React.useState(false);

    const [answerId, setAnswerId] = useState(null);
    const handleOpen = (id) => {
        setOpen(!open);
        setAnswerId(id)
        setEditedAnswer('')
    }



    const [editedAnswer, setEditedAnswer] = useState('');

    const handleSaveAnswer = async () => {
        try {
            const response = await axios.put(`http://localhost:8181/faqs/answer-faq/${answerId}`, { answer: editedAnswer });
            console.log("Answer updated successfully:", response.data);

            handleOpen();
            await fetchQuestion();

        } catch (error) {
            console.error('Error updating answer:', error);

            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };


    // ! show full text function
    const [showFullText, setShowFullText] = useState(false);

    function shortenText(text, wordsCount) {
        const words = text.split(' ');
        const shortenedText = words.slice(0, wordsCount).join(' ');
        return shortenedText;
    }


    const [expandedAnswers, setExpandedAnswers] = useState({});


    // Function to toggle the expanded state of an answer
    const toggleAnswerExpansion = (id) => {
        setExpandedAnswers((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };


    const [display, setDisplay] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleDisplayStatus = async () => {
        setIsModalOpen(true);
    };

    const confirmToggleDisplayStatus = async () => {
        try {
            const response = await axios.put(`http://localhost:8181/faqs/display/${answerId}`);

            if (response.status === 200) {
                const data = response.data;
                setDisplay(data.newDisplayStatus);
                fetchQuestion()
                closeModal();
            } else {
                console.error("Error toggling display status");
            }
        } catch (error) {
            console.error("Error toggling display status", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };




    return (
        <div>
            <Card className='mt-10'>
                <CardHeader variant="gradient" className="flex justify-between mb-8 p-6 bg-[#FBF0B2]">
                    <Typography variant="h6" color="black">
                        Faqs
                    </Typography>
                    <Typography variant="h6" color="white">

                    </Typography>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2">
                    <div className='h-56 overflow-auto'>
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {[
                                        'Question_no',
                                        'Name',
                                        'Question',
                                        'Edit',
                                        'answer',
                                        'display',
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
                                {questions.map(
                                    (
                                        { id, user_name, question, answer, display },
                                        key
                                    ) => {
                                        const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
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
                                                        {user_name}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {question}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <button onClick={() => handleOpen(id)} className="font-semibold text-blue-gray-600">
                                                        <FontAwesomeIcon icon={faPencil} size='lg' className='hover:scale-105' style={{ color: "#53b285", }} />
                                                    </button>
                                                </td>
                                                <td className={className}>
                                                    {expandedAnswers[id] ? (
                                                        <div>
                                                            {answer}
                                                            <button
                                                                className="text-yellow-500"
                                                                onClick={() => toggleAnswerExpansion(id)}
                                                            >
                                                                إخفاء
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {answer}
                                                            {!expandedAnswers[id] && answer && answer.split(' ').length > 3 && (
                                                                <button
                                                                    className={showFullText ? "text-yellow-500" : "text-green-500"}
                                                                    onClick={() => toggleAnswerExpansion(id)}
                                                                >
                                                                    {showFullText ? "إخفاء" : "اقرأ المزيد"}
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>



                                                <td className={className}>
                                                    <Chip
                                                        variant="gradient"
                                                        color={display ? "green" : "blue-gray"}
                                                        value={display ? "معروض" : "غير معروض"}
                                                        className="py-0.5 px-2 text-[11px] font-medium cursor-pointer"
                                                        onClick={() => {
                                                            setAnswerId(id);
                                                            toggleDisplayStatus()
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>

                        </table>
                    </div>

                </CardBody>

                {isModalOpen && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-40">
                        <div className="flex justify-center flex-col items-center bg-white p-8 rounded-lg w-[400px]">
                            <h2 className="text-xl font-semibold mb-4">Display answer</h2>
                            <p>
                                Are you sure you want to change the display for this answer ?
                            </p>

                            <div className="flex justify-end mt-4">
                                <button className="btn mr-2" onClick={confirmToggleDisplayStatus}>
                                    Display
                                </button>
                                <button className="btn  mx-2" onClick={closeModal}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {open && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-40">
                        <div className="flex justify-center flex-col items-center bg-white p-8 rounded-lg w-[400px]">
                            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                            <textarea
                                className="textarea textarea-warning w-56"
                                value={editedAnswer}
                                placeholder="write the answer here"
                                onChange={(e) => setEditedAnswer(e.target.value)}
                            ></textarea>

                            <div className="flex justify-end mt-4">
                                <button className="btn mr-2" onClick={handleSaveAnswer}>
                                    Confirm
                                </button>
                                <button className="btn  mx-2" onClick={handleOpen}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>

                )}
            </Card>
        </div >
    )
}

export default Faqs