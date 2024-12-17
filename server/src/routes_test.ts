import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { addEventForTesting, resetForTesting, refreshPage,
   createEvent, getSportEvents, retrieveSportsList, buyTickets,
    getEventDetails } from './routes'; 

export type Event = {name: string, 
                    sport: string, 
                    description: string, 
                    date: number, 
                    venue: string,
                    maxTickets: number,
                    ticketsSold: number,
                    ticketsLeft: number}

describe('routes', function() {


  it('refreshPage', function() {
    // straight line code with no input or conditionals

    const test1req = httpMocks.createRequest({method: 'GET', url: '/api/refresh'});
    const test1res = httpMocks.createResponse();
    const event1 : Event = {name: "event test", 
      sport: "sport test", 
      description: "aaaaaaaaaa", 
      date: 2, 
      venue: "venue",
      maxTickets: 5,
      ticketsSold: 0,
      ticketsLeft: 5};
    addEventForTesting("test", event1);
    refreshPage(test1req, test1res);
    assert.deepStrictEqual(test1res._getStatusCode(), 200);
    assert.deepStrictEqual(test1res._getData().allSports, ["sport test"]);
    

    const test2req = httpMocks.createRequest({method: 'GET', url: '/api/refresh'});
    const test2res = httpMocks.createResponse();

    const event1test2 : Event = {name: "event test", 
      sport: "sport test 1", 
      description: "aaaaaaaaaa", 
      date: 2, 
      venue: "venue",
      maxTickets: 5,
      ticketsSold: 0,
      ticketsLeft: 5};
    addEventForTesting("test", event1test2);
    
    const event2 : Event = {name: "event test", 
      sport: "sport test 2", 
      description: "aaaaaaaaaa", 
      date: 2, 
      venue: "venue",
      maxTickets: 5,
      ticketsSold: 0,
      ticketsLeft: 5};

    addEventForTesting("test2", event2);

    refreshPage(test2req, test2res);
    assert.deepStrictEqual(test2res._getStatusCode(), 200);
    assert.deepStrictEqual(test2res._getData().allSports, ["sport test 1", "sport test 2"]);

    resetForTesting();
  });






  it('createEvent' , function() {
    
    // straight line code in many conditional branches

    // sub 1: eventName === undefined (only 1 input)
    const req1 = httpMocks.createRequest({
        method: "POST", url: "/api/create",
        body: {eventName: undefined,
        sport: "sport 1", 
        descrp: "description 1", 
        date: 1, 
        venue: "venue 1", 
        maxTickets: 1}});

    const res1 = httpMocks.createResponse();

    createEvent(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), 'required argument "eventName" for creating an event is invalid.');

    // sub 2: eventName !== 'string' (only 1 input)
    const req1test2 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: 1,
      sport: "sport 1", 
      descrp: "description 1", 
      date: 1, 
      venue: "venue 1", 
      maxTickets: 1}});

    const res1test2 = httpMocks.createResponse();

    createEvent(req1test2, res1test2);
    assert.strictEqual(res1test2._getStatusCode(), 400);
    assert.deepStrictEqual(res1test2._getData(), 'required argument "eventName" for creating an event is invalid.');


    // sub 3: sport === undefined (only 1 input)
    const req1test3 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 1",
      sport: undefined, 
      descrp: "description 1", 
      date: 1, 
      venue: "venue 1", 
      maxTickets: 1}});

    const res1test3 = httpMocks.createResponse();

    createEvent(req1test3, res1test3);
    assert.strictEqual(res1test3._getStatusCode(), 400);
    assert.deepStrictEqual(res1test3._getData(), 'required argument "sport" for creating an event is invalid.');

    

    // sub 4:  sport !== 'string' (only 1 input)
    const req1test4 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 1",
      sport: 3, 
      descrp: "description 1", 
      date: 3, 
      venue: "venue 1", 
      maxTickets: 3}});

    const res1test4 = httpMocks.createResponse();

    createEvent(req1test4, res1test4);
    assert.strictEqual(res1test4._getStatusCode(), 400);
    assert.deepStrictEqual(res1test4._getData(), 'required argument "sport" for creating an event is invalid.');

    // sub 5: descrp === undefined (only 1 input)
    const req1test5 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 1",
      sport: "sport 1", 
      descrp: undefined, 
      date: 3, 
      venue: "venue 1", 
      maxTickets: 3}});

    const res1test5 = httpMocks.createResponse();

    createEvent(req1test5, res1test5);
    assert.strictEqual(res1test5._getStatusCode(), 400);
    assert.deepStrictEqual(res1test5._getData(), 'required argument "descrp" (description) for creating an event is invalid.');

    // sub 6:  descrp !== 'string' (only 1 input)
    const req1test6 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 1",
      sport: "sport 1", 
      descrp: 6, 
      date: 6, 
      venue: "venue 1", 
      maxTickets: 6}});

    const res1test6 = httpMocks.createResponse();

    createEvent(req1test6, res1test6);
    assert.strictEqual(res1test6._getStatusCode(), 400);
    assert.deepStrictEqual(res1test6._getData(), 'required argument "descrp" (description) for creating an event is invalid.');

    // sub 7: date === undefined  (only 1 input)
    const req1test7 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 1",
      sport: "sport 1", 
      descrp: "description 1", 
      date: undefined, 
      venue: "venue 1", 
      maxTickets: 7}});

    const res1test7 = httpMocks.createResponse();

    createEvent(req1test7, res1test7);
    assert.strictEqual(res1test7._getStatusCode(), 400);
    assert.deepStrictEqual(res1test7._getData(), 'required argument "date" for creating an event is invalid.');
    
    // sub 8:  date !== 'number' (only 1 input)
    const req1test8 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 1",
      sport: "sport 1", 
      descrp: "description 1", 
      date: "date", 
      venue: "venue 1", 
      maxTickets: 7}});

    const res1test8 = httpMocks.createResponse();

    createEvent(req1test8, res1test8);
    assert.strictEqual(res1test8._getStatusCode(), 400);
    assert.deepStrictEqual(res1test8._getData(), 'required argument "date" for creating an event is invalid.');
    
    // sub 9: venue === undefined (only 1 input)
    const req1test9 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 1",
      sport: "sport 1", 
      descrp: "description 1", 
      date: 10,
      venue: undefined, 
      maxTickets: 10}});

    const res1test9 = httpMocks.createResponse();

    createEvent(req1test9, res1test9);
    assert.strictEqual(res1test9._getStatusCode(), 400);
    assert.deepStrictEqual(res1test9._getData(), 'required argument "venue" for creating an event is invalid.');

    // sub 10: venue !== 'string' (only 1 input)
    const req1test10 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 1",
      sport: "sport 1", 
      descrp: "description 1", 
      date: 10, 
      venue: 10, 
      maxTickets: 10}});

    const res1test10 = httpMocks.createResponse();

    createEvent(req1test10, res1test10);
    assert.strictEqual(res1test10._getStatusCode(), 400);
    assert.deepStrictEqual(res1test10._getData(), 'required argument "venue" for creating an event is invalid.');

    // sub 11: maxTickets === undefined  (only 1 input)
    const req1test11 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 1",
      sport: "sport 1", 
      descrp: "description 1", 
      date: 10, 
      venue: "venue", 
      maxTickets: undefined}});

    const res1test11 = httpMocks.createResponse();

    createEvent(req1test11, res1test11);
    assert.strictEqual(res1test11._getStatusCode(), 400);
    assert.deepStrictEqual(res1test11._getData(), 'required argument "maxTickets" for creating an event is invalid.');
    

    // sub 12:  maxTickets !== 'number' (only 1 input)
    const req1test12 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 1",
      sport: "sport 1", 
      descrp: "description 1", 
      date: 10, 
      venue: "venue", 
      maxTickets: "not a number"}});

    const res1test12 = httpMocks.createResponse();

    createEvent(req1test12, res1test12);
    assert.strictEqual(res1test12._getStatusCode(), 400);
    assert.deepStrictEqual(res1test12._getData(), 'required argument "maxTickets" for creating an event is invalid.');

    // sub 13: add event to map (many inputs)
    const req1test13 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 1",
      sport: "sport 1", 
      descrp: "description 1", 
      date: 13, 
      venue: "venue", 
      maxTickets: 13}});

    const res1test13 = httpMocks.createResponse();

    createEvent(req1test13, res1test13);
    assert.strictEqual(res1test13._getStatusCode(), 200);
    assert.deepStrictEqual(res1test13._getData(), {eventName: "event 1", saved: true});


    const req2test13 = httpMocks.createRequest({
      method: "POST", url: "/api/create",
      body: {eventName: "event 2",
      sport: "sport 1", 
      descrp: "description 1", 
      date: 13, 
      venue: "venue", 
      maxTickets: 13}});

    const res2test13 = httpMocks.createResponse();

    createEvent(req2test13, res2test13);
    assert.strictEqual(res2test13._getStatusCode(), 200);
    assert.deepStrictEqual(res2test13._getData(), {eventName: "event 2", saved: true});







    resetForTesting();
  });









  it('getSportEvents' , function() {
    // straightline code  with a for loop and conditionals

    // sub 1: if sportName is undefined (1 case)
    const req1 = httpMocks.createRequest({
      method: "GET", url: "/api/getSportEvents",
      query: {}});

    const res1 = httpMocks.createResponse();

    getSportEvents(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), 'missing sport parameter');


    // sub 2: for loop, 0 loop case (many inputs)
    const req1sub2 = httpMocks.createRequest({
      method: "GET", url: "/api/getSportEvents",
      query: {sport: "sport 1"}});

    const res1sub2 = httpMocks.createResponse();

    getSportEvents(req1sub2, res1sub2);
    assert.strictEqual(res1sub2._getStatusCode(), 200);
    assert.deepStrictEqual(res1sub2._getData(), 'did not find sport');

    const req2sub2 = httpMocks.createRequest({
      method: "GET", url: "/api/getSportEvents",
      query: {sport: "sport 2"}});

    const res2sub2 = httpMocks.createResponse();

    getSportEvents(req2sub2, res2sub2);
    assert.strictEqual(res2sub2._getStatusCode(), 200);
    assert.deepStrictEqual(res2sub2._getData(), 'did not find sport');


    // sub 3: 1 loop case (many inputs for foundSport == false)
    const event1 : Event = {name: "event 1", 
      sport: "sport 1", 
      description: "1111111", 
      date: 1, 
      venue: "venue",
      maxTickets: 5,
      ticketsSold: 0,
      ticketsLeft: 5};
    addEventForTesting(event1.name + event1.sport, event1);

    const req1sub3 = httpMocks.createRequest({
      method: "GET", url: "/api/getSportEvents",
      query: {sport: "sport 2"}});

    const res1sub3 = httpMocks.createResponse();

    getSportEvents(req1sub3, res1sub3);
    assert.strictEqual(res1sub3._getStatusCode(), 200);
    assert.deepStrictEqual(res1sub3._getData(), 'did not find sport');

    const req2sub3 = httpMocks.createRequest({
      method: "GET", url: "/api/getSportEvents",
      query: {sport: "sport 3"}});

    const res2sub3 = httpMocks.createResponse();

    getSportEvents(req2sub3, res2sub3);
    assert.strictEqual(res2sub3._getStatusCode(), 200);
    assert.deepStrictEqual(res2sub3._getData(), 'did not find sport');


    // sub 4: 1 loop case (1 test for foundSport == true bc only 1 posisble input)
    const req1sub4 = httpMocks.createRequest({
      method: "GET", url: "/api/getSportEvents",
      query: {sport: "sport 1"}});

    const res1sub4 = httpMocks.createResponse();

    getSportEvents(req1sub4, res1sub4);
    assert.strictEqual(res1sub4._getStatusCode(), 200);
    assert.deepStrictEqual(res1sub4._getData(), {eventsList: [event1], sport: "sport 1"});

    // sub 5: 2+ loop case (many inputs for foundSport == false)
    const event2 : Event = {name: "event 2", 
      sport: "sport 2", 
      description: "222222", 
      date: 2, 
      venue: "venue 2",
      maxTickets: 2,
      ticketsSold: 0,
      ticketsLeft: 2};
    addEventForTesting(event2.name + event2.sport, event2);

    const req1sub5 = httpMocks.createRequest({
      method: "GET", url: "/api/getSportEvents",
      query: {sport: "sport 3"}});

    const res1sub5 = httpMocks.createResponse();

    getSportEvents(req1sub5, res1sub5);
    assert.strictEqual(res1sub5._getStatusCode(), 200);
    assert.deepStrictEqual(res1sub5._getData(), 'did not find sport');

    const req2sub5 = httpMocks.createRequest({
      method: "GET", url: "/api/getSportEvents",
      query: {sport: "sport 10"}});

    const res2sub5 = httpMocks.createResponse();

    getSportEvents(req2sub5, res2sub5);
    assert.strictEqual(res2sub5._getStatusCode(), 200);
    assert.deepStrictEqual(res2sub5._getData(), 'did not find sport');


    // sub 6: 2+ loop case (many inputs for foundSport == true)
    const req1sub6 = httpMocks.createRequest({
      method: "GET", url: "/api/getSportEvents",
      query: {sport: "sport 1"}});

    const res1sub6 = httpMocks.createResponse();

    getSportEvents(req1sub6, res1sub6);
    assert.strictEqual(res1sub6._getStatusCode(), 200);
    assert.deepStrictEqual(res1sub6._getData(), {eventsList: [event1], sport: "sport 1"});

    const req2sub6 = httpMocks.createRequest({
      method: "GET", url: "/api/getSportEvents",
      query: {sport: "sport 2"}});

    const res2sub6 = httpMocks.createResponse();

    getSportEvents(req2sub6, res2sub6);
    assert.strictEqual(res2sub6._getStatusCode(), 200);
    assert.deepStrictEqual(res2sub6._getData(), {eventsList: [event2], sport: "sport 2"});


    // if(foundSport) {
    // const eventsList: Event[] = getEvents4Sport(sportName, allEvents);
    // res.send({eventsList: eventsList, sport: sportName});


    resetForTesting();

  });
  






  it('retrieveSportsList' , function() {
    // striaghtline code (many inputs)

    const test1req = httpMocks.createRequest({method: 'GET', url: '/api/retrieveSportsList'});
    const test1res = httpMocks.createResponse();

    const event1test1 : Event = {name: "event 1", 
      sport: "sport 1", 
      description: "1111111", 
      date: 1, 
      venue: "venue",
      maxTickets: 5,
      ticketsSold: 0,
      ticketsLeft: 5};
    addEventForTesting("1", event1test1);

    retrieveSportsList(test1req, test1res);

    assert.deepStrictEqual(test1res._getStatusCode(), 200);
    assert.deepStrictEqual(test1res._getData(), {sportsList: ["sport 1"]});



    const test2req = httpMocks.createRequest({method: 'GET', url: '/api/retrieveSportsList'});
    const test2res = httpMocks.createResponse();

    const event1test2 : Event = {name: "event 1", 
      sport: "sport 1", 
      description: "1111111", 
      date: 1, 
      venue: "venue",
      maxTickets: 5,
      ticketsSold: 0,
      ticketsLeft: 5};
    addEventForTesting("1", event1test2);


    const event2test2 : Event = {name: "event 2", 
      sport: "sport 2", 
      description: "2222222", 
      date: 2, 
      venue: "venue",
      maxTickets: 5,
      ticketsSold: 0,
      ticketsLeft: 5};
    addEventForTesting("2", event2test2);

    retrieveSportsList(test2req, test2res);

    assert.deepStrictEqual(test2res._getStatusCode(), 200);
    assert.deepStrictEqual(test2res._getData(), {sportsList: ["sport 1", "sport 2"]});


    resetForTesting();
    
  });







  it('buyTickets' , function() {
//   const bodyParams = {eventName: eventName, numTickets: numTickets, sport: sport};


    
    // sub 1: if(eventName === undefined) {
    //   res.status(400).send('missing eventName parameter');
    const req1 = httpMocks.createRequest({
      method: "POST", url: "/api/buyTickets",
      body: {eventName: undefined, numTickets: 1, sport: "sport 1"}});

    const res1 = httpMocks.createResponse();

    buyTickets(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), 'missing eventName parameter');

    // sub 2: else if (numTickets === undefined) {
    //   res.status(400).send('missing numTickets parameter');
    //   return;
    const req2 = httpMocks.createRequest({
      method: "POST", url: "/api/buyTickets",
      body: {eventName: "event", numTickets: undefined, sport: "sport 1"}});

    const res2 = httpMocks.createResponse();

    buyTickets(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(), 'missing numTickets parameter');

    // sub 3: else if (sportName === undefined) {
    //   res.status(400).send('mising sports parameter');
    const req3 = httpMocks.createRequest({
      method: "POST", url: "/api/buyTickets",
      body: {eventName: "event", numTickets: 1, sport: undefined}});

    const res3 = httpMocks.createResponse();

    buyTickets(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(), 'missing sports parameter');

    // sub 4: else if (typeof eventName !== 'string') {
    //   res.status(400).send('eventName is not a string');
    const req4 = httpMocks.createRequest({
      method: "POST", url: "/api/buyTickets",
      body: {eventName: 1, numTickets: 1, sport: "sport 1"}});

    const res4 = httpMocks.createResponse();

    buyTickets(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(), 'eventName is not a string');    
    
    // sub 5: else if (typeof numTickets !== 'number') {
    //   res.status(400).send('numTickets is not of type number (initially bigint)');
    const req5 = httpMocks.createRequest({
      method: "POST", url: "/api/buyTickets",
      body: {eventName: "event", numTickets: "not a number", sport: "sport 1"}});

    const res5 = httpMocks.createResponse();

    buyTickets(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(), 'numTickets is not of type number (initially bigint)');

    // sub 6: else if (typeof sportName !== 'string') {
    //   res.status(400).send('sportName is not of type string');
    const req6 = httpMocks.createRequest({
      method: "POST", url: "/api/buyTickets",
      body: {eventName: "event", numTickets: 1, sport: 6}});

    const res6 = httpMocks.createResponse();

    buyTickets(req6, res6);
    assert.strictEqual(res6._getStatusCode(), 400);
    assert.deepStrictEqual(res6._getData(), 'sportName is not of type string');
    
    // sub 7: add the updated event with tickets changed

    const req7test1 = httpMocks.createRequest({
      method: "POST", url: "/api/buyTickets",
      body: {eventName: "event 7", numTickets: 3, sport: "sport 7"}});

    const res7test1 = httpMocks.createResponse();

    const ogEventTest7 : Event = {name: "event 7", 
      sport: "sport 7", 
      description: "7777777", 
      date: 7, 
      venue: "venue 7",
      maxTickets: 7,
      ticketsSold: 0,
      ticketsLeft: 7};
    addEventForTesting(ogEventTest7.name + ogEventTest7.sport, ogEventTest7);

    buyTickets(req7test1, res7test1);

    assert.deepStrictEqual(res7test1._getStatusCode(), 200);
    assert.deepStrictEqual(res7test1._getData(), {bought: true});







    const req7test2 = httpMocks.createRequest({
      method: "POST", url: "/api/buyTickets",
      body: {eventName: "event 7", numTickets: 3, sport: "sport 7"}});

    const res7test2 = httpMocks.createResponse();

    const ogEvent2Test7 : Event = {name: "event 7 test 2", 
      sport: "sport 7 test 2", 
      description: "7777777", 
      date: 7, 
      venue: "venue 7",
      maxTickets: 7,
      ticketsSold: 0,
      ticketsLeft: 7};
    addEventForTesting(ogEvent2Test7.name + ogEvent2Test7.sport, ogEvent2Test7);

    buyTickets(req7test2, res7test2);

    assert.deepStrictEqual(res7test2._getStatusCode(), 200);
    assert.deepStrictEqual(res7test2._getData(), {bought: true});


    resetForTesting();

  });








  it('getEventDetails' , function() {

    // sub 1: if(eventName === undefined) {
    const req1sub1 = httpMocks.createRequest({
      method: "GET", url: "/api/getEventDets",
      query: {sport: "sport"}});

    const res1sub1 = httpMocks.createResponse();

    getEventDetails(req1sub1, res1sub1);
    assert.strictEqual(res1sub1._getStatusCode(), 400);
    assert.deepStrictEqual(res1sub1._getData(), 'missing event name parameter');    
    
    
    
    // sub 2: else if(sportName === undefined) {
    const req1sub2 = httpMocks.createRequest({
      method: "GET", url: "/api/getEventDets",
      query: {event: "event"}});

    const res1sub2 = httpMocks.createResponse();

    getEventDetails(req1sub2, res1sub2);
    assert.strictEqual(res1sub2._getStatusCode(), 400);
    assert.deepStrictEqual(res1sub2._getData(), 'missing sport name parameter');



    // sub 3: all query parameters are valid (many inputs)

    const event1 : Event = {name: "event 1", 
      sport: "sport 1", 
      description: "description 1", 
      date: 1, 
      venue: "venue 1",
      maxTickets: 1,
      ticketsSold: 0,
      ticketsLeft: 1};
    addEventForTesting(event1.name + event1.sport, event1);

    const event2 : Event = {name: "event 2", 
      sport: "sport 2", 
      description: "description 2", 
      date: 2, 
      venue: "venue 2",
      maxTickets: 2,
      ticketsSold: 0,
      ticketsLeft: 2};
    addEventForTesting(event2.name + event2.sport, event2);

    const req1sub3 = httpMocks.createRequest({
      method: "GET", url: "/api/getEventDets",
      query: {event: "event 1", sport: "sport 1"}});

    const res1sub3 = httpMocks.createResponse();

    getEventDetails(req1sub3, res1sub3);
    assert.strictEqual(res1sub3._getStatusCode(), 200);
    assert.deepStrictEqual(res1sub3._getData(), {eventName: "event 1", 
      details: ["Description: description 1", "Date: 1", "Venue: venue 1", "Tickets Available: 1"], 
      ticketsAvail: 1});


    const req2sub3 = httpMocks.createRequest({
      method: "GET", url: "/api/getEventDets",
      query: {event: "event 2", sport: "sport 2"}});

    const res2sub3 = httpMocks.createResponse();

    getEventDetails(req2sub3, res2sub3);
    assert.strictEqual(res2sub3._getStatusCode(), 200);
    assert.deepStrictEqual(res2sub3._getData(), {eventName: "event 2", 
      details: ["Description: description 2", "Date: 2", "Venue: venue 2", "Tickets Available: 2"], 
      ticketsAvail: 2});



    resetForTesting();
  });

});
