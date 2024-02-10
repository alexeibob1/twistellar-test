import { LightningElement, wire, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import { updateRecord } from 'lightning/uiRecordApi';

import { refreshApex } from '@salesforce/apex';

import { ShowToastEvent } from "lightning/platformShowToastEvent";

import CASE_OBJECT from "@salesforce/schema/Case";

import ID_FIELD from '@salesforce/schema/Case.Id';
import NUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import OWNER_ID_FIELD from '@salesforce/schema/Case.OwnerId';
import OWNER_FIRSTNAME_FIELD from '@salesforce/schema/User.FirstName';
import OWNER_LASTNAME_FIELD from '@salesforce/schema/User.LastName';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority';
import ORIGIN_FIELD from '@salesforce/schema/Case.Origin';
import CREATED_DATE_FIELD from '@salesforce/schema/Case.CreatedDate';

import getUserCases from '@salesforce/apex/ServiceCaseQueueService.getUserCases';

const COLUMNS = [
    { label: 'Case Number'},
    { label: 'Assignee'},
    { label: 'Case Status'},
    { label: 'Priority'},
    { label: 'Origin'},
];

export default class ServiceCaseQueueFiltered extends NavigationMixin(LightningElement) {
    columns = COLUMNS;

    @wire(getUserCases)
    cases;

    @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: STATUS_FIELD })
    statuses;

    @track 
    isComponentUpdating = false;

    navigateToCaseRecord(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.caseid,
                objectApiName: 'Case',
                actionName: 'view',
            },
        });
    }

    handleStatusChange(event) {
        this.isComponentUpdating = true;
        const fields = {};
        fields[ID_FIELD.fieldApiName] = event.target.dataset.caseid;
        fields[STATUS_FIELD.fieldApiName] = event.detail.value;
        const recordInput = { fields };
        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Success",
                        message: "Case status updated",
                        variant: "success",
                    })
                );
                refreshApex(this.cases).finally(() => {
                    this.isComponentUpdating = false;
                });
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error updating case status",
                        message: error.body.message,
                        variant: "error",
                    })
                )
                refreshApex(this.cases).finally(() => {
                    this.isComponentUpdating = false;
                });
            });
    }

    handleRefresh() {
        this.isComponentUpdating = true;
        refreshApex(this.cases).finally(() => {
            this.isComponentUpdating = false;
        });
    }
}