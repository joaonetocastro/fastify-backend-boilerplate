import path from "path";
import winston from "winston";
import LokiTransport from 'winston-loki'

const transports: winston.transport[] = []

const lokiTransportUrl = process.env['LOKI_TRANSPORT_URL']
const appName = process.env['APP_NAME'] || 'core-bank-api'

if (lokiTransportUrl) {
  transports.push(new LokiTransport({
    host: lokiTransportUrl,
    labels: { app: appName },
  }))
} else {
  const getCurrentDate = () => {
    const date = new Date();
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  transports.push(new winston.transports.File({ filename: `${getCurrentDate()}.log`, dirname: path.join(__dirname, '../../logs/') }))
}

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "core-bank-api" },
  transports: transports,
});
