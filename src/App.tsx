import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import { Loader } from "./components/Loader/Loader";

import AddBook from "./pages/AddBook";
import AddUser from "./pages/User/AddUser";

const App = () => {
  return (
    <>
      <Loader showLoading />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AddBook />} />
          <Route path="/user" element={<AddUser />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
