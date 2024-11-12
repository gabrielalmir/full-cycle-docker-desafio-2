import cluster from 'cluster';
import os from 'os';

function runPrimaryProcess() {
    const cpus = os.cpus().length;
    console.log(`Forking ${cpus} worker processes on ${process.pid}`);

    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.process.pid} crashed. Starting a new worker...`);
            setTimeout(() => cluster.fork(), Math.random() * 1000);
        }
    });
}

async function runWorkerProcess() {
    await import('./main.js');
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
