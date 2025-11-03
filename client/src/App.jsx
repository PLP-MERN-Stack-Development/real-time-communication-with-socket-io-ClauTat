import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001"); // backend server URL

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>💬 Real-Time Chat</h1>
      <div style={{ margin: "20px auto", width: "300px", border: "1px solid #ccc", padding: "10px" }}>
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ padding: "5px", width: "200px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>Send</button>
      </form>
    </div>
  );
}

export default App;
