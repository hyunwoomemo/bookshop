import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { HambugerContext } from "./context/HambugerContext";
import React, { useState } from "react";
import AdminPage from "./pages/AdminPage";
import AddBook from "./pages/AddBook";
import AddAuthor from "./pages/AddAuthor";
import Sellingbook from "./pages/SellingBook";
import Test from "./pages/Test";

const App = () => {
  const [isHambuger, setIsHambuger] = useState(false);
  return (
    <HambugerContext.Provider value={{ isHambuger, setIsHambuger }}>
      <Router>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/addbook' element={<AddBook />} />
          <Route path='/addauthor' element={<AddAuthor />} />
          <Route path='/sellingBook' element={<Sellingbook />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </Router>
    </HambugerContext.Provider>

  );
}

export default App;
