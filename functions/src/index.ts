// import { onRequest } from 'firebase-functions/v2/https'
// import * as logger from 'firebase-functions/logger'

import * as functions from 'firebase-functions'
import * as express from 'express'
import {
  addEntry,
  deleteEntry,
  getAllEntries,
  updateEntry,
} from './entryController'

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', { structuredData: true })
//   response.send('Hello from Firebase!')
// })

const app = express()
//param to allow cors policy for fecthing data at front
const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => res.status(200).send('Bonjour la team, from Bamba!'))
app.post('/entries', addEntry)
app.get('/entries', getAllEntries)
app.patch('/entries/:entryId', updateEntry)
app.delete('/entries/:entryId', deleteEntry)


exports.app = functions.https.onRequest(app)
