const { isValidGoogleSheetsUrl, getSpreadsheetId } = require('../utils/sheetHelpers');

const validateSheetUrl = (req, res, next) => {
  const { sheetUrl } = req.body;

  if (!sheetUrl) {
    return res.status(400).json({ message: 'Sheet URL is required' });
  }

  if (!isValidGoogleSheetsUrl(sheetUrl)) {
    return res.status(400).json({ message: 'Invalid Google Sheets URL' });
  }

  const spreadsheetId = getSpreadsheetId(sheetUrl);
  if (!spreadsheetId) {
    return res.status(400).json({ message: 'Could not extract spreadsheet ID from URL' });
  }

  req.spreadsheetId = spreadsheetId;
  next();
};

module.exports = {
  validateSheetUrl
}; 