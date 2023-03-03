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

    const httpServer = http.createServer((req, res) => {
        console.log('uahuah')
        res.writeHead(200);
        res.end('hello world');
    });
    setupMaster(httpServer, {
        loadBalancingMethod: 'least-connection',
    });
    const port = Number(process.env.PORT) || 3333;
    httpServer.listen(port, '0.0.0.0', () => {
        console.log('Listening on port ', port);
    });
} else {
    console.log(`Worker ${process.pid} started`);

    import('./index');
}