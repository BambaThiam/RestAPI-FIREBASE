// import { onRequest } from 'firebase-functions/v2/https'
// import * as logger from 'firebase-functions/logger'

import * as functions from 'firebase-functions'
import * as express from 'express'

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', { structuredData: true })
//   response.send('Hello from Firebase!')
// })

const app = express()

app.get('/', (req, res) => res.status(200).send('Bonjour la team, from Bamba!'))

exports.app = functions.https.onRequest(app)
