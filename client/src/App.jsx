import { Route, Routes } from "react-router-dom";
import CoursesPage from "./conponents/CoursesPage";
import axios from "axios";
import CoursePage from "./conponents/CoursePage";
import Layout from "./Layout";
import CreateCourse from "./conponents/CreateCourse";
import "./index.css";
axios.defaults.baseURL = "http://localhost:3000";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/:slug" element={<CoursePage />} />
        <Route path="/" element={<CoursesPage />} />
        <Route path="/create" element={<CreateCourse />} />
      </Route>
    </Routes>
  );
}

export default App;
