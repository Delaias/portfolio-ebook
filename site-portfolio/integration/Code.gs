// Google Apps Script. Defina WEBHOOK_TOKEN nas Propriedades do script.
// Implante como aplicativo da Web, executar como você, acesso Qualquer pessoa.
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var props = PropertiesService.getScriptProperties();
    var expected = props.getProperty('WEBHOOK_TOKEN');
    var data = JSON.parse(e.postData.contents || '{}');
    if (!expected || data.token !== expected) return reply({ok:false});
    if (!/^[a-f0-9-]{36}$/.test(data.id || '') || typeof data.marketing !== 'boolean' || !/^\S+@[^\s@]+\.[^\s@]+$/.test(data.email || '') || !/^(?:55)?\d{10,11}$/.test(data.phone || '')) return reply({ok:false});
    var sheetId = props.getProperty('SPREADSHEET_ID');
    var spreadsheet = sheetId ? SpreadsheetApp.openById(sheetId) : SpreadsheetApp.create('Leads — Portfólio Fod@');
    if (!sheetId) props.setProperty('SPREADSHEET_ID',spreadsheet.getId());
    var sheet = spreadsheet.getSheets()[0];
    if (!sheet.getLastRow()) {
      sheet.setName('Leads');
      sheet.appendRow(['ID','Data UTC','E-mail','Telefone','Autoriza novidades','Versão do consentimento']);
      sheet.getRange(1,1,1,6).setBackground('#0e2bf3').setFontColor('#ffffff').setFontWeight('bold');
      sheet.setFrozenRows(1); sheet.autoResizeColumns(1,6);
    }
    // Identificador idempotente: reenvios não criam linhas duplicadas.
    if (sheet.getLastRow()>1 && sheet.getRange(2,1,sheet.getLastRow()-1,1).createTextFinder(data.id).matchEntireCell(true).findNext()) return reply({ok:true});
    var safe = function(value) { return String(value || '').replace(/^[=+@-]/,"'$&"); };
    sheet.appendRow([safe(data.id),safe(data.createdAt),safe(data.email),safe(data.phone),data.marketing?'Sim':'Não',safe(data.consentVersion)]);
    return reply({ok:true});
  } catch (err) { return reply({ok:false}); }
  finally { lock.releaseLock(); }
}
function reply(data) { return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON); }
