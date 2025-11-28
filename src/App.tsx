import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Chat from "./page/chat";
import LandingPage from "./page/landingPage";
import Home from "./page/home";

const MyComponent = () => {
  // Use `useNavigate` to navigate programmatically in React Router v6+
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    // Simulating the backend call (replace with actual API call)
    const paramFromBackend = await fetchParamFromBackend();
    console.log("This should be after ", paramFromBackend);

    // Navigating to the new URL with the parameter
    if (paramFromBackend != undefined) navigate(`/room/${paramFromBackend}`);
  };

  // Simulating an API call
  const fetchParamFromBackend = async () => {
    // Example of fetching data from backend (replace with your actual logic)
    const response = await fetch("http://127.0.0.1:8000/room/", {
      method: "POST",
    });
    const data = await response.json();
    console.log("This should be before:", data); // This will log the fetched data
    return data.url;
  };

  return (
    <div style={{ width: "400px" }}>
      <button onClick={handleButtonClick}>Click me</button>
    </div>
  );
};

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/room/:param" element={<Chat />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
