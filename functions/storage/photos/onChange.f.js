const functions = require('firebase-functions')
const gcs = require('@google-cloud/storage')()
const spawn = require('child-process-promise').spawn
const path = require('path')
const os = require('os')
const fs = require('fs')
const UUID = require('uuid-v4')
const admin = require('firebase-admin')
try {admin.initializeApp(functions.config().firebase)} catch (e) {}

const ref = admin.database().ref()

exports = module.exports = functions.storage.object().onChange(event => {
    const object = event.data
    const fileBucket = object.bucket
    const filePath = object.name
    const contentType = object.contentType
    const resourceState = object.resourceState
    const metageneration = object.metageneration

    if (!contentType.startsWith('image/')) {
        console.log('This is not an image.')
        return false
    }

    const fileName = path.basename(filePath)
    const onlyName = fileName.slice(0, fileName.lastIndexOf('.'))
    const ext = fileName.slice(fileName.lastIndexOf('.') + 1)
    if (onlyName.endsWith('_thumb')) {
        console.log('Already a Thumbnail.')
        return false
    }
    
    if (resourceState === 'not_exists') {
        console.log('This is a deletion event.')
        return false
    }

    if (resourceState === 'exists' && metageneration > 1) {
        console.log('This is a metadata change event.')
        return false
    }
   
    const bucket = gcs.bucket(fileBucket)
    const tempFilePath = path.join(os.tmpdir(), fileName)
    const thumbFileName = `${onlyName}_thumb.${ext}`
    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName)
    const uuid = UUID()
    return bucket.file(filePath).download({
        destination: tempFilePath
    }).then(
        () => {
            console.log('Image downloaded locally to: ', tempFilePath)
            return spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath])
        }
    ).then(
        () => {
            console.log('Thumbnail created at: ', tempFilePath)
            return bucket.upload(tempFilePath, 
                {destination: thumbFilePath,
                metadata: {
                    metadata: {
                        firebaseStorageDownloadTokens: uuid
                    }
                }})
        }
    ).then(
        fileData => {
            console.log('Thumbnail uploaded to: ', thumbFilePath)
            fs.unlinkSync(tempFilePath)

            const file = fileData[0]
            const thumbUrl = 'https://firebasestorage.googleapis.com/v0/b/mystore-dev.appspot.com/o/' + encodeURIComponent(file.name) + '?alt=media&token=' + uuid
            console.log(thumbUrl)
            const refChild = path.dirname(filePath)
            return ref.child(`${refChild}`).update({
                thumbUrl: thumbUrl
              })
        }
    ).then(
        () => {
            console.log('Url Updated')
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
})
