import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");

  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);
  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date: new Date().getHours() + ":" + new Date().getMinutes(),
    };
    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };
  console.log("messageList", messageList);
  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="rounded-md w-full max-w-md lg:max-w-lg xl:max-w-xl h-[500px] md:h-[550px] lg:h-[600px] bg-white relative shadow-lg">
        <div className="rounded-t-md w-full h-16 bg-gray-700 flex items-center p-2">
          <div
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
              username.toLowerCase().includes("ayşe") ||
              username.toLowerCase().includes("fatma") ||
              username.toLowerCase().includes("kadın") ||
              username.toLowerCase().includes("female")
                ? "bg-pink-100 border-2 border-pink-300"
                : "bg-blue-100 border-2 border-blue-300"
            }`}
          >
            <span
              className={`font-bold text-sm md:text-base ${
                username.toLowerCase().includes("ayşe") ||
                username.toLowerCase().includes("neval") ||
                username.toLowerCase().includes("kadın") ||
                username.toLowerCase().includes("female")
                  ? "text-pink-600"
                  : "text-blue-600"
              }`}
            >
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-3 text-white">
            <div className="font-bold text-sm md:text-base">{username}</div>
            <div className="text-xs md:text-sm">Oda: {room}</div>
          </div>
        </div>
        <div className="w-full h-[300px] md:h-[350px] lg:h-[400px] overflow-y-auto p-1">
          {messageList &&
            messageList.map((msg, i) => (
              <div
                key={`message-${i}`}
                className={`${
                  username === msg.username ? "flex justify-end" : ""
                }`}
              >
                <div
                  className={`${
                    username === msg.username ? "bg-green-600" : "bg-blue-600"
                  } w-4/5 md:w-2/3 h-auto min-h-[40px] p-2 text-white m-2 rounded-xl ${
                    username === msg.username
                      ? "rounded-br-none"
                      : "rounded-bl-none"
                  }`}
                >
                  <div className="text-sm md:text-base break-words">
                    {msg.message}
                  </div>
                  <div className="w-full flex justify-end text-xs mt-1">
                    {msg.username}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full flex">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-bl-md w-3/4 h-12 border p-3 outline-none text-sm md:text-base"
            type="text"
            placeholder="Mesajınızı yazın..."
          />
          <button
            onClick={sendMessage}
            className="rounded-br-md bg-indigo-500 text-white h-12 hover:opacity-70 w-1/4 text-sm md:text-base font-medium"
          >
            GÖNDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
