import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input
} from '@material-tailwind/react';
import { authorsTableData } from '@/data';

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


    return (
        <div>
            <Card>
                <CardHeader variant="gradient" color="blue" className="flex justify-between mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Faqs
                    </Typography>
                    <Typography variant="h6" color="white">

                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {[
                                    'Question_no',
                                    'Name',
                                    'Question',
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
                                                <button onClick={() => handleOpen(id)} className="text-xs font-semibold text-blue-gray-600">
                                                    رد
                                                </button>
                                            </td>
                                            <td className="w-96">
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
                                                    color={display ? 'green' : 'blue-gray'}
                                                    value={display ? 'معروض' : 'غير معروض'}
                                                    className="py-0.5 px-2 text-[11px] font-medium"
                                                    onClick={() => {

                                                    }}
                                                />
                                            </td>

                                        </tr>
                                    );
                                }
                            )}
                        </tbody>

                    </table>

                </CardBody>


                <Dialog
                    className='flex flex-col justify-center items-center'
                    open={open}
                    handler={handleOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader>الرد على </DialogHeader>
                    <Typography></Typography>
                    <textarea value={editedAnswer}
                        onChange={(e) => setEditedAnswer(e.target.value)} type="text" placeholder="اكتب الرد هنا" className="textarea textarea-bordered w-full max-w-xs" />
                    <DialogFooter>
                        <button onClick={handleOpen} className="btn btn-outline btn-error mx-4">إلغاء</button>
                        <button onClick={() => handleSaveAnswer()} className="btn btn-outline btn-success">إرسال</button>
                    </DialogFooter>
                </Dialog>

            </Card>
        </div >
    )
}

export default Faqs