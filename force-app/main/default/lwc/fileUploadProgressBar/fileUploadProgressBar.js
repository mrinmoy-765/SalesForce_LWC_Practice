import { LightningElement, api } from 'lwc';
import uploadFile from '@salesforce/apex/FileUploaderClass.uploadFile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FileUploadProgressBar extends LightningElement {
    @api recordId;
    fileData;
    progressValue = 0; 

    openfileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            this.fileData = {
                filename: file.name,
                base64: base64,
                recordId: this.recordId,
            };
            console.log('File data prepared:', this.fileData);
        };

        reader.readAsDataURL(file);
    }

    handleClick() {
        if (!this.fileData) {
            this.toast('No file selected or file data is missing', 'error');
            return;
        }

        const { base64, filename, recordId } = this.fileData;


        this.progressValue = 0;


        const progressInterval = setInterval(() => {
            if (this.progressValue < 90) {
                this.progressValue += 10; 
            } else {
                clearInterval(progressInterval); 
            }
        }, 200); 

     
        uploadFile({ base64, filename, recordId })
            .then((result) => {
                clearInterval(progressInterval); 
                this.progressValue = 100; 
                this.fileData = null;
                this.toast(`File uploaded successfully: ${result}`, 'success');
            })
            .catch((error) => {
                clearInterval(progressInterval); 
                console.error('Error uploading file:', error);
                this.toast('Error uploading file. Check console for details.', 'error');
            });
    }

    toast(message, variant) {
        const toastEvent = new ShowToastEvent({
            title: 'File Upload',
            message: message,
            variant: variant,
        });
        this.dispatchEvent(toastEvent);
    }
}

