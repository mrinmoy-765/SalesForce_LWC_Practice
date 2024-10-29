import { LightningElement } from 'lwc';

export default class ToDoApplication extends LightningElement {
    taskname = "";
    taskdate = "";
    incompletetask = [];
    completetask = [];

    changeHandler(event) {
        const { name, value } = event.target;
        if (name === "taskname") {
            this.taskname = value;
        } else if (name === "taskdate") {
            this.taskdate = value;
        }
    }

    resetHandler() {
        this.taskname = "";
        this.taskdate = null;
    }

    addTaskHandler() {
        // If the end date is missing, populate today's date as the end date
        if (!this.taskdate) {
            this.taskdate = new Date().toISOString().slice(0, 10);
        }

        if (this.validateTask()) {
            this.incompletetask = [
                ...this.incompletetask,
                {
                    taskname: this.taskname,
                    taskdate: this.taskdate,
                }
            ];

            this.resetHandler();
            let sortedArray = this.sortTask(this.incompletetask);
            this.incompletetask = [...sortedArray];
            console.log("this.incompletetask", this.incompletetask);

        }
    }

    validateTask() {
        let isValid = true;
        const element = this.template.querySelector(".taskname");

        if (!this.taskname) {
            isValid = false;
        } else {
            let taskItem = this.incompletetask.find(
                (currItem) =>
                    currItem.taskname === this.taskname &&
                    currItem.taskdate === this.taskdate
            );

            if (taskItem) {
                isValid = false;
                if (element) {
                    element.setCustomValidity("Task is Already Available");
                }
            }
        }

        if (isValid && element) {
            element.setCustomValidity("");
        }

        if (element) {
            element.reportValidity();
        }

        return isValid;
    }

    sortTask(inputArr) {
        let sortedArray = inputArr.sort((a, b) => {
            const dateA = new Date(a.taskdate);
            const dateB = new Date(b.taskdate);
            return dateA - dateB;
        });

        return sortedArray;
    }

    removalHandler(event) {
        //from incomplete task array, remove the item
        let index = event.target.name;
        this.incompletetask.splice(index, 1);
        let sortedArray = this.sortTask(this.incompletetask);
        this.incompletetask = [...sortedArray];
        console.log("this.incompletetask", this.incompletetask);
    }

    completeTaskHandler(event) {
        //remove the entry from incomplete item
        let index = event.target.name;
        this.refreshData(index);
    }

    dragStartHandler(event) {
        event.dataTransfer.setData("index", event.target.dataset.item)
    }

    allowDrop(event) {
        event.preventDefault();
    }

    dropElementHandler(event) {
        let index = event.dataTransfer.getData("index");
        this.refreshData(index);
    }

    refreshData(index) {
        let removeItem = this.incompletetask.splice(index, 1);
        let sortedArray = this.sortTask(this.incompletetask);
        this.incompletetask = [...sortedArray];
        console.log("this.incompletetask", this.incompletetask);
        //add the same entry in complete item
        this.completetask = [...this.completetask, removeItem[0]];
    }
}
