import React, { Component, MouseEvent } from "react"; //ChangeEvent

const DEBUG : boolean = false;

type Event = {name: string, 
            sport: string, 
            description: string, 
            date: number, 
            venue: string,
            maxTickets: number,
            ticketsSold: number,
            ticketsLeft: number}


type EventListProps = {
    eventsByDate: Event[] | undefined
    top3EventList: Event[] | undefined
    onAddEventClick: () => void;
    onGetTicketsClick: () => void;
    onRefreshClick: () => void;
};

type EventListState = {
  
};


/** Displays the list of created design files. */
export class EventList extends Component<EventListProps, EventListState> {

  constructor(props: EventListProps) {
    super(props);

    this.state = {};
  }

  render = (): JSX.Element => {
    // will need to format the lists to display like the drawing in spec
    return (<div>
        <h1>Olympic Event List</h1>
        {this.renderEventList()}
        <h3>Ranking</h3>
        {this.renderTop3()}
        {this.renderButtons()}
    </div>);
  };

    /** Renders the list of events */
    renderEventList = (): JSX.Element => {
        if(this.props.eventsByDate === undefined || this.props.eventsByDate.length === 0) {
          return <p>There are no current events!</p>
        } else {
            const list: JSX.Element[] = [];
            for (const event of this.props.eventsByDate) {
                if(event.ticketsLeft === 0) {
                    const print = <p>{event.name} ({event.sport}) | SOLD OUT | Aug. {event.date}, 2024</p>;
                    list.push(<li key={event.name}> {print}</li>);
                } else {
                    const print = <p>{event.name} ({event.sport}) | {event.ticketsLeft} tickets | Aug. {event.date}, 2024</p>;
                    list.push(<li key={event.name}> {print}</li>);
                }
            }
            return (<ul>{list}</ul>);
        }
        
    }

    // renders all the buttons
    renderButtons = (): JSX.Element => {
      if(this.props.eventsByDate === undefined || this.props.eventsByDate.length === 0) {
        if (DEBUG) console.log("No events, so only the Add Event button");
        return (<div><button type="button" onClick={this.doAddEventClick}>Add Event</button></div>);
      } else {
        return (<div><button type="button" onClick={this.doAddEventClick}>Add Event</button>
                <button type="button" onClick={this.doGetTicketsClick}>Get Tickets</button>
                <button type="button" onClick={this.doRefreshClick}>Refresh</button></div>);
      }
      
    }

    /** Renders the top 3 events */
    renderTop3 = (): JSX.Element => {
        if(this.props.top3EventList === undefined || this.props.top3EventList.length === 0) {
            return <p>There are no current top 3 events!</p>;
        } else {
            const gold = this.props.top3EventList[0] === undefined ? "Gold: N/A" : "Gold: " + 
                                        this.props.top3EventList[0].name + 
                                        " (" + this.props.top3EventList[0].sport + ")"  + 
                                        " - " + this.props.top3EventList[0].ticketsSold.toString() + " sold";
            const silver = this.props.top3EventList[1] === undefined ? "Silver: N/A" : "Silver: " + 
                                        this.props.top3EventList[1].name + 
                                        " (" + this.props.top3EventList[1].sport + ")"  + 
                                        " - " + this.props.top3EventList[1].ticketsSold.toString() + " sold";
            const bronze = this.props.top3EventList[2] === undefined ? "Bronze: N/A" : "Bronze: " + 
                                        this.props.top3EventList[2].name + 
                                        " (" + this.props.top3EventList[2].sport + ")"  + 
                                        " - " + this.props.top3EventList[2].ticketsSold.toString() + " sold";
            return (<div><p>{gold}</p>
            <p>{silver}</p>
            <p>{bronze}</p></div>);
        }
    }

    


  /** Goes to Add Event page when clicked */
  doAddEventClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if (DEBUG) console.log("doAddEventClick (EventList.tsx)");

    this.props.onAddEventClick();
  };

  /** Goes to Get Tickets page when clicked */
  doGetTicketsClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if (DEBUG) console.log("doGetTicketsClick (EventList.tsx)");

    this.props.onGetTicketsClick();
  };

  /** Refreshes the page when clicked */
  doRefreshClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if (DEBUG) console.log("doRefreshClick (EventList.tsx)");

    this.props.onRefreshClick();
  };
}