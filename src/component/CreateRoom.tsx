import { useState } from "react";
import PopupForm from "./PopupForm";

function CreateRoom() {
  const [popupOpen, setPopupOpen] = useState(false);
  function x() {
    setPopupOpen(false);
  }
  return (
    <div className="container flex mt-20">
      <PopupForm isOpen={popupOpen} onClose={x}></PopupForm>
      <button
        type="button"
        onClick={() => setPopupOpen(true)}
        className="text-white bg-orange-400 hover:bg-orange-500  focus:ring-blue-300 font-bold text-lg rounded-lg m-1 w-80 h-16 px-5 py-2.5 me-2 mb-2"
      >
        + Create Room
      </button>
    </div>
  );
}

export default CreateRoom;
