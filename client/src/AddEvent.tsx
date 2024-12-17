import React, { Component, ChangeEvent,MouseEvent } from "react"; //,  

//const DEBUG : boolean = false;

type AddEventProps = {
    // add when needed
    onCreateClick: (eventName: string,
                    sport: string,
                    description: string,
                    date: number,
                    venue: string,
                    maxTickets: number) => void;
    onBackClick: () => void;
};

type AddEventState = {
    eventName: string;
    sport: string;
    description: string;
    date: number;
    venue: string;
    maxTickets: number;
    ticketsSold: number;
    ticketsLeft: number;
    errorMsg: string;
};


/** Displays the list of created design files. */
export class AddEvent extends Component<AddEventProps, AddEventState> {

  constructor(props: AddEventProps) {
    super(props);

    this.state = {eventName: "",
                sport: "",
                description: "",
                date: 0,
                venue: "",
                maxTickets: 0,
                ticketsSold: 0,
                ticketsLeft: 0,
                errorMsg: ""};
  }

  render = (): JSX.Element => {
    return (<div>
        <h1>Add Event Page</h1>
        <h3>{this.state.errorMsg}</h3>
        <p>
            <label htmlFor="eventId">Event:</label>
            <input id="eventId" type="text" value={this.state.eventName} onChange={this.doEventNameChange}></input>
        </p>
        
        <p>
            <label htmlFor="sportId">Sport:</label>
            <input id="sportId" type="text" value={this.state.sport} onChange={this.doSportChange}></input>
        </p>
        
        <p>
            <label htmlFor="descpId">Description:</label>
            <input id="descpId" type="text" value={this.state.description} onChange={this.doDescriptionChange}></input>
        </p>
        
        <p>
            <label htmlFor="dateId">Date: Aug</label>
            <input id="dateId" type="text" value={this.state.date.toString()} onChange={this.doDateChange}></input>
            <span>, 2024</span>
        </p>
        
        <p>
            <label htmlFor="venueId">Venue:</label>
            <input id="venueId" type="text" value={this.state.venue} onChange={this.doVenueChange}></input>
        </p>
        
        <p>
            <label htmlFor="ticketId">Max Tickets:</label>
            <input id="ticketId" type="text" value={this.state.maxTickets.toString()} onChange={this.doMaxTicketsChange}></input>
        </p>


        <button type="button" onClick={this.doCreateClick}>Create</button>
        <button type="button" onClick={this.doBackClick}>Back</button>
    </div>);
  };

  // deals with user entering event name
  doEventNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({eventName: evt.target.value});
  }

    // deals with user entering sport type

  doSportChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({sport: evt.target.value});
  }

  // deals with user entering description 
  doDescriptionChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({description: evt.target.value});
  }

  // deals with user entering the date of the event
  doDateChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if(BigInt(evt.target.value) > 31 || BigInt(evt.target.value) < 1) {
      console.error("Dates must be between 1-31");
      this.setState({date: 0, errorMsg: "ERROR: Dates must be between 1-31"});
    } else {
      this.setState({date: Number(evt.target.value), errorMsg: ""});
    }
   
  }

  // deals with user entering the venue of the evetn
  doVenueChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({venue: evt.target.value});
  }


  // deals with user entering the event max tickets
  doMaxTicketsChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if(BigInt(evt.target.value) < 1) {
      console.error("Maximum must be greater than 0!!!!");
      this.setState({maxTickets: 0, errorMsg: "ERROR: you must have max tickets of at least 1!"});
    } else {
      this.setState({maxTickets: Number(evt.target.value), errorMsg: ""});
    }
    
  }

  // handles when the user clicks the "create" button to create new event
  doCreateClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if(this.state.date < 1 || this.state.date > 31 || this.state.maxTickets < 1) {
      console.error("Your dates must be between 1-31 and max tickets must be greater than 1");
      this.setState({errorMsg: "ERROR: either date or maximum tickets are inavlid!"});
    } else {
      this.props.onCreateClick(
        this.state.eventName,
        this.state.sport,
        this.state.description,
        this.state.date,
        this.state.venue,
        this.state.maxTickets);
    }
    
  }

  // handles the back click
  doBackClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    this.props.onBackClick();
  }

}


