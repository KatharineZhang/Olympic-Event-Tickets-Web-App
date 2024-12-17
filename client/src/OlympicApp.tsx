import React, { Component } from "react"; //ChangeEvent, MouseEvent
import { EventList } from "./EventList";
import { AddEvent } from "./AddEvent";
import { GetTickets } from "./GetTickets";
import { refreshPage, createEvent, getSportEvents, buyTickets, retrieveSportsList } from "./server";

const DEBUG : boolean = false;

/** Describes set of possible app page views.  */
type Page = {kind: "Olympic Event List"} | {kind: "Add Event"} | {kind: "Get Event Tickets"}; 

type Event = {name: string, 
              sport: string, 
              description: string, 
              date: number, 
              venue: string,
              maxTickets: number,
              ticketsSold: number,
              ticketsLeft: number};

type OlympicAppState = {
  show: Page
  eventsByDate: Event[] | undefined
  top3EventList: Event[] | undefined
  allSportsList: string[] | undefined
  eventsForSport: Event[] | undefined
  sport4Events: string;
  loading: boolean
};

/** Displays the UI of the Olympic rsvp application. */
export class OlympicApp extends Component<{}, OlympicAppState> {

  constructor(props: {}) {
    super(props);

    this.state = {show: {kind: "Olympic Event List"}, 
                  eventsByDate: undefined,
                  top3EventList: undefined,
                  loading: false,
                  allSportsList: undefined,
                  eventsForSport:  undefined,
                  sport4Events: ""};
  }


  /** called when page just loads to get the most recent info from the server */
  componentDidMount = (): void => {
    refreshPage(this.doRefreshResp);  // initiate a fetch to update our list of items
  }

  render = (): JSX.Element => {
    if(this.state.loading === true) {
        return <div>LOADING...</div>
    }
    if(this.state.show.kind === "Olympic Event List") {
      return <EventList eventsByDate={this.state.eventsByDate}
                        top3EventList={this.state.top3EventList}
                        onAddEventClick={this.doAddEventClick}
                        onGetTicketsClick={this.doGetTicketsClick}
                        onRefreshClick={this.doRefreshClick}></EventList>
    } else if(this.state.show.kind === "Add Event") {
      return <AddEvent onCreateClick={this.doCreateClick} 
              onBackClick={this.doBackClick}></AddEvent>
    } else {
      return <GetTickets 
              sportsList={this.state.allSportsList}
              eventsForSport={this.state.eventsForSport}
              sport4Events={this.state.sport4Events}
              onSportChange={this.doSportChange}
              onBackClick={this.doBackClick}
              onBuyTicketsClick={this.doBuyTicketsClick}></GetTickets>
    }
  };

  // EVENT LIST FUNCTIONALITIES

  // goes to "Add Event" page when Add-Event button is clicked in Events List
  doAddEventClick = (): void => {
    if (DEBUG) console.log("ENTERING doAddEventClick ----");
    this.setState({show: {kind: "Add Event"}});
  };

  // goes to "Get Tickets" page when Get Tickets is clicked in Events List
  // calls retrieveSportsList to get the most recent list of available sports
  // to buy tickets from
  doGetTicketsClick = (): void => { // add server component
    if (DEBUG) console.log("ENTERING doGetTicketsClick ----");
    retrieveSportsList(this.doGetTicketsResp);
  };

  // updates the list of available sports to render within the Get Tickets page
  doGetTicketsResp = (sportsList: string[]): void => {
    if (DEBUG) console.log("ENTERING doGetTicketsResp ----");

    this.setState({show: {kind: "Get Event Tickets"}, allSportsList: sportsList});
  };


  // Refreshes the page with the most recent info
  // calls refreshPage, which retrieves the most recent information
  // from the server
  doRefreshClick = (): void => { // add server component
    if(DEBUG) console.log("ENTERING doRefreshClick called");
    refreshPage(this.doRefreshResp);
  };

  
  // updates all the important lists in our state so renders are up to date
  doRefreshResp = (sorted: Event[], top3: Event[], allSports: string[]): void => {
    if(DEBUG) console.log("ENTERING doRefreshResp called");
    this.setState({show: {kind: "Olympic Event List"}, 
                  eventsByDate: sorted, 
                  top3EventList: top3,
                  allSportsList: allSports,
                  eventsForSport: undefined});
  };

  // ADD EVENT FUNCTIONALITIES

  // creates a new event when Create is clicked in Add Event Page
  // calls createEvent, which creates the new event given the parameters in server
  doCreateClick = (eventName: string,
                  sport: string,
                  description: string,
                  date: number,
                  venue: string,
                  maxTickets: number): void => {
    if (DEBUG) console.log("ENTERING doCreateClick ----");

    createEvent(eventName, sport, description, date, venue, maxTickets, this.doCreateResp);
  };

  // tells us creating the event was successful in the server
  doCreateResp = (eventName: string, saved: boolean): void => {
    if (DEBUG) console.log("ENTERING doCreateResp ----");

    if(saved) {
      console.log("create new event was successful for ", eventName);
      refreshPage(this.doRefreshResp);
    } else {
      console.error("Save was not successful for ", eventName);
    }
  };


  // does back click functionality to the "Olympic Events Page"
  doBackClick = (): void => {
    if (DEBUG) console.log("ENTERING doBackClick ----");
    this.setState({show: {kind: "Olympic Event List"}});
  };


  // ------------ GET TICKETS FUNCTIONALITIES --------------------

  // responds to the action of changing the sport selected in the dropdown
  // within "Get Tickets" page
  // calls getSportEvents that handles getting the list of events associated for the sport
  doSportChange = (sport: string): void => {
    if (DEBUG) console.log("ENTERING doSportChange ----");

    getSportEvents(sport, this.doSportChangeResp);
  };

  // sets up the app state with the most recent list of events associated with sport
  doSportChangeResp = (eventList: Event[], sport: string): void => {
    if (DEBUG) console.log("ENTERING doSportChangeResp ----");

    this.setState({show: {kind: "Get Event Tickets"}, eventsForSport: eventList, sport4Events: sport});
  };
  

  // does the buy tickets functionality. Activiated when clicked in "Get Tickets" page
  // calls buyTickets which will update the server on the event information
  doBuyTicketsClick = (eventName: string, numTicketsBought: number): void => {
    if(DEBUG) console.log('ENTER doBuyTicketsClick');

    if(this.state.eventsByDate === undefined) {
      console.error("Cannot buy tickets if there are no events.");
    } else {
      buyTickets(eventName, numTicketsBought, this.state.sport4Events, this.doBuyTicketsResp);

    }
  };


  // gives us the response of if buying tickets were successful and
  // refreshes page for us
  doBuyTicketsResp = (bought: boolean): void => {
    if(DEBUG) console.log('ENTERING doBuyTicketsResp');

    if(bought) {
      // this.setState({show: {kind: "Olympic Event List"}, 
      //   allSportsList: sportsList,
      //   eventsForSport: undefined});
      refreshPage(this.doRefreshResp);
    } else {
      console.error('something went wrong with buying the tickets');
    }
  };


















}

   

// /** Displays the UI of the Olympic rsvp application. */
// export class OlympicApp extends Component<{}, OlympicAppState> {

//   constructor(props: {}) {
//     super(props);

//     this.state = {name: "", msg: ""};
//   }

//   render = (): JSX.Element => {
//     return (<div>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input type="name" id="name" value={this.state.name}
//                  onChange={this.doNameChange}></input>
//           <button onClick={this.doDummyClick}>Dummy</button>
//         </div>
//         {this.renderMessage()}
//       </div>);
//   };

  // renderMessage = (): JSX.Element => {
  //   if (this.state.msg === "") {
  //     return <div></div>;
  //   } else {
  //     return <p>Server says: {this.state.msg}</p>;
  //   }
  // };

  // doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
  //   this.setState({name: evt.target.value, msg: ""});
  // };

  // doDummyClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
  //   const name = this.state.name.trim();
  //   if (name.length > 0) {
  //     const url = "/api/dummy?name=" + encodeURIComponent(name);
  //     fetch(url).then(this.doDummyResp)
  //         .catch(() => this.doDummyError("failed to connect to server"));
  //   }
  // };

  // doDummyResp = (res: Response): void => {
  //   if (res.status === 200) {
  //     res.json().then(this.doDummyJson)
  //         .catch(() => this.doDummyError("200 response is not JSON"));
  //   } else if (res.status === 400) {
  //     res.text().then(this.doDummyError)
  //         .catch(() => this.doDummyError("400 response is not name"));
  //   } else {
  //     this.doDummyError(`bad status code ${res.status}`);
  //   }
  // };

  // doDummyJson = (data: unknown): void => {
  //   if (!isRecord(data)) {
  //     console.error("200 response is not a record", data);
  //     return;
  //   }

  //   if (typeof data.msg !== "string") {
  //     console.error("'msg' field of 200 response is not a string", data.msg);
  //     return;
  //   }

  //   this.setState({msg: data.msg});
  // }

  // doDummyError = (msg: string): void => {
  //   console.error(`Error fetching /api/dummy: ${msg}`);
  // };

