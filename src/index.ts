import {config} from 'dotenv';
import http from 'http';
import {Socket} from "socket.io";
import {Server} from 'socket.io';
import {Event} from "./interfaces/Event";
import {NewSession} from "./interfaces/NewSession";
import {
    addEventsToSession,
    createSession,
    finishSession,
} from "./repositories/session.repository";
import {setupWorker} from "@socket.io/sticky";
import {connectMongoose} from "./config/mongoose";

config();

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

const handleConnection = (socket: Socket) => {
    console.log(`Connection established on worker: ${process.pid}`);
    const handleStartSession = async (newSession: NewSession) => {
        console.log('Starting session...');

        const createdSession = await createSession({
            ...newSession,
            socketId: socket.id,
        });

        console.log(`Session created: ${createdSession.socketId}`);

        socket.emit('session-created', createdSession);

        const handleEvents = async (events: Event[]) => {
            await addEventsToSession(createdSession.socketId, events);

            console.log(`${events.length} events added to session: ${createdSession.socketId}`);
        };

        const handleFinishSession = async () => {
            await finishSession(createdSession.socketId);

            console.log(`Session finished: ${createdSession.socketId}`)
        };

        socket.on('events', handleEvents);

        socket.on('disconnect', handleFinishSession);

    };

    socket.on('start-session', handleStartSession);
};

(async () => {
    await connectMongoose();

    io.on('connection', handleConnection);

    setupWorker(io);
})();