import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function Question({ selectedOptions, setSelectedOptions }) {
    const [questions, setQuestions] = useState([]); // State for the questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State for the current index of the question
    const [remainingQuestions, setRemainingQuestions] = useState(0); // State for the remaining questions
    const [showPopup, setShowPopUp] = useState(true);
    const [timer, setTimer] = useState(5);//timer 
    const { language, category } = useParams(); // Parameter for the selected language in the quiz page
    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate("/signin")
        }
    })

    const styles = `

.card-title {
    margin-bottom: 1em;
}
body {
    background-color: rgb( 21, 25, 34);
    color: white;
    
}
.card{
    background-color:rgb(60, 71, 72);
    color:white;
}
h1 {
    color: white;
    text-transform: capitalize;
    margin-bottom: 1em;
}

.remaining {
    text-align: center;
    height: 2em;
    width: 3em;
    border: 1px solid black;
    border-radius: 10px; 
}
.option:hover {
    background-color: rgb(117, 114, 114);
    color: yellow;
}

.option.selected {
    background-color: darkblue;
    color: white;
}

/* Media query for smaller screens */
@media screen and (max-width: 768px) {
    .container {
        padding-top: 3em;
    }

    .card-body {
        padding: 1em;
    }

    .option {
        margin-bottom: 1em;
        display: block;
        width: 100%;
        border: 1px solid grey;
        border-radius: 20px;
        padding: 10px;
        transition: ease-in 100ms;
        background-color: transparent;
    }

    .btn {
        margin-top: 1em;
        border-radius: 15px;
    }
}

/* Media query for larger screens */
@media screen and (min-width: 769px) {
    .option {
        display: block;
        width: 100%;
        margin-bottom: 1em;
        border: 1px solid grey;
        border-radius: 20px;
        padding: 10px;
        transition: ease-in 100ms;
        background-color: transparent;
    }

    .btn {
        width: 100%;
        margin-top: 1em;
        border-radius: 15px;
    }
}
`;

    // Apply internal styles to the component
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Fetching questions based on the selected language
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/api/Quiz/${language}/${category}`);
                setQuestions(response.data);
                console.log(response.data);
                // Initialize the selected options array with default values for all questions
                setSelectedOptions(response.data.map(() => ({ id: null, response: '' })));

                // Set the number of remaining questions initially
                setRemainingQuestions(response.data.length);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, [language, setSelectedOptions, category]);

    // Function to handle selecting an option and rendering the next question
    const moveToNextQuestion = (response, id) => {
        const selectedOption = [...selectedOptions];

        // If response is undefined, set it as an empty string
        const formattedResponse = response !== undefined ? response : '';

        selectedOption[currentQuestionIndex] = { id: formattedResponse ? id : questions[currentQuestionIndex].id, response: formattedResponse };
        setSelectedOptions(selectedOption);
        setTimer(5);
        console.log(selectedOption);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setRemainingQuestions(questions.length - currentQuestionIndex - 1);
        } else {
            navigate('/result');
        }
    };

    //Timer
    useEffect(() => {
        if (!showPopup) {
            const countdown = setInterval(() => {
                if (timer > 0) {
                    setTimer(prevTime => prevTime - 1);
                }
                if (timer === 0) {
                    moveToNextQuestion();
                }
            }, 1000)
            return () => clearInterval(countdown)
        }
    });



    const closePopUp = () => {
        setShowPopUp(false);
    }
    return (
        <div className="container mt-5">
            {showPopup && (
                <div>
                    <section>
                        <div className="row">
                            {[1, 2, 3, 4].map((instructionNumber) => (
                                <div key={instructionNumber} className="col-md-6 mx-auto">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h1 className="card-title">Instruction {instructionNumber}</h1>
                                            <section style={{ textAlign: "justify" }}>
                                                <p>
                                                    {instructionNumber === 1 && "Read Each Question Carefully: Take time to understand the question before selecting an answer."}
                                                    {instructionNumber === 2 && "Manage Your Time: You'll have a limited time to answer each question; keep an eye on the timer."}
                                                    {instructionNumber === 3 && "Answer or Skip: If uncertain, skip the question and come back to it later if time allows."}
                                                    {instructionNumber === 4 && "Submit Before Time Ends: Ensure to submit all answers before the time runs out."}
                                                </p>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <button className="btn btn-danger" onClick={closePopUp}>Good Luck</button>
                </div>
            )}
            {!showPopup && (
                <>
                    <h1 className="text-center">{language}</h1>
                    <div className="d-flex justify-content-center">
                        {questions.length > 0 && currentQuestionIndex < questions.length && (
                            <div key={questions[currentQuestionIndex].id} className="card">
                                <div className="card-body" style={{ padding: '2em' }}>
                                    <p>
                                        {remainingQuestions} of {questions.length}
                                    </p>
                                    <p>{timer}</p>
                                    <h5 className="card-title">{questions[currentQuestionIndex].question}</h5>
                                    <div>
                                        {['option1', 'option2', 'option3', 'option4'].map((optionKey) => (
                                            <button
                                                key={optionKey}
                                                className={`option ${selectedOptions[currentQuestionIndex] &&
                                                    selectedOptions[currentQuestionIndex].response ===
                                                    questions[currentQuestionIndex][optionKey]
                                                    ? 'selected'
                                                    : ''
                                                    }`}
                                                onClick={() =>
                                                    moveToNextQuestion(
                                                        questions[currentQuestionIndex][optionKey],
                                                        questions[currentQuestionIndex].id
                                                    )
                                                }
                                            >
                                                {questions[currentQuestionIndex][optionKey]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}

        </div>
    );
}

export default Question;