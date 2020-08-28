# compile socket.io server typescript
cd server
tsc

# run socket.io server and react-scripts app concurrently
cd ..
concurrently "node server/socketio-server.js" "npm start"
