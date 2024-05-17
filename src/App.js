import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import "./App.css";



const Home = lazy(() => import("./Pages/Home.js"))
const Login = lazy(() => import("./Pages/Login.js"))
const Signin = lazy(() => import("./Pages/Signin.js"))
const Language = lazy(() => import("./Pages/Language.js"))
const Question = lazy(() => import("./Pages/Question.js"))
const Result = lazy(() => import("./Pages/Result.js"))
const Error = lazy(() => import("./Pages/Error.js"))
const Category = lazy(() => import("./Pages/Category.js"))
function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);// State for selected options and IDs


  return (


    <div className="App">
      <Suspense fallback="Loading....">
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
            <Route path="/language" element={<Language />} />
            <Route path="/category/:language" element={<Category />} />
            <Route path="/question/:language/:category" element={<Question setSelectedOptions={setSelectedOptions}
              selectedOptions={selectedOptions} />} />
            <Route path="/result" element={<Result selectedOptions={selectedOptions} />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </Suspense>
    </div >


  );
}

export default App;