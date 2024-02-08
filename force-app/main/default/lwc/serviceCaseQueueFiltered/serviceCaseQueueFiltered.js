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
import CREATED_DATE_FIELD from '@salesforce/schema/Case.CreatedDate';

import getUserCases from '@salesforce/apex/ServiceCaseQueueService.getUserCases';

const COLUMNS = [
    { label: 'Case Number', type: 'text' },
    { label: 'Assignee', type: 'text' },
    { label: 'Case Status', type: 'text' },
    { label: 'Priority', type: 'text' },
    { label: 'Origin', type: 'text' },
    { label: 'Created at', type: 'date' },
];

export default class ServiceCaseQueueFiltered extends LightningElement {
    columns = COLUMNS;

    @wire(getUserCases, {})
    cases;
}