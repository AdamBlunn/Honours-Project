const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdmin = functions.https.onCall((data, context) => {
    //get user info & add admin status claim
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth.setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: `${data.email} was made into an administrator`
        }
    }).catch(err => {
        return err
    })

})
