import React, { Component, ChangeEvent, MouseEvent } from "react"; //, 
import { isRecord } from './record';

const DEBUG : boolean = true;

type Event = {name: string, 
  sport: string, 
  description: string, 
  date: number, 
  venue: string,
  maxTickets: number,
  ticketsSold: number,
  ticketsLeft: number}

type GetTicketsProps = {
    sportsList: string[] |undefined;
    eventsForSport: Event[] |undefined; // rerenders once a sport is selected and this is passed in
    sport4Events: string;
    onSportChange: (sport: string) => void;
    onBackClick: () => void;
    onBuyTicketsClick: (eventName: string, numTicketsBought: number) => void;
};

type GetTicketsState = {
    userName: string; 
    eventName: string;
    numTickets: number;
    errorMsg: string;
    sport: string;
    eventDetails: string[] | undefined;
    ticketsAvail: number; // might need for checking if there are enough tickets

};


/** Displays the list of created design files. */
export class GetTickets extends Component<GetTicketsProps, GetTicketsState> {

  constructor(props: GetTicketsProps) {
    super(props);

    this.state = {userName: "",
                  eventName: "",
                  numTickets: 0,
                  errorMsg: "",
                  sport: "",
                  eventDetails: undefined,
                  ticketsAvail: 0};
  }

  render = (): JSX.Element => {
    return (<div>
        <h1>Get Tickets Page</h1>
        <p>Choose a sport: {this.renderSportDropdown()}</p>
        <p></p>
        <p>Choose an event: {this.renderEventDropdown()}</p>
        <p></p>
        <h3>Details:</h3>
        {this.renderEventDetails()}
        <p></p>
        {this.renderButtons()}
    </div>);
  };


  // renders the sport dropdown
  renderSportDropdown  = (): JSX.Element => {
    if (DEBUG) console.log("calling renderSportDropdown ----");

    if(this.props.sportsList !== undefined) {

      if(this.props.sportsList.length === 0) {
        return <h3>All Olympic event tickets are sold out! Be faster next time!</h3>;
      }

      const list: JSX.Element[] = [];
      list.push(<option value="" key=""></option>)
      for (const sportName of this.props.sportsList) {
        list.push(<option value={sportName} key={sportName}>{sportName}</option>);
      }
      
      return <select onChange={this.doSportDropdownChange}>{list}</select>;
    } else {
      console.log("Sport dropdown for GetTickets is undefined!");

      return <></>
    }
  }

  
  // renders the event dropdown after sport is selected
  renderEventDropdown = (): JSX.Element => {
    if (DEBUG) console.log("calling renderEventDropdown ----");

    if(this.props.eventsForSport !== undefined) {

      if(DEBUG) {
        const debugList: string[] = [];
        for(const events of this.props.eventsForSport) {
          debugList.push(events.name);
        }
        console.log(debugList.toString());
      }
      
      
      const list: JSX.Element[] = [];
      list.push(<option value="" key=""></option>)
      for (const event of this.props.eventsForSport) {
        list.push(<option value={event.name} key={event.name}>{event.name}</option>);
      }

      return <select onChange={this.doEventDropdownChange}>{list}</select>;
    } else {
      console.log("Event dropdown for GetTickets is undefined because sport has not been selected");
      return <p></p>;
    }
  }
 
  // renders the event details after sport and event are selected
  renderEventDetails = (): JSX.Element => {
    if (DEBUG) console.log("calling renderEventDetails ----");


      if(this.state.eventDetails === undefined) {
        return <></>;
      } else {
      
        const list: JSX.Element[] = [];
        for(const line of this.state.eventDetails) {
          list.push(<li key={line}>{line}</li>);
        }
        return (<div>
          <p>{list}</p>
          <label htmlFor="name">Ticket Holder Name: </label>
          <input id="name" type="text" value={this.state.userName} onChange={this.doNameChange}></input>
          <p></p>
          <label htmlFor="name">Number of Tickets: </label>
          <input id="name" type="text" value={this.state.numTickets} onChange={this.doNumTicketChange}></input>
          <h2>{this.state.errorMsg}</h2>
        </div>);
      }
  }

  // renders all the buttons
  renderButtons = (): JSX.Element => {
    if (DEBUG) console.log("calling renderButtons ----");

    if(this.state.eventDetails === undefined) {
      return <div>{this.renderBackButton()}</div>;
    } else {
      return <div>{this.renderBackButton()}
                  {this.renderGetTicketsButton()}</div>;
    }
  }

  // renders back button
  renderBackButton = (): JSX.Element => {
    if (DEBUG) console.log("calling renderBackButton ----");

    return <button type="button" onClick={this.doBackClick}>Back</button>;
  }


  // renders "Get Tickets" button which allows users to buy tickets
  renderGetTicketsButton = (): JSX.Element => {
    if (DEBUG) console.log("calling renderGetTicketsButton ----");

    if(this.state.numTickets === 0) {
      return <h3>Button revoked. You cannot buy 0 tickets. Try refreshing the page to see available events.</h3>
    }
    return <button type="button" onClick={this.doGetTicketsClick}>Buy Tickets</button>;
  }


  // controls the sport dropdown selections
  doSportDropdownChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    if (DEBUG) console.log("calling doSportDropdownChange ----");
    this.props.onSportChange(evt.target.value);
  }


  // controls the event dropdown selection
  doEventDropdownChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    if (DEBUG) console.log("calling doEventDropdownChange ----");

    this.getEventDetails(evt.target.value, this.props.sport4Events);
  }


  /** Gets the list of details based on an event and sport selected
   * @param event : string - the event
   * @param sport : - the sport
  */
  getEventDetails = (event: string, sport: string): void => {
    if (DEBUG) {
        console.log("ENTERED: getEventDetails (server.ts)");
    }
    const url = "/api/getEventDets" +
    "?event=" + encodeURIComponent(event) +
    "&sport=" + encodeURIComponent(sport);

    fetch(url)
      .then((res) => this.doGetEventDetailsResp(res))
      .catch(() => this.doGetEventDetailsError("failed to connect to server"));
  };

  // handles the server response of getting event details
  doGetEventDetailsResp = (res: Response): void => {
    if (DEBUG) console.log("doGetEventDetailsResp called (server.ts)");

    if (res.status === 200) {
      if (DEBUG) console.log("status 200 in doGetEventDetailsResp");
      res.json().then((val) => this.doGetEventDetailsJson(val))
        .catch(() => this.doGetEventDetailsError("200 response is not JSON"));
    } else if (res.status === 400) {
      if (DEBUG) console.log("status 400 in doGetEventDetailsResp");
      res.text().then(this.doGetEventDetailsError)
        .catch(() => this.doGetEventDetailsError("400 response is not text"));
    } else {
      if (DEBUG) console.log("status else case in doGetEventDetailsResp");
      this.doGetEventDetailsError(`bad status code: ${res.status}`);
    }
  };

  // parses the server response of all teh event details into JSON
  // and set the state
  doGetEventDetailsJson = (val: unknown): void => {
    if (DEBUG) console.log("entered doGetEventDetailsJson");
    
    if (!isRecord(val) || !(Array.isArray(val.details)) || 
        typeof val.ticketsAvail !== 'number' || typeof val.eventName !== 'string'){
      if (DEBUG) console.log("error with res.send val in (doGetEventDetailsJson)");

      console.error('Invalid JSON from /api/eventDetails', val);
      return;
    }
    
    this.setState({eventName: val.eventName, eventDetails: val.details, ticketsAvail: val.ticketsAvail});
  };

  // handles if there is an error between the client and server when getting
  // event details
  doGetEventDetailsError = (msg: string): void => {
    if (DEBUG) console.log("entered doGetEventDetailsError (server.ts)");

    console.error(`Error fetching /api/getEventDets?event=: ${msg}`);
  };




  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({userName: evt.target.value});
  }

  doNumTicketChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (DEBUG) {
      console.log("event value: ", BigInt(evt.target.value));
      console.log("Tickets Available: ", this.state.ticketsAvail)
    }
    if(BigInt(evt.target.value) > this.state.ticketsAvail) {
      console.error("User trying to buy tickets is > tickets available.");
      this.setState({numTickets: 0, errorMsg: "ERROR: You can only buy up to the available tickets!"});
    } else {
      this.setState({numTickets: Number(evt.target.value), errorMsg: ""});
    }
  }

  doBackClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    this.props.onBackClick();
  }

  doGetTicketsClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // I need to have a sports prop
    this.props.onBuyTicketsClick(this.state.eventName, this.state.numTickets);
  }

}



