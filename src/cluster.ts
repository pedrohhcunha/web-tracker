// https://github.com/socketio/socket.io/blob/7467216e024e4a5c99f23775c31b7041ca180560/examples/private-messaging/server/index.js
import cluster from 'cluster';
import http from 'http';
import { setupMaster } from '@socket.io/sticky';
import { cpus } from "os";
import {config} from "dotenv";

const numCPUs = cpus().length;

config();

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);

        cluster.fork();
    });

    const httpServer = http.createServer();
    setupMaster(httpServer, {
        loadBalancingMethod: 'least-connection',
    });

    httpServer.listen(3333, () => {
        console.log('Listening on port 3333');
    });
} else {
    console.log(`Worker ${process.pid} started`);

    import('./index');
}