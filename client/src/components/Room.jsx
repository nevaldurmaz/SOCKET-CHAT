import React from "react";

const Room = ({
  username,
  room,
  setUsername,
  setRoom,
  setChatScreen,
  socket,
}) => {
  const sendRoom = () => {
    if (username !== "" && room !== "") {
      // ✅ "join_room" event'i gönderin ve username + room bilgisini birlikte gönderin
      socket.emit("join_room", {
        username: username,
        room: room,
      });
      setChatScreen(true);
    } else {
      alert("Lütfen kullanıcı adı ve oda bilgisi girin!");
    }
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[320px] rounded-lg bg-indigo-600 flex flex-col space-y-4 p-3">
        <h1 className="text-center my-4 font-bold text-2xl">Welcome to Chat</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-12 rounded-xl p-3 outline-none"
          type="text"
          placeholder="Username"
        />
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="h-12 rounded-xl p-3 outline-none"
          type="text"
          placeholder="Room"
        />
        <div
          onClick={sendRoom}
          className="tracking-wider bg-indigo-900 text-white cursor-pointer hover:opacity-70 h-12 pt-2 text-xl text-center rounded-xl"
        >
          CHAT!!
        </div>
      </div>
    </div>
  );
};

export default Room;
