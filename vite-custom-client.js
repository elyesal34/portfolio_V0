// Custom Vite client with improved WebSocket handling
(function () {
  const socketProtocol = location.protocol === 'https:' ? 'wss' : 'ws';
  const socketUrl = `${socketProtocol}://${location.hostname}:3001/`;
  
  console.log('[Vite] Connecting to WebSocket at', socketUrl);
  
  let socket = null;
  let isFirstConnect = true;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 20;
  const baseReconnectDelay = 1000;
  let reconnectTimeout = null;
  
  function cleanup() {
    if (socket) {
      socket.onopen = null;
      socket.onclose = null;
      socket.onerror = null;
      socket.onmessage = null;
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    }
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  }

  function connect() {
    cleanup();
    
    socket = new WebSocket(socketUrl);
    
    socket.onopen = () => {
      console.log('[Vite] WebSocket connected');
      reconnectAttempts = 0;
      if (isFirstConnect) {
        isFirstConnect = false;
        window.dispatchEvent(new Event('vite:connect'));
      } else {
        window.dispatchEvent(new Event('vite:reconnect'));
      }
    };
    
    socket.onclose = (e) => {
      console.log('[Vite] WebSocket closed:', e.reason);
      if (reconnectAttempts < maxReconnectAttempts) {
        const delay = Math.min(baseReconnectDelay * Math.pow(2, reconnectAttempts), 10000);
        console.log(`[Vite] Attempting to reconnect in ${delay}ms...`);
        setTimeout(connect, delay);
        reconnectAttempts++;
      } else {
        console.error('[Vite] Max reconnection attempts reached');
      }
    };
    
    socket.onerror = (e) => {
      console.error('[Vite] WebSocket error:', e);
    };
    
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'full-reload') {
        console.log('[Vite] Full reload triggered');
        window.location.reload();
      }
    };
  }
  
  // Initial connection
  connect();
  
  // Export for HMR updates
  window.__vite_plugin_react_preamble_installed__ = true;
})();
