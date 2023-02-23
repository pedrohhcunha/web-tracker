import http from 'http';
import {Socket} from "socket.io";
import {Server} from 'socket.io';
import {Event} from "./interfaces/Event";
import {NewSession} from "./interfaces/NewSession";
import {connectMongoose} from "./config/mongoose";
import {
    addEventsToSession,
    createSession,
    finishSession,
} from "./repositories/session.repository";

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const handleConnection = (socket: Socket) => {
    const handleStartSession = async (newSession: NewSession) => {
        const createdSession = await createSession({
            ...newSession,
            id: socket.id,
        });

        console.log(`Session created: ${createdSession.id}`);

        socket.emit('session-created', createdSession);

        const handleEvents = async (events: Event[]) => {
            await addEventsToSession(createdSession.id, events);

            console.log(`${events.length} events added to session: ${createdSession.id}`);
        };

        const handleFinishSession = async () => {
            await finishSession(createdSession.id);
        };

        socket.on('events', handleEvents);

        socket.on('disconnect', handleFinishSession);

    };

    socket.on('start-session', handleStartSession);
};

io.on('connection', handleConnection);

server.listen(3000, async () => {
    console.log('Listening on port 3000');

    await connectMongoose();

    console.log('Connected to MongoDB');
});