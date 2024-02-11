public without sharing class AccountCasesPdfCtrl {
    public static List<Case> getAccountCasesPrevWeek() {
        return [
            SELECT Account.Name, Account.Owner.Name, CaseNumber, Status, Priority, Origin, CreatedDate
            FROM Case
            WHERE CreatedDate = LAST_WEEK 
            WITH SECURITY_ENFORCED
            ORDER BY AccountId ASC
        ];
    }
}