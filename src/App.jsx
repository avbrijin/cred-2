import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import { useState } from "react";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </>
  );
}

export default App;
