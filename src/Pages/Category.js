import React from 'react';
import { Link, useParams } from 'react-router-dom'


function Category() {
    const { language } = useParams();


   



    return (
        <>
            <style>
                {`
            
            .card-container {
                display: flex;
                justify-content: space-around;
            }
            
            .card-link {
                text-decoration: none;
                color: inherit;
            }
            
            body {
                background-color: rgb(21, 25, 34);
            }
            
            .card {
                width: 20em;
                height: 20em;
                margin: 10px;
                background-color:rgb(60, 71, 72);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 5em;
                color: white;
                box-shadow: box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
            }
            
            .card-body {
                font-size: 2em;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .card:hover {
                border: 1px solid #F5761A;
                background-color: rgb(51, 51, 51);
            
            }
            
            p{
                font-size: 2em;
                color: white;
                text-align: center;
                margin-top: 1em;
            }
           .span{
            filter:blur(2px)
           }
          
            `}
            </style>
            <p>Select Category</p>
            <div className='card-container'>

                <Link to={`/question/${language}/beginner`} className='card-link card' >
                    <div className='card-body'>Beginner</div>
                </Link>


                <Link to={`/question/${language}/intermediate`} className='card-link card ' >
                    <div className='card-body '>
                        Intermediate
                    </div>
                </Link>

                <Link to={`/question/${language}/advanced`} className='card-link card ' >
                    <div className='card-body '>
                        Advanced
                    </div>
                </Link>



            </div>

        </>
    )
}

export default Category