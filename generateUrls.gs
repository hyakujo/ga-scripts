function generateUrls() {
  var book = SpreadsheetApp.getActive();
  var sheet = book.getSheetByName("Sheet1");
  var data = sheet.getDataRange().getValues();
  
  var FIRST_ROW = 1;
  var LAST_ROW = sheet.getLastRow();
  
  var form = FormApp.openByUrl(book.getFormUrl());
  var items = form.getItems();
  
  var get_column_for_item = function (item_idx) {
    return item_idx + 1;
  };
  
  var URL_COL = 6;
  
  for (var i = FIRST_ROW; i < data.length; i++) {
    var formResponse = form.createResponse();
    
    items.forEach(function (e, idx, arr) {
      var formItem = e.asTextItem();
      var col = get_column_for_item(idx);
      var _resp = data[i][col];
      var response = formItem.createResponse(_resp);
      formResponse.withItemResponse(response);
    });
      
    var url = formResponse.toPrefilledUrl();
    sheet.getRange(i + 1, URL_COL).setValue(url);
  }
}


function onFormSubmit(e) {
  var email = e.namedValues['email'];
  var book = SpreadsheetApp.getActive();
  var sheet = book.getSheetByName("Sheet1");
  var data = book.getDataRange().getValues();
  var FIRST_ROW = 1;
  
  var email_col = 1;
  var _frow = data[0];
  
  for (var i = 0; i < _frow.length; i++) {
    if (_frow[i] == "email") {
      email_col = i;
      break;
    }
  }
  
  for (var i = FIRST_ROW; i < data.length; i++) {
    if (data[i][email_col] == email) {
      sheet.getRange(i, 1, 1, 5).setValues([e.values]);
      break;
    }
  }
  
  generateUrls();
}
