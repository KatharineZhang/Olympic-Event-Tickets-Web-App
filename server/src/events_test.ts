import * as assert from 'assert';
import { sortEvents, topThreeEvents, getEvents4Sport, getSportsList,} from './events';

type Event = {name: string, 
    sport: string, 
    description: string, 
    date: number, 
    venue: string,
    maxTickets: number,
    ticketsSold: number,
    ticketsLeft: number}



describe('events', function() {
    it('sortEvents', function() {
        // sub 1: 0 loops
        assert.deepStrictEqual(sortEvents(new Map()), []);
        // sub 2: 1 loop, enters if statement (many inputs)
        const map1 : Map<string, Event> = new Map();
        const event1 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 1, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 0,
            ticketsLeft: 1};
        map1.set(event1.name, event1);
        assert.deepStrictEqual(sortEvents(map1), [event1]);

        const map2 : Map<string, Event> = new Map();
        const event2 : Event = {name: "event 2", 
            sport: "sport 2", 
            description: "description 2", 
            date: 2, 
            venue: "venue 2",
            maxTickets: 2,
            ticketsSold: 0,
            ticketsLeft: 2};
        map2.set(event2.name, event2);
        assert.deepStrictEqual(sortEvents(map2), [event2]);

        // sub 3: 2+ loops, enters if statement
        const map3 : Map<string, Event> = new Map();
        const event1sub1 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 2, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 0,
            ticketsLeft: 1};
        map3.set(event1sub1.name, event1sub1);

        const event2sub1 : Event = {name: "event 2", 
            sport: "sport 2", 
            description: "description 2", 
            date:3, 
            venue: "venue 2",
            maxTickets: 2,
            ticketsSold: 0,
            ticketsLeft: 2};
        map3.set(event2sub1.name, event2sub1);

        assert.deepStrictEqual(sortEvents(map3), [event1sub1, event2sub1]);

        const event3sub1 : Event = {name: "event 3", 
            sport: "sport 3", 
            description: "description 3", 
            date:1, 
            venue: "venue 3",
            maxTickets: 3,
            ticketsSold: 0,
            ticketsLeft: 3};
        map3.set(event3sub1.name, event3sub1);

        assert.deepStrictEqual(sortEvents(map3), [event3sub1, event1sub1, event2sub1]);

    });

    it('topThreeEvents', function() {
        // sub 1: 0 loops
        assert.deepStrictEqual(topThreeEvents(new Map()), []);

        // sub 2: 1 loop, enters if statement (many inputs)
        const map1 : Map<string, Event> = new Map();
        const event1 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 1, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 0,
            ticketsLeft: 1};
        map1.set(event1.name, event1);
        assert.deepStrictEqual(topThreeEvents(map1), [event1]);

        const map2 : Map<string, Event> = new Map();
        const event2 : Event = {name: "event 2", 
            sport: "sport 2", 
            description: "description 2", 
            date: 2, 
            venue: "venue 2",
            maxTickets: 2,
            ticketsSold: 0,
            ticketsLeft: 2};
        map2.set(event2.name, event2);
        assert.deepStrictEqual(topThreeEvents(map2), [event2]);

        // sub 3: 2+ loops, enters if statemnet ((many inputs)
        const map3 : Map<string, Event> = new Map();
        const event1sub1 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 2, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 0,
            ticketsLeft: 1};
        map3.set(event1sub1.name, event1sub1);

        const event2sub1 : Event = {name: "event 2", 
            sport: "sport 2", 
            description: "description 2", 
            date:3, 
            venue: "venue 2",
            maxTickets: 2,
            ticketsSold: 2,
            ticketsLeft: 0};
        map3.set(event2sub1.name, event2sub1);

        assert.deepStrictEqual(topThreeEvents(map3), [event2sub1, event1sub1]);

        const event3sub1 : Event = {name: "event 3", 
            sport: "sport 3", 
            description: "description 3", 
            date:1, 
            venue: "venue 3",
            maxTickets: 3,
            ticketsSold: 1,
            ticketsLeft: 2};
        map3.set(event3sub1.name, event3sub1);

        assert.deepStrictEqual(topThreeEvents(map3), [event2sub1, event3sub1, event1sub1]);
    });

    it('getEvents4Sport', function() {
        // sub 1: 0 loops (2 inputs)
        assert.deepStrictEqual(getEvents4Sport("In the spirit of the Olympics,", new Map()), []);

        assert.deepStrictEqual(getEvents4Sport("I'm sooooooo tired", new Map()), []);

        // sub 2: 1 loop, enterse if sport is the sport I'm looking for (2 inputs)
        const map1 : Map<string, Event> = new Map();
        const event1 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 1, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 0,
            ticketsLeft: 1};
        map1.set(event1.name, event1);
        assert.deepStrictEqual(getEvents4Sport("sport 1", map1), [event1]);

        const map2 : Map<string, Event> = new Map();
        const event2 : Event = {name: "event 2", 
            sport: "sport 2", 
            description: "description 2", 
            date: 2, 
            venue: "venue 2",
            maxTickets: 2,
            ticketsSold: 0,
            ticketsLeft: 2};
        map2.set(event2.name, event2);
        assert.deepStrictEqual(getEvents4Sport("sport 2", map2), [event2]);

        // sub 3: 1 loop, enterse if sport is NOT the sport I'm looking for (2 inputs)
        assert.deepStrictEqual(getEvents4Sport("ALMOST THERE", map1), []);
        assert.deepStrictEqual(getEvents4Sport("HALF WAY AAAUUUGGGHHHH", map2), []);

        // sub 4: 2+ loops, if the sport is what I'm looking for

        const map3 : Map<string, Event> = new Map();
        const event1sub1 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 2, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 0,
            ticketsLeft: 1};
        map3.set(event1sub1.name, event1sub1);

        const event2sub1 : Event = {name: "event 2", 
            sport: "sport 2", 
            description: "description 2", 
            date:3, 
            venue: "venue 2",
            maxTickets: 2,
            ticketsSold: 2,
            ticketsLeft: 0};
        map3.set(event2sub1.name, event2sub1);

        const event3sub1 : Event = {name: "event 3", 
            sport: "sport 3", 
            description: "description 3", 
            date:1, 
            venue: "venue 3",
            maxTickets: 3,
            ticketsSold: 1,
            ticketsLeft: 2};
        map3.set(event3sub1.name, event3sub1);

        const event4sub1 : Event = {name: "event 4", 
            sport: "sport 1", 
            description: "description 4", 
            date:1, 
            venue: "venue 4",
            maxTickets: 3,
            ticketsSold: 1,
            ticketsLeft: 2};
        map3.set(event4sub1.name, event4sub1);

        assert.deepStrictEqual(getEvents4Sport("sport 1", map3), [event1sub1, event4sub1]);

        assert.deepStrictEqual(getEvents4Sport("sport 2", map3), [event2sub1]);


        // sub 5: 2+ loops, if the sport is NOT WHAT i'M LOOKING FOR
        // gonna reuse maps heheh
        assert.deepStrictEqual(getEvents4Sport("SO CLOSE", map3), []);

        assert.deepStrictEqual(getEvents4Sport("This class was fun, but I'm so dead. Killed and deep fried.", map3), []);

    });

    it('getSportsList', function() {
        // sub 1: 0 loops
        assert.deepStrictEqual(getSportsList(new Map()), []);

        // sub 2: 1 loop, if the list DOES NOT contain the sport & the sport HAS tickets left (many inputs)
        const map2 : Map<string, Event> = new Map();
        const event1 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 1, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 0,
            ticketsLeft: 1};
        map2.set(event1.name, event1);
        assert.deepStrictEqual(getSportsList(map2), ["sport 1"]);

        // sub "3": 1 loop, if the list DOES connatin the sport & the sport HAS tickets left (many inputs)
        // IMPOSSIBLE: 1 loop means 1 element, so it's impossible that the list already contains the sport


        // sub 4: 1 loop, if the list DOES NOT connatin the sport & the sport HAS NO tickets left (many inputs)
        const map4 : Map<string, Event> = new Map();
        const event1sub4 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 1, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 1,
            ticketsLeft: 0};
        map4.set(event1sub4.name, event1sub4);

        assert.deepStrictEqual(getSportsList(map4), []);

        const map4ish : Map<string, Event> = new Map();
        const event2sub4 : Event = {name: "event 3", 
            sport: "sport 2", 
            description: "description 3", 
            date: 3, 
            venue: "venue 3",
            maxTickets: 3,
            ticketsSold: 3,
            ticketsLeft: 0};
        map4ish.set(event2sub4.name, event2sub4);
        
        assert.deepStrictEqual(getSportsList(map4ish), []);

        // sub 5: 1 loop, if the list DOES connatin the sport & the sport HAS NO tickets left (many inputs)
        // IMPOSSIBLE: 1 loop means 1 element, so it's impossible that the list already contains the sport

        // sub 6: 2+ loop, if the list DOES NOT connatin the sport & the sport HAS tickets left (many inputs)
        const map6 : Map<string, Event> = new Map();
        const event1sub6 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 1, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 0,
            ticketsLeft: 1};
        map6.set(event1sub6.name, event1sub6);
        const event2sub6 : Event = {name: "event 2", 
            sport: "sport 2", 
            description: "description 2", 
            date: 2, 
            venue: "venue 2",
            maxTickets: 2,
            ticketsSold: 0,
            ticketsLeft: 2};
        map6.set(event2sub6.name, event2sub6);
        assert.deepStrictEqual(getSportsList(map6), ["sport 1", "sport 2"]);

        const event3sub6 : Event = {name: "event 3", 
            sport: "sport 3", 
            description: "description 3", 
            date: 3, 
            venue: "venue 3",
            maxTickets: 3,
            ticketsSold: 0,
            ticketsLeft: 3};
        map6.set(event3sub6.name, event3sub6);
        assert.deepStrictEqual(getSportsList(map6), ["sport 1", "sport 2", "sport 3"]);

        // sub 7: 2+ loop, if the list DOES contain the sport & the sport HAS tickets left (many inputs)
        const map7 : Map<string, Event> = new Map();
        const event1sub7 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 1, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 0,
            ticketsLeft: 1};
        map7.set(event1sub7.name, event1sub7);
        const event2sub7 : Event = {name: "event 2", 
            sport: "sport 1", 
            description: "description 2", 
            date: 2, 
            venue: "venue 2",
            maxTickets: 2,
            ticketsSold: 0,
            ticketsLeft: 2};
        map7.set(event2sub7.name, event2sub7);

        assert.deepStrictEqual(getSportsList(map7), ["sport 1"]);

        const event3sub7 : Event = {name: "event 3", 
            sport: "sport 1", 
            description: "description 3", 
            date: 3, 
            venue: "venue 3",
            maxTickets: 3,
            ticketsSold: 0,
            ticketsLeft: 3};
        map7.set(event3sub7.name, event3sub7);

        assert.deepStrictEqual(getSportsList(map7), ["sport 1"]);


        // sub 8: 2+ loop, if the list DOES NOT connatin the sport & the sport HAS NO tickets left (many inputs)
        const map8 : Map<string, Event> = new Map();
        const event1sub8 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 1, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 1,
            ticketsLeft: 0};
        map8.set(event1sub8.name, event1sub8);
        const event2sub8 : Event = {name: "event 2", 
            sport: "sport 2", 
            description: "description 2", 
            date: 2, 
            venue: "venue 2",
            maxTickets: 2,
            ticketsSold: 2,
            ticketsLeft: 0};
        map8.set(event2sub8.name, event2sub8);

        assert.deepStrictEqual(getSportsList(map8), []);

        const event3sub8 : Event = {name: "event 3", 
            sport: "sport 3", 
            description: "description 3", 
            date: 3, 
            venue: "venue 3",
            maxTickets: 3,
            ticketsSold: 3,
            ticketsLeft: 0};
        map8.set(event3sub8.name, event3sub8);
        
        assert.deepStrictEqual(getSportsList(map8), []);

        // sub 9: 2+ loop, if the list DOES connatin the sport & the sport HAS NO tickets left (many inputs)
        const map9 : Map<string, Event> = new Map();
        const event1sub9 : Event = {name: "event 1", 
            sport: "sport 1", 
            description: "description 1", 
            date: 1, 
            venue: "venue 1",
            maxTickets: 1,
            ticketsSold: 1,
            ticketsLeft: 0};
        map9.set(event1sub9.name, event1sub9);
        const event2sub9 : Event = {name: "event 2", 
            sport: "sport 1", 
            description: "description 2", 
            date: 2, 
            venue: "venue 2",
            maxTickets: 2,
            ticketsSold: 2,
            ticketsLeft: 0};
        map9.set(event2sub9.name, event2sub9);

        assert.deepStrictEqual(getSportsList(map9), []);

        const event3sub9 : Event = {name: "event 3", 
            sport: "sport 1", 
            description: "description 3", 
            date: 3, 
            venue: "venue 3",
            maxTickets: 3,
            ticketsSold: 3,
            ticketsLeft: 0};
        map9.set(event3sub9.name, event3sub9);
        
        assert.deepStrictEqual(getSportsList(map9), []);


    });
});