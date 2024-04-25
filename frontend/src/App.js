import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/SingleNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { useState } from "react";

function App() {
  // const [search, setSearch] = useState(""); setSearch={(s) => setSearch(s)}
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/mynotes" element={<MyNotes />} />
            <Route path="/createnote" element={<CreateNote />} />;
            <Route path="/note/:id" element={<SingleNote />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
