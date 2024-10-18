import { LightningElement,wire } from 'lwc';
// Import message service features required for subscribing and the message channel
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import MOVIE_CHANNEL from '@salesforce/messageChannel/movieChannel__c';

export default class MovieDetail extends LightningElement {

    subscription = null;
    loadComponent = false;
    movieDetails = {};
    @wire(MessageContext)
    messageContext;
    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                MOVIE_CHANNEL,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    // Handler for message received by component
    handleMessage(message) {
        //console.log("Message",message);
        let movieId = message.movieId;
        console.log("movieId", movieId);
      //  console.log("Mrinmoy");
        this.fetchMovieDetail(movieId);
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    async fetchMovieDetail(movieId) {
    let url = `https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=5bf8bfd9`;
    try {
        const res = await fetch(url);
        console.log(res);

        // Check if the response is OK (status 200)
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Try to parse the JSON response
        const data = await res.json();

        // Log and assign the movie details
        console.log("Movie Details", data);
        this.loadComponent = true;
        this.movieDetails = data;

    } catch (error) {
        console.error("Error fetching movie details:", error);
        this.loadComponent = false;
        // You might also want to display an error message to the user here
    }
}




}