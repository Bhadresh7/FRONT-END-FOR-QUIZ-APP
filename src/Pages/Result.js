import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';



function Result({ selectedOptions }) {
    const navigate = useNavigate();

    // Initialize state and retrieve from local storage if available
    const [validationResult, setValidationResult] = useState(() => {
        const savedResult = window.localStorage.getItem('result');
        return savedResult ? JSON.parse(savedResult) : null;
    });

    // Save to local storage whenever validationResult changes
    useEffect(() => {
        if (validationResult) {
            window.localStorage.setItem('result', JSON.stringify(validationResult));
        }
    }, [validationResult]);

    useEffect(() => {
        const validateOptions = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8080/api/Quiz/getScore',
                    selectedOptions
                );
                console.log(response);
                const resultData = response.data;
                console.log('API response:', resultData); // Log the API response
                if (resultData) {
                    setValidationResult(resultData);
                }
            } catch (error) {
                console.log('API error:', error); // Log any API errors
            }
        };

        return () => validateOptions(); // Call the function

    }, [selectedOptions]);

    const quiz = () => {
        navigate('/language'); // Navigate to the new quiz page
    };
    return (
        <div className="container">
            {/* {selectedOptions > 3 && <Confetti/>} */}
            <Confetti />
            <div className="card col-5" style={{ margin: "auto", marginTop: "12em" }}>
                <div className="card-body" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {validationResult !== null ? (
                        <div>
                            <svg style={{ height: "10em" }} enable-background="new 0 0 501.551 501.551" viewBox="0 0 501.551 501.551" xmlns="http://www.w3.org/2000/svg"><path d="m296.751 412.735h-91.951l15.673-33.437 13.584-31.347h33.437l13.584 31.347z" fill="#ff7058" /><path d="m355.265 412.735h-208.98c-11.494 0-20.898 9.404-20.898 20.898v67.918h249.731v-67.918c1.045-11.494-8.359-20.898-19.853-20.898z" fill="#ffd15c" /><path d="m281.078 379.298c-8.359 4.18-16.718 8.359-25.078 11.494l-5.224 1.045-5.225-2.09c-8.359-3.135-16.718-7.314-25.078-11.494l13.584-31.347h32.392z" fill="#f1543f" /><path d="m0 57.469v42.841c0 104.49 64.784 194.351 155.69 231.968 29.257 12.539 61.649 18.808 95.086 18.808s65.829-6.269 95.086-18.808c90.906-37.616 155.69-127.478 155.69-231.967v-42.842zm459.755 42.841c0 50.155-17.763 96.131-48.065 132.702-38.661 45.975-96.131 76.278-160.914 76.278s-122.253-29.257-160.914-76.278c-29.257-35.527-48.065-82.547-48.065-132.702v-1.045h416.913v1.045z" fill="#f8b64c" /><path d="m413.78 0h-326.009c-7.314 0-12.539 6.269-12.539 12.539 0 7.314 5.224 13.584 12.539 13.584h326.009c7.314 0 12.539-6.269 12.539-12.539-.001-7.315-5.225-13.584-12.539-13.584z" fill="#f8b64c" /><path d="m413.78 26.122v112.849c0 104.49-64.784 199.576-163.004 237.192-98.22-38.661-163.004-132.702-163.004-238.237v-111.804z" fill="#ffd15c" /><path d="m250.776 73.143 21.942 66.873h70.009l-56.425 41.796 20.898 66.874-56.424-41.796-56.425 41.796 20.898-66.874-56.425-41.796h70.009z" fill="#fff" /><path d="m87.771 26.122h324.963v15.673h-324.963z" fill="#ffc952" /></svg>
                            <p className="card-text" style={{ fontSize: '2em', display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {validationResult}
                            </p>
                            <div className='button' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <button className="btn btn-primary" onClick={quiz}>
                                    New Quiz
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="card-text">Validating...</p>
                    )}
                </div>
            </div>
           
        </div >
    );
}

export default Result;