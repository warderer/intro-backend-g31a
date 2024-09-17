import { socket } from '../socket';

import ConnectionState from './ConnectionState';
import ConnectionManager from './ConnectionManager';
import Events from './Events';
import Form from './Form';
import { useEffect, useState } from 'react';

const Chat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessage = (message) => {
      setEvents((prevEvents) => [
        ...prevEvents,
        `${message.user}: ${message.text}`,
      ]);
    };
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage);
    };
  }, []);

  return (
    <div>
      <ConnectionState isConnected={isConnected} />
      <Events events={events} />
      <ConnectionManager />
      <Form />
    </div>
  );
};

export default Chat;
