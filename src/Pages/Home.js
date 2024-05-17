import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();



  const next = () => {
    navigate("/language");
  };

  const overlayStyle = {
    position: "relative",
    width: "100%",
    height: "100vh",
    backgroundColor: "rgb( 21, 25, 34)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const containerStyle = {
    textAlign: "center",
  };

  const welcomeMessageStyle = {
    opacity: 0,
    scale: 1,
    color: 'white',
  };

  const buttonStyle = {
    opacity: 0,
    scale: 1,
  };

  return (
    <div id="home">

      <div className="overlay" style={overlayStyle}>
        <div style={containerStyle}>
          <motion.h1
            style={welcomeMessageStyle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Welcome test your knowledge
          </motion.h1>

          <motion.button
            className='btn btn-primary mt-5 btn-style'
            style={buttonStyle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={next}
          >
            Start
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Home;
