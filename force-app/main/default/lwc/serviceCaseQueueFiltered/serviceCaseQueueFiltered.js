import { LightningElement, wire } from 'lwc';

import NUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import OWNER_FIELD from '@salesforce/schema/Case.OwnerId';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority';
import ORIGIN_FIELD from '@salesforce/schema/Case.Origin';
import CREATEDDATE_FIELD from '@salesforce/schema/Case.ContactId';

import getUserCases  from '@salesforce/apex/ServiceCaseQueueService.getUserCases';

const COLUMNS = [
    { label: 'Case Number', fieldName: NUMBER_FIELD.fieldApiName, type: 'text' },
    { label: 'Assignee', fieldName: OWNER_FIELD.fieldApiName, type: 'text' },
    { label: 'Case Status', fieldName: STATUS_FIELD.fieldApiName, type: 'text' },
    { label: 'Priority', fieldName: PRIORITY_FIELD.fieldApiName, type: 'text' },
    { label: 'Origin', fieldName: ORIGIN_FIELD.fieldApiName, type: 'text' },
];

export default class ServiceCaseQueueFiltered extends LightningElement {
    columns = COLUMNS;
    @wire(getUserCases, {})
    cases;
}