const {
    createClass,
    getUserRooms,
    getClassMembers,
    checkCodeValidity,
    insertDuringJoinMember,
    insertDuringCreateClass,
    onComment,
    onPost,
    showPosts,
    getClassData,
    showComments,
    checkRecordExits,
    getClassId,
    getAdmin,
    getNewPost,
    getClassInfo,
    updateRoomInfo,
    deletePost,
    deleteNonadminPost,
    showUpdatedPosts,
    Unenroll,
    EditPost,
    deleteNonadminComment,
    deleteComment,
    EditComment,showUpdatedComments,getNewComment
} = require('./classroom.service')
var async = require("async");

const {
    generate
} = require('randomstring');

module.exports = {
    createClass: (req, res) => {
        const body = req.body;
        body.code = generate(7);
        createClass(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            insertDuringCreateClass((err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                getClassId((err, results) => {
                    if (err) {
                        return res.send(err);
                    }
                    console.log(results);

                    return res.send(results);
                });
            });
        });
    },
    joinClass: (req, res) => {
        checkCodeValidity(req.query.code, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            if (results.length === 0) {
                return res.status(400).send("Classroom Code is Invalid");
            }
            return res.send(results[0]);
        });
    },

    checkRecordExits: (req, res) => {
        let body = req.body;
        checkRecordExits(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            if (result.length == 0) {
                return res.send(false); // 1 == User Not   Exists 
            } else {
                return res.send(true); ///  0 == User  Exists 
            }

        });
    },


    onPost: (req, res) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        let body = req.body;
        body.date = today;

        onPost(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(result);
        });
    },

    onComment: (req, res) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        let body = req.body;
        body.date = today;
        onComment(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error Occured During Comment");
            }
            return res.status(200).send(result);
        });
    },

    getUserRooms: (req, res) => {
        //   const body = req.body;
        const id = req.params.id;
        getUserRooms(id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.status(200).send(result);
        });
    },
    getClassMembers: (req, res) => {
        getClassMembers(req.body, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(err);
            };
            return res.status(200).send(result);
        });
    },

    showPosts: (req, res) => {
        let id = req.params.class_id;
        showPosts(id, function (err, posts) {
            if (err) {
                console.log(err);
                return res.send(err);
            }

            async.forEachOf(posts, (post, i, inner_callback) => {
                showComments(post.id, function (err, comments) {
                    if (err) {
                        console.log(err);
                        inner_callback(err);
                    }
                    posts[i]['comment'] = comments;
                    inner_callback(null);
                })
            }, function (err) {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    return res.status(200).send(posts);
                }
            })
        });
    },
    showUpdatedPosts: (req, res) => {
        let id = req.params.class_id;
        showUpdatedPosts(id, function (err, posts) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            async.forEachOf(posts, (post, i, inner_callback) => {
                showUpdatedComments(post.id, function (err, comments) {
                    if (err) {
                        console.log(err);
                        inner_callback(err);
                    }
                    posts[i]['comment'] = comments;
                    inner_callback(null);
                })
            }, function (err) {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    return res.status(200).send(posts);
                }
            })
        });

    },

    getClassData: (req, res) => {
        let class_id = req.params.class_id;
        getClassData(class_id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.status(200).send(result);
        })
    },

    insertJoinMember: (req, res) => {
        let body = req.body;
        insertDuringJoinMember(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.status(200).send("Inserted Successfully ");
        });

    },

    getClassMembers: (req, res) => {
        let class_id = req.params.class_id;
        getClassMembers(class_id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.status(200).send(result);
        })
    },

    getAdmin: (req, res) => {
        let class_id = req.params.class_id;
        getAdmin(class_id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.status(200).send(result);
        })
    },
    getNewPost: (req, res) => {
        const body = req.body;
        getNewPost(body.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.status(200).send(results);
        });
    },

    getNewComment:(req,res)=>{
        const body = req.body;
        getNewComment(body.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.status(200).send(results);
        });
    },

    getClassInfo: (req, res) => {
        const body = req.body;
        getClassInfo(body.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.status(200).send(results);
        })
    },

    updateRoomInfo: (req, res) => {
        updateRoomInfo(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }

            return res.status(200).send(results);
        })
    },

    deletePost: (req, res) => {
        deletePost(req.body, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(results);
        })
    },

    deleteNonadminPost: (req, res) => {
        const body = req.body;
        deleteNonadminPost(body.post_id, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(results);
        })
    },

    Unenroll: (req, res) => {
        Unenroll(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(results);
        })
    },
    EditPost: (req, res) => {
        EditPost(req.body, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(results);
        })
    },

    deleteNonadminComment: (req, res) => {
        const body = req.body;
        deleteNonadminComment(body.comment_id, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(results);
        })
    },

    deleteComment: (req, res) => {
        deleteComment(req.body, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(results);
        })
    },

    EditComment: (req, res) => {
        const body = req.body;
        EditComment(body, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(results);
        })
    }

}