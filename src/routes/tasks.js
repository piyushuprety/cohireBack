const express = require('express');
const router = express.Router();
const { validateSheetUrl } = require('../middleware/sheetValidation');
const { importTasks } = require('../controllers/sheetController');
const { validateTaskInput, validateTaskId } = require('../middleware/taskValidation');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  toggleTaskCompletion
} = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.use(auth)

router.get('/', getAllTasks);
router.post('/import', validateSheetUrl, importTasks);
router.post('/', validateTaskInput, createTask);
router.get('/:id', validateTaskId, getTaskById);
router.put('/:id', validateTaskId, validateTaskInput, updateTask);
router.delete('/:id', validateTaskId, deleteTask);
router.patch('/:id/toggle', validateTaskId, toggleTaskCompletion);

module.exports = router; 
