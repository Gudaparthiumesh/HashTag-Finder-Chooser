({
    getUserKeyStroke : function(cmp, evt, hlp) {
        if(evt.keyCode == 35){
            cmp.set('v.openHashTagModel',true);
            let button = cmp.find('disablebuttonid');
            button.set('v.disabled',true);
        }
    },
    doInit : function(cmp, evt, hlp) {
        var action = cmp.get("c.getAllHashTags");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS"){
                cmp.set('v.dataColumns', [
                    {label:"Tag Name", fieldName:"Tag_Name__c",type:"text"}
                ]); 
                cmp.set("v.hashTagsdata", response.getReturnValue());
                cmp.set("v.hashTagsdataDup", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    getSelectedHashTag: function(cmp, evt, hlp) {
        var selectedRows = evt.getParam('selectedRows');
        var setTagName = [];
        var formattedStr= '';
        let button = cmp.find('disablebuttonid');
        if(selectedRows.length > 0){
            for ( var i = 0; i < selectedRows.length; i++ ) {
                setTagName.push(selectedRows[i].Tag_Name__c);
                var arrayString= setTagName.join(); 
                formattedStr= arrayString.replace(/,/g," #");
                button.set('v.disabled',false);
            }
        }else{
            button.set('v.disabled',true);
        }
        cmp.set("v.UserSelections", formattedStr);
    },
    insertSelectedTags : function(cmp, evt, hlp) {
        var userInput= cmp.find('UserInput').get('v.value');
        var usrSel = cmp.get("v.UserSelections");
        var finalUpdatedText= userInput + usrSel +' ';
        cmp.set("v.UserInputText", finalUpdatedText);
        cmp.set("v.openHashTagModel",false)
        cmp.set("v.hashTagsdata", cmp.get("v.hashTagsdataDup"));
        cmp.set("v.searchTag",null);
    },
    onChangeSearchTag: function(cmp, evt, hlp) {
        var action = cmp.get("v.hashTagsdataDup"),
            searchfilter = cmp.get("v.searchTag"),
            results = action, regex;
        try {
            regex = new RegExp(searchfilter, "i");
            results = action.filter(
                row => regex.test(row.Tag_Name__c)
            );
        } catch(e) {
        }
        cmp.set("v.hashTagsdata", results);
    }
})