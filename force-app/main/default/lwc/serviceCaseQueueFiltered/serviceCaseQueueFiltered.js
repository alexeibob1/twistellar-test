import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import NUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import OWNER_ID_FIELD from '@salesforce/schema/Case.OwnerId';
import OWNER_FIRSTNAME_FIELD from '@salesforce/schema/User.FirstName';
import OWNER_LASTNAME_FIELD from '@salesforce/schema/User.LastName';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority';
import ORIGIN_FIELD from '@salesforce/schema/Case.Origin';
import CREATED_DATE_FIELD from '@salesforce/schema/Case.ContactId';

import getUserCases  from '@salesforce/apex/ServiceCaseQueueService.getUserCases';

const COLUMNS = [
    { label: 'Case Number', fieldName: NUMBER_FIELD.fieldApiName, type: 'text' },
    { label: 'Assignee', fieldName: OWNER_ID_FIELD.fieldApiName, type: 'text' },
    { label: 'Case Status', fieldName: STATUS_FIELD.fieldApiName, type: 'text' },
    { label: 'Priority', fieldName: PRIORITY_FIELD.fieldApiName, type: 'text' },
    { label: 'Origin', fieldName: ORIGIN_FIELD.fieldApiName, type: 'text' },
];

export default class ServiceCaseQueueFiltered extends LightningElement {
    columns = COLUMNS;

    @wire(getUserCases, {})
    cases;
}