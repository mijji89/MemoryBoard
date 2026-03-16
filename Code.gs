// FOLDER AND SHEET ID (change with your own IDs)
const FOLDER_ID = '1s2Zb4ZP8In2S2Mld7qb2SBn6JSsCgR_d';
const SHEET_ID = '1IHxHQ2L3PM87MNpoG_IvNm2rPvQub-z9_jag3P-3qEQ';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setTitle('Laurea Cover Girl 🎓');
}

function uploadMemory(data) {
  try {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    
    let fileUrl = '';
    let fileType = '';
    
    // Checks if there's a file to upload
    if (data.fileData && data.fileData.base64) {
      const decoded = Utilities.base64Decode(data.fileData.base64);
      const blob = Utilities.newBlob(decoded, data.fileData.mimeType, data.fileData.fileName);
      const file = folder.createFile(blob);
      
      // file visible for everyone
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      
      fileType = data.fileData.mimeType;
      
      
      // If it's an image, we use a trick to have the direct link (high quality thumbnail)
      if (fileType.startsWith('image/')) {
        fileUrl = "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w1000";
      } else {
        // If it's an audio, we open the native visualization in Drive
        fileUrl = "https://drive.google.com/file/d/" + file.getId() + "/view";
      }
    }
    
    //We use the date as a text for each memory uploaded
    const dataFormattata = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss");
    
    // Insert the new row in Google Sheet
    sheet.appendRow([
      data.nome, 
      data.messaggio, 
      fileUrl, 
      fileType,
      dataFormattata
    ]);
    
    return "OK";
  } catch (error) {
    return "Errore: " + error.toString();
  }
}

function obtainMemory() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheets()[0];

    const data = sheet.getDataRange().getDisplayValues(); 
    
    //if there's only a title or if it's empty
    if (data.length <= 1) {
      return [];
    }
    
    data.shift(); // remove title
    return data;
  } catch (e) {
    console.error("Errore nel recupero dati: " + e.toString());
    return [];
  }
}
