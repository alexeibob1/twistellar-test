import { LightningElement, wire, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from "lightning/uiObjectInfoApi";

import CASE_OBJECT from "@salesforce/schema/Case";

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
    { label: 'Created at'},
];

export default class ServiceCaseQueueFiltered extends NavigationMixin(LightningElement) {
    columns = COLUMNS;

    @wire(getUserCases)
    cases;

    @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: STATUS_FIELD })
    statuses;

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
}