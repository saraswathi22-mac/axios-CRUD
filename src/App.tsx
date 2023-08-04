import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import { Loader } from "./components/Loader/Loader";
import { lazy, Suspense } from "react";

const App = () => {
  const Book = lazy(() => import("./pages/AddBook"));
  const User = lazy(() => import("./pages/User/AddUser"));
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Book />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
