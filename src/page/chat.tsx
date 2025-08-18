import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

function Chat() {
  const { param } = useParams();
  const [messages, setMessages] = useState([]); // State to store messages from WebSocket and previous messages
  const [messageInput, setMessageInput] = useState(""); // State to store input message
  const [ws, setWs] = useState<any>(null); // WebSocket connection instance
  const [roomName] = useState("general"); // Example room name to fetch previous messages
  const [name, setName] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const ROOM_ID = param;
  const bottomRef = useRef<HTMLDivElement>(null);
  // Fetch previous messages before connecting to WebSocket
  useEffect(() => {
    // Fetch previous messages from the backend
    fetch(`http://127.0.0.1:8000/room/${ROOM_ID}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.data.messages); // Set the fetched messages to the state
        setName(data.name);
        console.log("NAME : ", data);
        console.log("PARAM : ", param);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    // Once the previous messages are loaded, establish WebSocket connection
    const socket: any = new WebSocket(
      `ws://127.0.0.1:8000/ws/chatroom/${ROOM_ID}`,
    );
    setWs(socket); // Save WebSocket instance to state

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event: any) => {
      // Receive and display incoming messages
      const receivedData = event.data;
      console.log("REC : ", JSON.parse(receivedData));
      setMessages(
        (prevMessages: any) =>
          [...prevMessages, JSON.parse(receivedData)] as any,
      ); // Add received message to state
      console.log(messages);
    };

    socket.onerror = (error: any) => {
      console.log("WebSocket error: ", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, [roomName]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send a message to the WebSocket server
  const sendMessage = () => {
    console.log(ws);
    console.log(messageInput);
    if (ws && messageInput) {
      ws.send(
        JSON.stringify({ text: messageInput, user: name, room_id: ROOM_ID }),
      );
      setMessageInput(""); // Clear the input after sending the message
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission if inside a form
      sendMessage(); // Trigger send action
    }
  };

  const onEmojiClick = (emojiObject:any) =>{
    setMessageInput(prevInput => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  }

  return (
    <div className="flex h-screen bg-blue-50">
      <div className="first basis-1/4 hidden md:block"></div>
      <div className="second basis-full md:basis-1/2 bg-white flex flex-col">
        <div className="flex-grow overflow-auto no-scrollbar pl-3 pr-3 space-y-3">
          <div className="sticky top-0 bg-white mt-0 pt-0">
            <div className="p-3 border-b-2 border-gray-300">
              <h1>WebSocket Chat</h1>

              <h2>Previous Messages:</h2>
            </div>
          </div>
          <ul>
            {messages.map((message: any, index) => (
              <li key={index}>
                <div className="">
                  <h4 className="font-thin text-sm">{message.user}</h4>
                  <div className="inline-block mb-5 bg-blue-400 rounded-r-3xl rounded-bl-3xl">
                    <strong className="font-normal inline-block text-white p-4">
                      {message.text}
                    </strong>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div ref={bottomRef} />
        </div>

        <div className=" mt-auto m-3 flex items-center gap-2">
        {showEmojiPicker && (
        <div className="absolute mb-2 left-5 shadow-lg bottom-16">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
          <button
          onClick={() => setShowEmojiPicker(val => !val)}>
            <svg
              className="w-8 h-8 text-blue-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.495.93A.5.5 0 0 0 6.5 13c0 1.19.644 2.438 1.618 3.375C9.099 17.319 10.469 18 12 18c1.531 0 2.9-.681 3.882-1.625.974-.937 1.618-2.184 1.618-3.375a.5.5 0 0 0-.995-.07.764.764 0 0 1-.156.096c-.214.106-.554.208-1.006.295-.896.173-2.111.262-3.343.262-1.232 0-2.447-.09-3.343-.262-.452-.087-.792-.19-1.005-.295a.762.762 0 0 1-.157-.096ZM8.99 8a1 1 0 0 0 0 2H9a1 1 0 1 0 0-2h-.01Zm6 0a1 1 0 1 0 0 2H15a1 1 0 1 0 0-2h-.01Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Message"
            required
          />
          <div>
            <button
              onClick={sendMessage}
              type="submit"
              className="h-14 text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-6 h-6 text-black-800 transform rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="last basis-1/4 hidden md:block bg-blue-50"></div>
      
    </div>
  );
}

export default Chat;
