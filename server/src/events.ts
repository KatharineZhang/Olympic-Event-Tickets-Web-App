
export type Event = {name: string, 
                    sport: string, 
                    description: string, 
                    date: number, 
                    venue: string,
                    maxTickets: number,
                    ticketsSold: number,
                    ticketsLeft: number}



 /** sorts the events given a map of all the events based on date
  * @param allEvents: a map contain all the events
 */
export const sortEvents = (allEvents: Map<string, Event>): Event[] => {
    const eventsArray: Event[] = [];
    for (const eventKey of allEvents.keys()) {
        const eventDetails = allEvents.get(eventKey);
        if (eventDetails !== undefined) {
            eventsArray.push(eventDetails);
        } else {
            console.log("value of key is undefined, which is impossible");
        }
    }
    eventsArray.sort((a, b) => a.date - b.date);
    return eventsArray;
}

/** returns the top 3 events with the most tickets sold
 *  @param allEvents: a map contain all the events
*/
export const topThreeEvents = (allEvents: Map<string, Event>): Event[] => {
    const eventsArray: Event[] = [];
    for (const eventKey of allEvents.keys()) {
        const eventDetails = allEvents.get(eventKey);
        if (eventDetails !== undefined) {
            eventsArray.push(eventDetails);
        }else {
            console.log("value of key is undefined, which is impossible");
        }
    }

    const topThree = eventsArray;
    topThree.sort((a, b) => b.ticketsSold - a.ticketsSold);
    return topThree.slice(0, 3);
}

/** Gets all the events associated with a given sport
 *  @param allEvents: a map contain all the events
 *  @param sport: the sport
 */
export const getEvents4Sport = (sport: string, allEvents: Map<string, Event>): Event[] => {
    const eventsArray: Event[] = [];
    for (const eventKey of allEvents.keys()) {
        const eventDetails = allEvents.get(eventKey);
        if(eventDetails !== undefined) {
            if(eventDetails.sport === sport) {
                eventsArray.push(eventDetails);
            }
        } else {
            console.log("value of key is undefined, which is impossible");
        }
    }
    return eventsArray;
}

/** gets a list of all the sports that have tickets available
 *  @param allEvents: a map contain all the events
*/
export const getSportsList = (allEvents: Map<string, Event>): string[] => {
    const allSportsList: string[] = [];
    for (const eventKey of allEvents.keys()) {
        const eventDetails = allEvents.get(eventKey);
        if(eventDetails !== undefined) {
            if(typeof eventDetails.sport === 'string') {
                if(!allSportsList.includes(eventDetails.sport) && eventDetails.ticketsLeft > 0) {
                    allSportsList.push(eventDetails.sport);
                }
                
            }  else {
                console.log("the sport type of the event is not string, which is IMPOSSIBLE considering how the type is determined, and my server code.");
            }
        } else {
            console.log("value of key is undefined, which is impossible");
        }
    }
    return allSportsList;
}