import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../Context/AuthContext';
import python from "../Images/python.png";
import java from "../Images/java.png";
import csharp from "../Images/c-sharp.png";
import c from "../Images/c.png";
import cpp from "../Images/c++.png";
import php from "../Images/php.png";
import ruby from "../Images/ruby.png";
import html from "../Images/html.png"



function Language() {

  const navigate = useNavigate();
  const username = localStorage.getItem('user')

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate("/signin")
    }
  })
  const { logout } = useAuth();

  return (

    <div className="container" style={{ position: "relative" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className='mt-3' style={{ marginLeft: '10px' }}>{JSON.parse(username)}</h1>
        <Link className="btn btn-primary" to="/" onClick={logout} style={{ marginRight: '10px', marginTop: "1em", lineHeight: "2em" }}>Logout</Link>
      </div>

      <style>
        {`
       
        h1{
          color:white;
        }
          body {
            background-color: rgb(21, 25, 34);
          }

          .card {
            display:flex;
            align-items:center;
            justify-content:center;
            color: white;
            background-color:rgb(60, 71, 72);
            transition: ease-in 100ms;
            border-radius: 1em;
            height:250px;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px;
          }

          .card:hover {
            border: 1px solid #F5761A;
           background-color:rgb(51, 51, 51);
            
          }

          .card-link {
            text-decoration: none;
          }
          @media only screen and (min-width: 768px) and (max-width: 1024px){
          img{
            height:7em;
            width:7em;
          }
        .card{  
          height:10em
        }
          }
          
          @media only screen and (max-width: 767px){
            img{
              height:9em;
              width:9em;
            }
            .card{
              margin:auto;
              height:10em;
              width:20em;
            }
          }
        `}
      </style>
      <div className="row">
        <div className="col-md-3 mt-4">
          <Link to={`/category/python`} className="card-link">
            <motion.div
              className="card mb-3 box"
              style={{ opacity: 0, scale: 1 }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="card-body mt-3">
                <p>
                  <img loading="lazy" src={python} alt='python' height={200} width={200} />
                </p>
              </div>
            </motion.div>
          </Link>
        </div>





        <div className="col-md-3 mt-4">
          <Link to={`/category/java`} className="card-link">
            <motion.div
              className="card mb-3 box"
              style={{ opacity: 0, scale: 1 }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="card-body mt-3">
                <p>
                  <img loading="lazy" src={java} alt='python' height={200} width={200} />
                </p>
              </div>
            </motion.div>
          </Link>
        </div>


        <div className="col-md-3 mt-4">
          <Link to="/question/c" className="card-link">
            <motion.div
              className="card mb-3 box"
              style={{ opacity: 0, scale: 1 }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.9,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="card-body mt-3">
                <p>
                  <img loading="lazy" src={c} alt='python' height={200} width={200} />
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="col-md-3 mt-4">
          <Link to="/question/c-sharp" className="card-link">
            <motion.div
              className="card mb-3 box"
              style={{ opacity: 0, scale: 1 }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.3,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="card-body mt-3">
                <p>
                  <img loading="lazy" src={csharp} alt='c#' height={200} width={200} />
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="col-md-3 mt-4">
          <Link to="/question/cpp" className="card-link">
            <motion.div
              className="card mb-3 box"
              style={{ opacity: 0, scale: 1 }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.6,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="card-body mt-3">
                <p>
                  <img loading="lazy" src={cpp} alt='c++' height={200} width={200} />
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="col-md-3 mt-4">
          <Link to="/question/php" className="card-link">
            <motion.div
              className="card mb-3 box"
              style={{ opacity: 0, scale: 1 }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.9,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="card-body mt-3">
                <p>
                  <img loading="lazy" src={php} alt='php' height={200} width={210} />
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="col-md-3 mt-4">
          <Link to="/question/ruby" className="card-link">
            <motion.div
              className="card mb-3 box"
              style={{ opacity: 0, scale: 1 }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 2,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="card-body mt-3">
                <p >
                  <img loading="lazy" src={ruby} alt='python' height={200} width={200} />
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="col-md-3 mt-4">
          <Link to="/question/html" className="card-link">
            <motion.div
              className="card mb-2 box"
              style={{ opacity: 0, scale: 1 }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 2.3,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="card-body mt-3">
                <p>
                  <img loading="lazy" src={html} alt='python' height={200} width={200} />
                </p>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div >
  );
}

export default Language;