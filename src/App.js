import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import CurrentRate from "./components/CurrentRate/CurrentRate";
import Converter from "./components/Converter/Converter";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/current" element={<CurrentRate />} />
        <Route path="/converter" element={<Converter />} />
      </Routes>
    </div>
  );
}

export default App;
