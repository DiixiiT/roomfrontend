import { useNavigate } from "react-router-dom";

const LandingPage = () => {
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
    <div>
      <div className="h-screen flex flex-col items-center justify-center align-center px-24 text-center">
        <h1 className="text-6xl max-w-4xl leading-relaxed">
          Speak <span className="text-blue-500">freely</span>. Decide{" "}
          <span className="text-blue-500">quickly</span>.
        </h1>
        <h1 className="text-xl max-w-4xl leading-relaxed">
          Anonymous time-boxed group chat for honest collaboration. Candid
          feedback, trip planning, no pressure, just a private space for real
          talk.
        </h1>

        <button className="bg-black text-white rounded-full px-6 py-3 hover:bg-gray-800 transition-colors mt-8">
          Sign in with google to create room
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
