import React, { useState } from 'react';
import { io } from 'socket.io-client';

// Connect to your backend server (make sure it’s running on port 5000)
const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [registeredUser, setRegisteredUser] = useState(false);

  const handleRegister = () => {
    socket.emit('user_join', username); // 👈 sends username to server
    setRegisteredUser(true);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      {!registeredUser ? (
        <div>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter username"
            style={{ marginRight: '10px' }}
          />
          <button onClick={handleRegister}>Join Chat</button>
        </div>
      ) : (
        <h3>Welcome, {username}! 🎉 You’re in the chat.</h3>
      )}
    </div>
  );
}

export default App;
