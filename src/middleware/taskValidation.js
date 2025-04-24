const validateTaskInput = (req, res, next) => {
  const { title } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  const { dueDate } = req.body;
  if (dueDate) {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid due date format' });
    }
  }

  next();
};

const validateTaskId = (req, res, next) => {
  const { id } = req.params;
  
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({ message: 'Invalid task ID format' });
  }

  next();
};

module.exports = {
  validateTaskInput,
  validateTaskId
}; 