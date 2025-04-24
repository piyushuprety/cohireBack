const isValidGoogleSheetsUrl = (url) => {
  const pattern = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  return pattern.test(url);
};

const getSpreadsheetId = (url) => {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

const getCSVExportUrl = (spreadsheetId) => {
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;
};

const parseCSVToTasks = (csvData, user) => {
  const lines = csvData.split('\n');
  if (lines.length < 2) return []; 

  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const [title, description, dueDate, status] = line.split(',').map(field => field.trim());
      return {
        title: title || 'Untitled Task',
        description: description || '',
        dueDate: dueDate ? new Date(dueDate) : new Date().toLocaleDateString(),
        status: status?status:'pending',
        user:user
      };
    });
};

module.exports = {
  isValidGoogleSheetsUrl,
  getSpreadsheetId,
  getCSVExportUrl,
  parseCSVToTasks
}; 