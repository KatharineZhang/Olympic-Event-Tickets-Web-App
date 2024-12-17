import express, { Express } from "express";
import { refreshPage, createEvent, getSportEvents, buyTickets, getEventDetails, retrieveSportsList } from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());

app.get("/api/refresh", refreshPage);  
app.get('/api/getSportEvents', getSportEvents);
app.get('/api/getEventDets', getEventDetails);
app.get("/api/retrieveSportsList", retrieveSportsList);

app.post('/api/create', createEvent);  
app.post('/api/buyTickets', buyTickets);

app.listen(port, () => console.log(`Server listening on ${port}`));
