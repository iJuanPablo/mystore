const functions = require('firebase-functions')
const admin = require('firebase-admin')
try {admin.initializeApp(functions.config().firebase)} catch (e) {}

const ref = admin.database().ref()

exports = module.exports = functions.auth.user().onDelete(event => {
    const uid = event.data.uid
    const userRef = ref.child(`/users/${uid}`)
    return userRef.update({
        isDeleted: true
    })
});
