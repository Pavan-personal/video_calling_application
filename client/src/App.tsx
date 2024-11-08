import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useSocket } from "./Providers/ScoketProvider";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const socket = useSocket();
  const [data, setData] = useState({
    email: "",
    room: "",
  });

  const [isJoined, setIsJoined] = useState(false);

  const [users, setUsers] = useState([]);

  const handleClick = useCallback(() => {
    socket?.emit("room:join", data);
    // toast.success("You have joined the room");
  }, [data]);

  const handleUserJoined = useCallback((data: any) => {
    toast.success(`${data.email} has joined the room`);
  }, []);

  const handleUsersInRoom = useCallback((data: any) => {
    setUsers(data.otherUsers);
    console.log("The users in the room: ", data);
  }, []);

  const handleSelfJoin = useCallback((data: any) => {
    setIsJoined(true);
  }, []);

  useEffect(() => {
    socket?.on("room:join", (data) => {
      handleSelfJoin(data);
    });
    socket?.on("user:joined", (data) => {
      handleUserJoined(data);
    });
    socket?.on("room:users", (data) => {
      handleUsersInRoom(data);
    });
  }, [socket, handleUserJoined, handleUsersInRoom, handleSelfJoin]);

  return (
    <>
      <div className="text-4xl">Welcome</div>
      <div>
        <input
          type="text"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Room"
          value={data.room}
          onChange={(e) => setData({ ...data, room: e.target.value })}
        />
        <button onClick={handleClick}>Join Room</button>
      </div>
      {isJoined && (
        <div>
          <h1>Users in the room</h1>
          <ul>
            {users.map((user: any) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
          {users?.length === 0 && <p>No users in the room</p>}
        </div>
      )}
      <Toaster />
    </>
  );
}

export default App;
