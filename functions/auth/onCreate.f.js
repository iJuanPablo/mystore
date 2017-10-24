const functions = require('firebase-functions')
const admin = require('firebase-admin')
try {admin.initializeApp(functions.config().firebase)} catch (e) {}

const ref = admin.database().ref()

exports = module.exports = functions.auth.user().onCreate(event => {
    const uid = event.data.uid
    const email = event.data.email
    const photoUrl = event.data.photoUrl || ''
    const newUserRef = ref.child(`/users/${uid}`)
    return newUserRef.set({
        photoUrl: photoUrl,
        email: email
    })
});
