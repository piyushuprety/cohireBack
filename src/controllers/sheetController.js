const axios = require('axios');
const Task = require('../models/Task');
const { getCSVExportUrl, parseCSVToTasks } = require('../utils/sheetHelpers');

const importTasks = async (req, res) => {
  try {
    const { spreadsheetId } = req;

    const csvUrl = getCSVExportUrl(spreadsheetId);

    const response = await axios.get(csvUrl, {
      responseType: 'text',
      headers: {
        'Accept': 'text/csv',
      },
    });

    const tasks = parseCSVToTasks(response.data, req.user._id);


    tasks.map((task)=>{
      if(task?.dueDate == 'Invalid Date'){
        task.dueDate = new Date().toLocaleDateString()
      }
    })


    console.log("=> new",tasks)
    
    if (tasks.length === 0) {
      return res.status(400).json({ message: 'No valid tasks found in the sheet' });
    }

    console.log("========",tasks)

    const savedTasks = await Task.insertMany(tasks);

    res.status(201).json({
      message: `Successfully imported ${savedTasks.length} tasks`,
      tasks: savedTasks
    });

  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({
      message: 'Failed to import tasks from Google Sheets',
      error: error.message
    });
  }
};

module.exports = {
  importTasks
}; 