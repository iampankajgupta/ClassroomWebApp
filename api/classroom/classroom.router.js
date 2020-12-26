const {
    createClass,
    getUserRooms,
    getClassMembers,
    joinClass,
    getClassData,
    showPosts,
    insertJoinMember,
    onPost,
    onComment,
    getAdmin,
    getClassInfo,
    updateRoomInfo,
    showUpdatedPosts,
    deletePost,
    deleteNonadminPost,
    Unenroll,
    checkRecordExits,
    EditPost,
    getNewPost,
    deleteComment,
    deleteNonadminComment,
    EditComment,getNewComment
} = require('./claassroom.controller');

const router = require('express').Router();

// const router = express.Router();

router.get('/home/user/:id', getUserRooms);
router.get('/home/class/:class_id', getClassData);

router.post('/home/class/class_info', getClassInfo);
router.post('/home/createClass', createClass);
router.get('/home/joinClass', joinClass);

router.post('/home/joinClass/checkRecordExists', checkRecordExits);

router.post('/home/joinMember', insertJoinMember);
router.post('/home/class/:class_id/newPost', onPost);
router.get('/home/class/:class_id/Allposts', showPosts);

router.delete('/home/class/deletePost', deletePost);

router.put('/home/class/deleteNonadminPost', deleteNonadminPost);




router.put('/home/class/post/deleteNonadminComment', deleteNonadminComment);

router.delete('/home/class/post/deleteComment', deleteComment);

router.put('/home/class/post/editComment', EditComment);














router.delete('/home/class/Unenroll', Unenroll);

router.put('/home/class/updatePost', EditPost);

router.get('/home/class/:class_id/AllUpdatedposts', showUpdatedPosts);

router.get('/home/class/:class_id/class_members', getClassMembers);
router.post('/home/class/getNewPost', getNewPost);

router.post('/home/class/post/getNewComment',getNewComment)
router.post('/home/class/:class_id/onComment', onComment);

router.put('/home/class/update_room_info', updateRoomInfo)

router.get('/home/class/:class_id/admin', getAdmin);

// router.post('/upload',uploadImage);

module.exports = router;