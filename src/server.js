import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';

const app = express();
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);
const handleListen = () => console.log('Listening on http://localhost:3000');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

httpServer.listen(3000, handleListen);
wsServer.on('connection', (socket) => {
  socket.on('enter_room', (roomName) => console.log(roomName));
});
