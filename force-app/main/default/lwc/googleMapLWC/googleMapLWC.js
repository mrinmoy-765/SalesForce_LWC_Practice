import { LightningElement,wire,track,api } from 'lwc';

import getCompanyLocations from '@salesforce/apex/GoogleMapController.getCompanyLocations';

export default class GoogleMapLWC extends LightningElement {
      

    @api accountNameParam = 'Aitechone';
    @track error;
    @track mapMakers = [];
    @track makersTitle = 'Aitchone Technologies';
    @track zoomLevel = 4;

    @wire(getCompanyLocations, {accountNameInitial: '$accountNameParam'})
    wiredOfficeLocations({error, data}){
        if(data){
             data.forEach(dataItem =>{
                this.mapMakers = [...this.mapMakers,
                    {
                        location: {
                            City: dataItem.BillingCity,
                            Country: dataItem.BillingCountry,
                        },

                        icon: 'custom:custom26',
                        title:dataItem.Name,
                    }
                ];
             });
             this.error = undefined;
        }else if(error){
            this.error = error;
            this.contacts = undefined ;
        }
    }
}