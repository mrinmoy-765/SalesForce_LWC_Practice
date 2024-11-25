
import { LightningElement, track } from 'lwc';
import getStock from '@salesforce/apex/StockAPI.getStock';

export default class StockApiComponent extends LightningElement {
    @track stockData;

    buttonClick() {
        getStock()
            .then((result) => {
                this.stockData = JSON.parse(result); 
            })
            .catch((error) => {
                console.error('Error fetching stock data:', error);
            });
    }
}
