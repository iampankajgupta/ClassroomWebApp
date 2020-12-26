const pool = require('../../config/database')
module.exports = {
    create: (data, callBack) => {
        pool.query(`insert into users (name,email,password) values(?,?,?)`,
            [
                data.name,
                data.email,
                data.password,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results);
            }
        );
    },
    // since we don't have any paramter to pass i.e [] array 
    // getUsers: callBack => {
    //     pool.query('select id,firstName,lastName,gender,email,password,number from users', [], (error, results, fields) => {
    //         if (error) {
    //             return callBack(error);
    //         }
    //         return callBack(null, results);
    //     });
    // },
    // since the password is encrypted we will comapre by bcrypt method compare sync

    getEmail: (email, callBack) => {
        pool.query(`select * from users where email=?`, [email], (error, results, fields) => {

            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]); // since we need to check the password props of this result
        });

    },


    checkUserExists: (email, callBack) => {
            pool.query(`select email from users where email=?`, email, (error, results, fields) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]); // since we need to check the password props of this result
            });
        }
        ,
    uploadImage: (data, callBack) => {
        pool.query('update users set profile_pic=? where id=?', [data.profile_pic, data.id], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results); 
        });
    }
};