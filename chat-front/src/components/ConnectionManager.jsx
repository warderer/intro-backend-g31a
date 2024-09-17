import { socket } from '../socket';

const ConnectionManager = () => {
  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  return (
    <div>
      <button onClick={connect}>Conectar</button>
      <button onClick={disconnect}>Desconectar</button>
    </div>
  );
};

export default ConnectionManager;
