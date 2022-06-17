import { useState, useEffect } from 'react';
import Head from "next/head";
import Pusher from 'pusher-js';
import {
    addNewMessage
  } from "../utils/persistData";

export default function Chat() {
 const [username, setUsername] = useState("");
 const [message, setMessage] = useState("");
 const [messages, setMessages] = useState([]);
    
 useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('ABCDEFG', {
        cluster: 'mt1',
        wsHost: '127.0.0.1',
        wsPort: '6001',
        encrypted:false,
        enabledTransports: ['ws'],
        forceTLS: false
    });
    
    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
        setMessages([...messages, data]);
    });
 }, [message]);

 const handleSubmit = async (e) => {
    e.preventDefault();

    await addNewMessage({username, message});
    setMessage("");
 }

  return (
    <>
      <Head>
        <title>Helptask - Minhas Tarefas</title>
        <meta name="description" content="Helptask - Página Incial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div>
            <h1>Testing Web Socket</h1>
            <br/>
            <input type="text" placeholder="Digite seu nome" style={{ border: "1px solid #ccc"}} value={username} onChange={ e => setUsername(e.target.value)} />
            <input type="text" placeholder="Digite a mensagem" style={{ border: "1px solid #ccc"}} value={message} onChange={ e => setMessage(e.target.value)} />
            <br/>
            <br/>
            <ul>
                {messages.map((message, index) => (
                    <div key={index}>
                        <span key={index}>user: {message.username}</span>
                        <li >message: {message.message}</li>
                        <hr style={{ border: "1px solid #ccc"}}/>
                    </div>
                ))}
            </ul>
            <br/>
            
            <form onSubmit={handleSubmit}>
                <input type="submit" value="Enviar" />
            </form>
        </div>
    </>
  );
}