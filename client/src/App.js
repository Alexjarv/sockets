import './App.css';
import io from 'socket.io-client';
import Chat from './components/Chat';
import { useState } from 'react';
import { Button, Input, FormLabel, FormControl, FormHelperText } from "@vechaiui/react";


const socket = io.connect('http://192.168.1.156:3001');

function App() {
  
  const [username, setUsername] = useState('');
  const [room] = useState('1');
  const [showChat, setShowChat] = useState(false);

  function joinRoom(){
    if(username !== ""){
      const data = {
          room : '1',
          username : username
      };
      socket.emit("join_room", data);
      setShowChat(true);
    }
  }

  return (
    
      <div className="App">

        <h1 className="p-4 text-lg">Sockets</h1>
        <hr/>


        {!showChat ? 
            <div className="chat-login mx-auto w-96 my-4 max-w-xs p-8 space-x-4">
              <h3 className='text-md'>Join a chat</h3>
              <FormControl id="username">
                  <FormLabel>
                    Username
                  </FormLabel>
                  <Input type="text" placeholder="Alex..." onChange={(event) => { setUsername(event.target.value) }} />
                  <FormHelperText>Keep it simple.</FormHelperText>
              </FormControl>

              
              {/* <FormControl id="room">
                  <FormLabel>
                    Chat ID
                  </FormLabel>
                  <Input type="text" placeholder="Chat ID..." onChange={(event) => { setRoom(event.target.value) }} />
                  <FormHelperText>Chat ID is numbers and characters.</FormHelperText>
              </FormControl> */}
              
              <Button onClick={joinRoom} type="submit" variant="solid" color="primary" className='m-2'>Join</Button>
            </div>
          :
            <Chat socket={socket} username={username} room={room}/>
          }
      </div>
  );
}

export default App;
