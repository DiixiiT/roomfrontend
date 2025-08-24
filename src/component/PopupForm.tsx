import React, { useState } from "react";
import UrlPopup from "./UrlPopup";

type PopupFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PopupForm: React.FC<PopupFormProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ title: "", desc: "" });
  const [urlOpen, setUrlOpen] = useState(false);
  const [url, setURL] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission logic
    const paramFromBackend = await fetchParamFromBackend();

    // Navigating to the new URL with the parameter
    if (paramFromBackend != undefined) {
      setUrlOpen(true);
      setURL(`/room/${paramFromBackend}`);
    }
  };

  const UrlPopupClose = () => {
    setUrlOpen(false);
    onClose();
  };

  const fetchParamFromBackend = async () => {
    console.log("Form.....", form);
    const response = await fetch("http://127.0.0.1:8000/room/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ title: form.title, desc: form.desc }),
    });
    const data = await response.json();
    console.log("This should be before:", data); // This will log the fetched data
    return data.url;
  };

  if (!isOpen) return null;
  if (urlOpen)
    return (
      <UrlPopup url={url} isOpen={urlOpen} onClose={UrlPopupClose}></UrlPopup>
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-lg p-8 min-w-[300px] relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          ✕
        </button>
        <h2 className="mb-5 text-lg font-bold">Create Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">
              Title of Discussion<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Discription</label>
            <input
              type="text"
              name="desc"
              value={form.desc}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-400 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
