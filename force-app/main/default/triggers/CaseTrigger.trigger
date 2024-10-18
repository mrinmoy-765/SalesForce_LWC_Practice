trigger CaseTrigger on Case (before insert, before update) {
               CaseTriggerHandler.UpdateContactInfoInCase(Trigger.isBefore, Trigger.isInsert, Trigger.isUpdate, Trigger.new);
}