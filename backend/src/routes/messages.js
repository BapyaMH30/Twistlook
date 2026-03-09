const express = require('express');
const {
  getConversations,
  getMessagesWithUser,
  sendMessage,
  markAsRead,
  deleteMessage,
  getUnreadCount
} = require('../controllers/messageController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.get('/', getConversations);
router.get('/unread/count', getUnreadCount);
router.get('/:userId', getMessagesWithUser);
router.post('/:userId', sendMessage);
router.put('/:messageId/read', markAsRead);
router.delete('/:messageId', deleteMessage);

module.exports = router;
