import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { sortEvents, topThreeEvents, getSportsList, getEvents4Sport} from "./events"; // getSportEvents getSportsList

type Event = {name: string, 
              sport: string, 
              description: string, 
              date: number, 
              venue: string,
              maxTickets: number,
              ticketsSold: number,
              ticketsLeft: number};

const DEBUG : boolean = false;

// map of "event name + sport" -> Event details
const allEvents : Map<string, Event> = new Map();

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check






/** resets the events map for testing */
export const resetForTesting = (): void => {
  allEvents.clear();
};

/**adds an event into the map for testing*/
export const addEventForTesting = (name: string, event: Event): void => {
  allEvents.set(name, event);
};








/** refreshses the page
*/
export const refreshPage = (_req: SafeRequest, res: SafeResponse): void => {
  if(DEBUG) console.log("entering refreshPage (routes.ts)");

  const sortedEvents : Event[] = sortEvents(allEvents);
  const top3Events : Event[] = topThreeEvents(allEvents);
  const sportsList: string[] = getSportsList(allEvents);
  
  res.send({sorted: sortedEvents, top3: top3Events, allSports: sportsList}); 
};











/** creates an event by adding it to the allEvents map */
export const createEvent = (req: SafeRequest, res: SafeResponse): void => {

  const eventName : unknown = req.body.eventName;
  const sport : unknown = req.body.sport;
  const descrp : unknown = req.body.descrp;
  const date : unknown = req.body.date;
  const venue : unknown = req.body.venue;
  const maxTickets : unknown = req.body.maxTickets;

  if (DEBUG) {
    console.log("entering createEvent (routes.ts)");
    console.log("EVENT VALUES: ");
    console.log(" - ", eventName);
    console.log(" - ", sport);
    console.log(" - ", descrp);
    console.log(" - ", date);
    console.log(" - ", venue);
    console.log(" - ", maxTickets); 
  }

  // check if the params passed in are valid
  if(eventName === undefined || typeof eventName !== 'string') {
    res.status(400).send('required argument "eventName" for creating an event is invalid.');
    return;
  } else if(sport === undefined || typeof sport !== 'string') {
    res.status(400).send('required argument "sport" for creating an event is invalid.');
    return;
  }  else if(descrp === undefined || typeof descrp !== 'string') {
    res.status(400).send('required argument "descrp" (description) for creating an event is invalid.');
    return;
  }  else if(date === undefined || typeof date !== 'number') {
    res.status(400).send('required argument "date" for creating an event is invalid.');
    return;
  }  else if(venue === undefined || typeof venue !== 'string') {
    res.status(400).send('required argument "venue" for creating an event is invalid.');
    return;
  }  else if(maxTickets === undefined || typeof maxTickets !== 'number') {
    res.status(400).send('required argument "maxTickets" for creating an event is invalid.');
    return;
  } 

  // add new event to map :D
  const newEvent : Event = {name: eventName, 
                            sport: sport, 
                            description: descrp, 
                            date: date, 
                            venue: venue,
                            maxTickets: maxTickets,
                            ticketsSold: 0,
                            ticketsLeft: maxTickets };

  allEvents.set(eventName + sport, newEvent);

  res.send({eventName: eventName, saved: true});
};











/** gets the list of events associated with a sport 
 *  ADD MUTATION COMMENT
*/
export const getSportEvents = (req: SafeRequest, res: SafeResponse): void => {
  if (DEBUG) console.log("entering getSportEvents (routes.ts)");

  const sportName = first(req.query.sport);
  if(sportName === undefined) {
    res.status(400).send('missing sport parameter');
    return;
  }

  if(DEBUG) console.log(sportName);
  if(DEBUG) console.log(allEvents.size);

  let foundSport : boolean = false;
  for(const key of allEvents.keys()) {
    if(DEBUG) console.log('entering forloop');
    const details : Event | undefined = allEvents.get(key);
    if (details === undefined) {
      res.status(404).send('impossible case');
      return;
    }
    if(DEBUG) console.log(details.sport);
    if(details.sport === sportName) {
      foundSport = true;
    }
  }
  
  if(DEBUG) console.log(foundSport);
   // I don't think I need to test this because while testing the for loop, 
   // I inherently test the this branch due to how I am supposed to determine 
   // of foundSport is true or not (ie. if I enter the branch or not within the for loop)
  if(foundSport) {
    const eventsList: Event[] = getEvents4Sport(sportName, allEvents);
    res.send({eventsList: eventsList, sport: sportName});
  } else {
    res.send('did not find sport');
  }
}







/** retrieves the list of sports available to buy tickets from */
export const retrieveSportsList = (_req: SafeRequest, res: SafeResponse): void => {
  const sportsList : string[] = getSportsList(allEvents);

  res.send({sportsList: sportsList});
};










/** handles the buy ticket function */
export const buyTickets = (req: SafeRequest, res: SafeResponse): void => {
  if(DEBUG) console.log("ENTERING buyTickets (routes.ts)");


  const eventName : unknown = req.body.eventName;
  const numTickets: unknown = req.body.numTickets;
  const sportName: unknown = req.body.sport;

  if(eventName === undefined) {
    res.status(400).send('missing eventName parameter');
    return;
  } else if (numTickets === undefined) {
    res.status(400).send('missing numTickets parameter');
    return;
  } else if (sportName === undefined) {
    res.status(400).send('missing sports parameter');
  } else if (typeof eventName !== 'string') {
    res.status(400).send('eventName is not a string');
    return;
  } else if (typeof numTickets !== 'number') {
    res.status(400).send('numTickets is not of type number (initially bigint)');
    return;
  }  else if (typeof sportName !== 'string') {
    res.status(400).send('sportName is not of type string');
    return;
  } else {

    const eventDets : Event | undefined = allEvents.get(eventName + sportName);
    if(eventDets !== undefined) {
      const updatedEvent : Event = {name: eventName, 
                                    sport: eventDets.sport, 
                                    description: eventDets.description, 
                                    date: eventDets.date, 
                                    venue: eventDets.venue,
                                    maxTickets: eventDets.maxTickets,
                                    ticketsSold: eventDets.ticketsSold + numTickets,
                                    ticketsLeft: eventDets.ticketsLeft - numTickets};
      
      // update map
      allEvents.set(eventName + eventDets.sport, updatedEvent);
      // say that we successfully bought the tickets
      res.send({bought: true});
    }
  }

};


/** gets the event details given the event */
export const getEventDetails = (req: SafeRequest, res: SafeResponse): void => {
  if (DEBUG) console.log("entering getEventDetails (routes.ts)");

  const eventName = first(req.query.event);
  const sportName = first(req.query.sport);
  if(eventName === undefined) {
    res.status(400).send('missing event name parameter');
    return;
  } else if (typeof eventName !== 'string') {
    res.status(400).send('impossible case bc query must be string');
    return;
  } else if(sportName === undefined) {
    res.status(400).send('missing sport name parameter');
    return;
  } else if (typeof sportName !== 'string') {
    res.status(400).send('impossible case bc query must be string');
    return;
  }

  if(DEBUG) console.log(eventName);
  if(DEBUG) console.log(sportName);

  const eventDets : Event | undefined = allEvents.get(eventName + sportName);
  if(eventDets !== undefined) {
    const details : string[] = ["Description: " + eventDets.description, 
                                "Date: " + eventDets.date, 
                                "Venue: " + eventDets.venue, 
                                "Tickets Available: " + eventDets.ticketsLeft];
    if(DEBUG) console.log(details[0]);
    if(DEBUG) console.log(details[1]);
    if(DEBUG) console.log(details[2]);
    if(DEBUG) console.log(details[3]);
    res.send({eventName: eventDets.name, details: details, ticketsAvail: eventDets.ticketsLeft});
  } else {
    console.error("impossible case");
  }


};


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};
