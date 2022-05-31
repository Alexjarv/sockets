import React, { useEffect, useState } from 'react';
import { Input, Button, Icon, CheckCircleIcon, lightScheme } from "@vechaiui/react";

function Chat({socket, username, room}) {
    
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async (e) =>{
        e.preventDefault();
        if(message !== ""){
          const messageData = {
              room : room,
              author : username,
              message : message,
              time : new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getSeconds()
          };
          setMessage('');
          setMessageList( (list) => [...list, messageData]);
          await socket.emit('send_message', messageData);
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList( (list) => [...list, data]);
        })
    }, [socket]);

    return (
            <div className='chat-container flex items-center justify-center mt-4'>
                <div className="w-96 rounded-lg flex flex-col h-full border border-b-0 rounded-t-lg shadow-sm border-neutral-200 dark:border-neutral-700">
                    <div className="chat-header flex items-center p-4 h-8 pl-2 rounded-t-lg bg-neutral-200 dark:bg-neutral-700">
                        <div className="text-smm font-bold">Live chat</div>
                    </div>
                    <div className="chat-body flex p-4 pl-2 rounded-t-lg bg-neutral-200 dark:text-neutral-700">
                        <div className="text-smm w-full">
                            {messageList.map( (messageContent) => {
                                return (
                                <div className={ messageContent.author === 'system' ? "message-container message-system" : 'message-container'} key={messageContent.time} id={ username === messageContent.author ? "your" : 'other'}>
                                    <div className='message'>
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className='message-info'>
                                        <p className='message-time'>{messageContent.time}</p>
                                        { messageContent.author !== 'system' && <p>{messageContent.author}</p> }
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="chat-footer flex items-center h-8 pl-2 rounded-t-lg bg-neutral-200 dark:text-neutral-700"> 
                            <Input variant="solid" className='rounded-none' color="primary" type="text" name="message" value={message} 
                                onChange={(event) => {
                                    setMessage(event.target.value)
                                }}
                            />
                            <Button variant="solid" className='rounded-none' onClick={sendMessage}>
                                <Icon as={CheckCircleIcon} label="info" className="w-6 h-6 text-blue-500" />
                            </Button>
                    </div>
                </div>
            </div>
    )
}

export default Chat