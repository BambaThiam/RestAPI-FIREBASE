import { Response } from 'express'
import { db } from './config/firebase'

type EntryType = {
  title: string
  text: string
}

type Request = {
  body: EntryType
  params: { entryId: string }
}

const addEntry = async (req: Request, res: Response) => {
  const { title, text } = req.body
  try {
    const entry = db.collection('entries').doc()
    const entryObject = {
      id: entry.id,
      title,
      text,
    }

    await entry.set(entryObject)

    res.status(200).send({
      status: 'success',
      message: 'entry added successfully',
      data: entryObject,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      // Handle the case where the caught value isn't an Error object
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

const getAllEntries = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allEntries: EntryType[] = []
    const querySnapshot = await db.collection('entries').get()
    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()))
    res.status(200).json(allEntries)
  } catch (error) {
    // return res.status(500).json(error.message)
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      // Handle the case where the caught value isn't an Error object
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

const updateEntry = async (req: Request, res: Response): Promise<void> => {
  const {
    body: { text, title },
    params: { entryId },
  } = req

  try {
    const entry = db.collection('entries').doc(entryId)
    const currentData = (await entry.get()).data() || {}

    const entryObject = {
      title: title || currentData.title,
      text: text || currentData.text,
    }

    await entry.set(entryObject).catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      })
    })

    res.status(200).json({
      status: 'success',
      message: 'entry updated successfully',
      data: entryObject,
    })
  } catch (error) {
    // return res.status(500).json(error.message)
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      // Handle the case where the caught value isn't an Error object
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

const deleteEntry = async (req: Request, res: Response): Promise<void> => {
  const { entryId } = req.params

  try {
    const entry = db.collection('entries').doc(entryId)

    await entry.delete().catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      })
    })

    res.status(200).json({
      status: 'success',
      message: 'entry deleted successfully',
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      // Handle the case where the caught value isn't an Error object
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export { addEntry, getAllEntries, updateEntry, deleteEntry }
