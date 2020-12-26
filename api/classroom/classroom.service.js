    const pool = require('../../config/database');
    const {
        resolve
    } = require('path');

    module.exports = {
        // Feature Completed !!!!!
        createClass: (data, callback) => {
            pool.query(`insert into class(class_name,section,subject,room,code,admin_id) values(?,?,?,?,?,?)`,
                [
                    data.class_name,
                    data.section,
                    data.subject,
                    data.room,
                    data.code,
                    data.admin_id
                ], (error, results, fields) => {
                    if (error) {
                        return callback(error)
                    }
                    return callback(null, results);
                });
            // insert the name of members
        },
        // Feature Completed !!!!! !!!!!
        getUserRooms: (user_id, callback) => {
            pool.query(`select class.id,class.class_name,class.admin_id,users.name,class.section,class.subject,class.room from class join class_members on class_members.user_id=? and class_members.class_id = class.id join users on class.admin_id = users.id`,
                [user_id], (error, results, fields) => {

                    if (error) {
                        console.log(error);
                        return callback(error);
                    }
                    return callback(null, results);
                });
        },
        // Feature Completed !!!!!
        getClassMembers: (class_id, callback) => {
            pool.query(`select users.name,users.id from class_members JOIN class on class_members.class_id = ? and class_members.class_id = class.id join users on class_members.user_id = users.id `, [class_id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
        },
        // Feature Completed !!!!!
        onComment: (data, callback) => {
            pool.query(`insert into comments(class_id,post_id,user_id,comment,date) values(?,?,?,?,?)`, [data.class_id, data.post_id, data.user_id, data.comment, data.date], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
        },
        // Feature Completed !!!!!
        onPost: (data, callback) => {
            pool.query(`insert into posts(class_id , post , user_id , date) values(?,?,?,?)`,
                [data.class_id, data.post, data.user_id, data.date], (error, results, fields) => {
                    if (error) return callback(error);
                    return callback(null, results);
                });
        },
        // Feature Completed !!!!!
        checkCodeValidity: (code, callback) => {
            pool.query("SELECT id from class where code=?", code, (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
        },
        // Feature Completed !!!!!
        insertDuringJoinMember: (data, callback) => {
            pool.query('insert into class_members (class_id,user_id) values(?,?)', [data.class_id, data.user_id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
        },
        // Feature Completed !!!!!
        insertDuringCreateClass: (callback) => {
            let sql = "insert into class_members (class_id,user_id) SELECT id,admin_id FROM class ORDER BY id DESC LIMIT 1 ; "
            pool.query(sql,
                [], (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, results);
                });
        },

        // Feature Completed !!!!!
        showPosts: (class_id, callback) => {
            pool.query(`SELECT users.name,posts.id,posts.post,posts.date from posts join class on posts.class_id =? and posts.class_id = class.id join users on posts.user_id = users.id order by posts.id desc`,
                [class_id],
                (error, results, field) => {
                    if (error) {
                        return callback(error);
                    }

                    return callback(null, results);
                });
        },
        // Feature Completed 
        showComments: (post_id, callback) => {
            pool.query("SELECT comments.id,users.name,comments.comment,comments.date,comments.user_id from comments join posts on comments.post_id = ? and comments.post_id = posts.id JOIN users on comments.user_id = users.id",
                post_id,
                (error, results, field) => {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, results);
                });

        },

        showUpdatedPosts: (class_id, callback) => {
            pool.query(`SELECT users.name,posts.id,posts.post,posts.date from posts join class on posts.class_id =? and posts.class_id = class.id join users on posts.user_id = users.id and posts.isDeleted = 0 order by posts.id desc`,
                [class_id],
                (error, results, field) => {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, results);
                });
        },

        showUpdatedComments: (post_id, callback) => {
            pool.query('SELECT comments.id,users.name,comments.comment,comments.date,comments.user_id from comments join posts on comments.post_id = ? and comments.post_id = posts.id and comments.isDeleted = 0 JOIN users on comments.user_id = users.id', post_id, (error, results, field) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
        },

        // Feature Completed !!!!!
        getClassData: (class_id, callback) => {
            pool.query('select class_name,code,subject,admin_id from class where id=? ', [class_id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            })
        },
        // Feature Completed !!!!!
        checkRecordExits: (data, callback) => {
            pool.query('select class_id,user_id from class_members where class_id=? and user_id=?', [data.class_id, data.user_id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })

        },
        // Feature Completed !!!!!
        getClassId: (callback) => {
            pool.query('SELECT class_id,user_id FROM class_members ORDER BY id DESC LIMIT 1;', [], (error, results, field) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })
        },
        // Feature Completed !!!!!
        getAdmin: (class_id, callback) => {
            pool.query("select users.name from users JOIN class WHERE class.admin_id=users.id and  class.id = ?", class_id, (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })

        },
        // Feature Completed !!!!!
        getNewPost: (id, callback) => {
            pool.query("select users.name,posts.id,posts.post,posts.date from posts JOIN users where posts.user_id = users.id and posts.id = ?", id, (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })
        },

        getNewComment: (id, callback) => {
            pool.query("select users.name,comments.comment,comments.id,comments.date,comments.post_id from comments join users on comments.user_id = users.id and comments.id=? ", id, (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            })
        },
        getClassInfo: (class_id, callback) => {
            pool.query("select class_name,section,subject,room from class where id=?", class_id, (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            })
        },

        updateRoomInfo: (data, callback) => {
            pool.query("update class set class_name = ?,section=?,subject=?,room=? where id=? ",
                [
                    data.class_name,
                    data.section,
                    data.subject,
                    data.room,
                    data.id
                ], (error, results, fields) => {
                    if (error) {
                        return callback(error)
                    }
                    return callback(null, results);
                });
        },

        /// Pending 
        deletePost: (data, callback) => {
            pool.query("delete posts,comments from posts join comments on posts.id = comments.post_id where posts.id=?", [data.id], (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return callback(error);
                }
                return callback(null, results);
            })
        },

        // Done 
        deleteNonadminPost: (post_id, callback) => {
            pool.query('update posts set isDeleted = 1 where id=?', post_id, (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })
        },
        // Pending 
        Unenroll: (data, callback) => {
            pool.query('delete from class_members where class_id=? and user_id=?', [data.class_id, data.user_id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })
        },
// Done
        EditPost: (data, callback) => {
            pool.query("update posts set post=? where id=?", [data.post, data.id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })
        },
// Pending
        EditComment: (data, callback) => {
            pool.query("update comments set comment=? where id=?", [data.comment, data.id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })
        },
// Pending 
        deleteComment: (data, callback) => {
            pool.query("DELETE from comments WHERE id=?",[data.id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })
        },
// DOne 
        deleteNonadminComment: (comment_id, callback) => {
            pool.query("update comments set isDeleted=1 where id=?", comment_id, (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })
        },

        uploadImage:()=>{

        }


    }