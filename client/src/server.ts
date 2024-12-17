//import { sortEvents, topThreeEvents, getSportEvents, getSportsList } from './events';
import { isRecord } from './record';

export type Event = {name: string, 
    sport: string, 
    description: string, 
    date: number, 
    venue: string,
    maxTickets: number,
    ticketsSold: number,
    ticketsLeft: number };



const DEBUG : boolean = true;








// -----------------------REFRESH PAGE --------------------------------------------

export type refreshCallback = (sorted: Event[], top3: Event[], allSports: string[]) => void;

/** Refreshes the "Olympic Event List" page
 * passes 4 lists: 1 Event[] sorted by date, and 1 Event[] sorted 
 *                  by num tickets (and includes top 3 only)
 *                  as well as a Map containing all the events and its details
 *                  a list of all sports
 * @param cb: callback that accepts 2 Event[], one containing all
 *             events sorted by date, and other are the top 3 tickets sold
 *            as well as a Map containing all the events and its details
 * a list of all sports
 */
export const refreshPage = (cb: refreshCallback): void => {
    if (DEBUG) console.log("ENTERED refreshPage called (server.ts)");
    
    fetch("/api/refresh")
    .then((res) => refreshPageResp(res, cb))
    .catch(() => refreshPageError("failed to connect to server"));
};

  const refreshPageResp = (res: Response, cb: refreshCallback): void => {
    if (DEBUG) console.log("ENTERED refreshPageResp called (server.ts)");
  
    if (res.status === 200) {
      res.json().then((val) => refreshPageJson(val, cb))
        .catch(() => refreshPageError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(refreshPageError)
        .catch(() => refreshPageError("400 response is not text"));
    } else {
        refreshPageError(`bad status code: ${res.status}`);
    }
  };
  
  // Called when the refresh response JSON has been parsed and calls the
  // callback function to refresh the page
  const refreshPageJson = (val: unknown, cb: refreshCallback): void => {
    if (DEBUG) console.log("ENTERED refreshPageJson called (server.ts)");


  
    if (!isRecord(val) || !Array.isArray(val.sorted) || 
    !Array.isArray(val.top3) ||
    !Array.isArray(val.allSports)) {
      console.error('Invalid JSONs from /refresh');
      return;
    }
  
    cb(val.sorted, val.top3, val.allSports);
  };
  
  // Called if an error occurs trying to refresh the page
  const refreshPageError = (msg: string): void => {
    if (DEBUG) console.log("ENTERED refreshPageError called (server.ts)");
  
    console.error(`Error fetching /api/refresh: ${msg}`);
  };










  // ---------------------- CREATE EVENT -------------------------------

  export type createCallBack = (eventName: string, saved: boolean) => void;

  /** creates a new event
   * @param eventName: the name of the new event
   * @param sport: the sport of the new event
   * @param description: the description of the new event
   * @param date: the date of the new event
   * @param venue: the venue of the new venue
   * @param maxTickets: the number of tickets for the new event
   * @param cb: the callback function with 2 parameters (eventName: string, saved: boolean)
 */
  export const createEvent = (eventName: string, sport: string, description: string,
    date: number, venue: string, maxTickets: number, cb: createCallBack): void => {
    if (DEBUG) {
        console.log("ENTERED: createEvent (server.ts)");
    }

    const bodyParams = {eventName: eventName,
                        sport: sport, 
                        descrp: description, 
                        date: date, 
                        venue: venue, 
                        maxTickets: maxTickets};

    if(DEBUG) console.log(JSON.stringify(bodyParams));

    // pass in entire event details as all its fields, then initalize event in server
    fetch('/api/create', {method: 'POST', body: JSON.stringify(bodyParams),
        headers: {'Content-Type': 'application/json'}})
      .then((res) => doCreateEventResp(res, cb))
      .catch(() => doCreateEventError("failed to connect to server"));
  };

  // handles the server response for creating an event
  const doCreateEventResp = (res: Response, cb: createCallBack): void => {
    if (DEBUG) console.log("ENTERED doCreateEventResp called (server.ts)");
  
    if (res.status === 200) {
      if (DEBUG) console.log("status 200 in doCreateEventResp");
      res.json().then((val) => doCreateEventJson(val, cb))
        .catch(() => doCreateEventError("200 response is not JSON"));
    } else if (res.status === 400) {
      if (DEBUG) console.log("status 400 in doCreateEventResp");
      res.text().then(doCreateEventError)
        .catch(() => doCreateEventError("400 response is not text"));
    } else {
      if (DEBUG) console.log("status else case in doCreateEventResp");
      doCreateEventError(`bad status code: ${res.status}`);
    }
  };
  
  // calls teh call back function to confirm event has been created in client
  const doCreateEventJson = (val: unknown, cb: createCallBack): void => {
    if (DEBUG) console.log("ENTERED doCreateEventJson");
    
    if (!isRecord(val) || typeof val.saved !== 'boolean' || typeof val.eventName !== 'string') {
      if (DEBUG) console.log("if val.saved != boolean and val.eventName !== string (doCreateEventJson)");
  
      console.error('Invalid JSON from /api/create', val);
      return;
    }
  
    cb(val.eventName, val.saved);
  };
  
  // Called if an error occurs trying to create event
  const doCreateEventError = (msg: string): void => {
    if (DEBUG) console.log("ENTERED doCreateEventError (server.ts)");
  
    console.error(`Error fetching /api/create: ${msg}`);
  };




  // ---------------- GET SPORTS LIST ON GET TICKETS CLICK --------------

  export type sportListCallback = (sportsList: string[]) => void;

  /** retrieves the list of sports available for users to buy tickets from
   * @param cb: the call back function of type (sportsList: string[]) 
  */
  export const retrieveSportsList = (cb: sportListCallback): void => {
    if (DEBUG) console.log("ENTERED retrieveSportsList called (server.ts)");
    
    fetch("/api/retrieveSportsList")
    .then((res) => retrieveSportsListResp(res, cb))
    .catch(() => retrieveSportsListError("failed to connect to server"));
  };

  // handles the server response
  const retrieveSportsListResp = (res: Response, cb: sportListCallback): void => {
    if (DEBUG) console.log("ENTERED retrieveSportsListResp called (server.ts)");
  
    if (res.status === 200) {
      res.json().then((val) => retrieveSportsListJson(val, cb))
        .catch(() => retrieveSportsListError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(retrieveSportsListError)
        .catch(() => retrieveSportsListError("400 response is not text"));
    } else {
      retrieveSportsListError(`bad status code: ${res.status}`);
    }
  };
  
  // calls the call back function
  const retrieveSportsListJson = (val: unknown, cb: sportListCallback): void => {
    if (DEBUG) console.log("ENTERED retrieveSportsListJson called (server.ts)");


  
    if (!isRecord(val) || !Array.isArray(val.sportsList)) {
      console.error('Invalid JSON from /retrieveSportsList.');
      return;
    }
  
    cb(val.sportsList);
  };
  
  // Called if an error occurs trying to get the sports list
  const retrieveSportsListError = (msg: string): void => {
    if (DEBUG) console.log("ENTERED retrieveSportsListError (server.ts)");
  
    console.error(`Error fetching /api/retrieveSportsList: ${msg}`);
  };















// ---------------------- GET EVENTS ASSOCIATED TO SPORT -------------------------------

export type sportEventsCallBack = (eventList: Event[], sport: string) => void;

/** Gets the list of events associated to given sport
 * @param sport: the sport
 * @param cb: the call back funciton of type (eventList: Event[], sport: string) => void
*/
export const getSportEvents = (sport: string, cb: sportEventsCallBack): void => {
  if (DEBUG) {
      console.log("ENTERED: getSportEvents (server.ts)");
  }

  // pass in entire event details as all its fields, then initalize event in server
  fetch('/api/getSportEvents?sport=' + encodeURIComponent(sport))
    .then((res) => doGetSportEventsResp(res, cb))
    .catch(() => doGetSportsEventError("failed to connect to server"));
};

// Handles server response
const doGetSportEventsResp = (res: Response, cb: sportEventsCallBack): void => {
  if (DEBUG) console.log("ENTERED doGetSportEventsResp (server.ts)");

  if (res.status === 200) {
    if (DEBUG) console.log("status 200 in doGetSportEventsResp");
    res.json().then((val) => doGetSportEventsJson(val, cb))
      .catch(() => doGetSportsEventError("200 response is not JSON"));
  } else if (res.status === 400) {
    if (DEBUG) console.log("status 400 in doGetSportEventsResp");
    res.text().then(doGetSportsEventError)
      .catch(() => doGetSportsEventError("400 response is not text"));
  } else {
    if (DEBUG) console.log("status else case in doGetSportEventsResp");
    doGetSportsEventError(`bad status code: ${res.status}`);
  }
};

// calls the call back
const doGetSportEventsJson = (val: unknown, cb: sportEventsCallBack): void => {
  if (DEBUG) console.log("ENTERED doGetSportEventsJson (server.ts)");
  
  if (!isRecord(val) || !(Array.isArray(val.eventsList)) || typeof val.sport !== 'string'){

    console.error('Invalid JSON from /api/getSportEvents', val);
    return;
  }

  cb(val.eventsList, val.sport);
};

// Called if an error occurs trying to get the list of events
const doGetSportsEventError = (msg: string): void => {
  if (DEBUG) console.log("ENTERED doGetSportsEventError (server.ts)");

  console.error(`Error fetching /api/getSportEvents: ${msg}`);
};

















// ---------------------- BUY TICKETS -------------------------------

export type buyTicketsCallBack = (bought: boolean) => void;

/** Buys the tickets
 * @param eventName: name of the event
 * @param numTickets: the number of tickets user wants to buy
 * @param sport: the sport of the event
 * @param cb: call back function of type (bought: boolean) => void
*/
export const buyTickets = (eventName: string, numTickets: number, sport:string, cb: buyTicketsCallBack): void => {
  if (DEBUG) console.log("ENTERED buyTickets (server.ts)");


  // pass in entire event details as all its fields, then initalize event in server
  const bodyParams = {eventName: eventName, numTickets: numTickets, sport: sport};
  fetch('/api/buyTickets', {method: 'POST', body: JSON.stringify(bodyParams),
    headers: {'Content-Type': 'application/json'}})
    .then((res) => doBuyTicketsResp(res, cb))
    .catch(() => doBuyTicketsError("failed to connect to server"));
};

// Handles server response
const doBuyTicketsResp = (res: Response, cb: buyTicketsCallBack): void => {
  if (DEBUG) console.log("ENTERED doBuyTicketsResp (server.ts)");

  if (res.status === 200) {
    if (DEBUG) console.log("status 200 in doBuyTicketsResp");
    res.json().then((val) => doBuyTicketsJson(val, cb))
      .catch(() => doBuyTicketsError("200 response is not JSON"));
  } else if (res.status === 400) {
    if (DEBUG) console.log("status 400 in doBuyTicketsResp");
    res.text().then(doCreateEventError)
      .catch(() => doBuyTicketsError("400 response is not text"));
  } else {
    if (DEBUG) console.log("status else case in doBuyTicketsResp");
    doBuyTicketsError(`bad status code: ${res.status}`);
  }
};

// calls callback
const doBuyTicketsJson = (val: unknown, cb: buyTicketsCallBack): void => {
  if (DEBUG) console.log("ENTERED doBuyTicketsJson (server.ts)");
  
  if (!isRecord(val) || typeof val.bought !== 'boolean'){
    if (DEBUG) console.log("val.bought not boolean or val not record (doBuyTicketsJson)");

    console.error('Invalid JSON from /api/buyTickets', val);
    return;
  }

  if(DEBUG) console.log(val.bought);
  
  cb(val.bought);
};

// Called if an error occurs trying to buy tickets
const doBuyTicketsError = (msg: string): void => {
  if (DEBUG) console.log("ENTERED doBuyTicketsError (server.ts)");

  console.error(`Error fetching /api/buyTickets: ${msg}`);
};






