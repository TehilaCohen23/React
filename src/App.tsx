import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import About from "./components/About";
import Business from "./components/Business";
import NotFoundPage from "./components/NotFoundPage";
import MyCards from "./components/MyCards";
import AllCards from "./components/AllCards";
import NewCard from "./components/NewCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import Home from "./components/home";
import UpdateCard from "./components/UpdateCard";

export let userConnected = createContext(false);

function App() {
  let [isLogin, setIsLogin] = useState<boolean>(false);
  let [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  let [isBusinessUser, setIsBusinessUser] = useState<boolean>(false);
  let [cardId, setCardId] = useState<number>();

  useEffect(() => {
    setIsLoggedIn(isLoggedIn);
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
  });

  //check if user is connected
  useEffect(() => {
    if (sessionStorage.getItem("IsLogin")) {
      setIsLogin(true);
      localStorage.setItem("isLoggedIn", String(true));
      setIsLoggedIn(true);
      businessUser();
    }
  });

  function businessUser() {
    if (isLoggedIn) {
      let res = JSON.parse(sessionStorage.getItem("IsLogin") as string);
      let info = res.isBusiness;

      if (info) {
        setIsBusinessUser(true);
      }
    }
  }

  return (
    <div className="App">
      <Router>
        <userConnected.Provider value={isLogin}>
          <Navbar
            isLogin={isLogin}
            isLoggedIn={isLoggedIn}
            isBusinessUser={isBusinessUser}
            setIsBusinessUser={setIsBusinessUser}
          />
        </userConnected.Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn setIsLogin={setIsLogin} />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/business-sign-up" element={<Business />} />
          <Route
            path="/myCards"
            element={<MyCards cardId={Number(cardId)} setCardId={setCardId} />}
          />
          <Route path="/allCards" element={<AllCards />} />
          <Route path="/newCard" element={<NewCard />} />
          <Route
            path="/updateCard"
            element={<UpdateCard cardId={Number(cardId)} />}
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
