// Relies on REACT_APP_Q_SERVER in .env to find the live server for connections
const io = require('socket.io-client');
const socket = io.connect(process.env.REACT_APP_API);

const useSocket = () => {

  const subscribe = (event, callback) => socket.on(event, callback);

  const publish = (event, payload) => socket.emit(event, payload);

  return [publish, subscribe];
};

export default useSocket;
