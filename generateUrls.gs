function generateUrls() {
  var wb = SpreadsheetApp.getActive();
  var sheet = wb.getSheetByName("Sheet1");
  var data = wb.getDataRange().getValues();
  
  var FIRST_ROW = 1;
  var LAST_ROW = sheet.getLastRow();
  
  var form = FormApp.openByUrl(wb.getFormUrl());
  var items = form.getItems();
  
  var get_column_for_item = function (item_idx) {
    return item_idx + 2;
  };
  
  var URL_COL = 6;  // todo: needs to be determined by a column named "url"
  
  for (var i = FIRST_ROW; i < data.length; i++) {
    var formResponse = form.createResponse();
    
    items.forEach(function (e, idx, arr) {
      var formItem = e.asTextItem();
      var val = get_column_for_item(idx);
      var _resp = data[i][val];
      var response = formItem.createResponse(_resp);
      formResponse.withItemResponse(response);
    });
      
    var url = formResponse.toPrefilledUrl();
    sheet.getRange(i + 1, URL_COL).setValue(url);
  }
}
