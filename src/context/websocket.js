
let socket = null;

function initializeWebSocket() {
  socket = new WebSocket('ws://localhost:5000'); // Replace with your WebSocket server URL

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return socket;
}

function getWebSocket() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    initializeWebSocket();
  }
  return socket;
}

export { initializeWebSocket, getWebSocket };