import 'reflect-metadata'
import { getServer } from "./server";
import './container'
import cluster from 'cluster';

async function run() {
  const server = getServer();
  try {
    await server.ready();
    // server.swagger()
    const port = Number(process.env["PORT"] || 3000);
    server.listen({ port, host: "0.0.0.0" });
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
if (cluster.isPrimary) {
  const numWorkers = 4;

  console.log(`Master process ${process.pid} is running`);

  // Função para criar os workers
  const createWorkers = () => {
    for (let i = 0; i < numWorkers; i++) {
      cluster.fork();
    }
  };

  // Cria os workers inicialmente
  createWorkers();

  // Quando um worker morre, cria um novo
  cluster.on('exit', (worker) => {
    if (!worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died. Starting a new worker...`);
      cluster.fork(); // Inicia um novo worker
    }
  });

  // Captura o sinal de interrupção (Ctrl+C ou encerramento)
  process.on('SIGINT', () => {
    console.log('Master is shutting down. Terminating all workers...');
    // Envia um sinal de encerramento para todos os workers
    for (const id in cluster.workers) {
      cluster.workers[id]!.kill('SIGINT');
    }
    process.exit();
  });
} else {
  run();
}
