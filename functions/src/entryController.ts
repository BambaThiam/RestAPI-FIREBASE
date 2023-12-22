import { Response } from 'express'
import { db } from './config/firebase'

// type EntryType = {
//   title: string
//   text: string
// }
type EntryType = {
  nom: string
  lat_coor1: string
  long_coor1: string
  adr_num?: string
  adr_voie?: string
  com_cp?: string
  com_insee?: string
  com_nom?: string
  acc: string
  acc_lib: string
  acc_pcsec: string
  acc_acc?: string
  acc_etg?: string
  acc_complt?: string
  photo1?: string
  photo2?: string
  disp_j: string
  disp_h: string
  disp_complt?: string
  tel1: string
  tel2?: string
  site_email?: string
  date_instal?: string
  etat?: string
  etat_fonct: string
  fab_siren?: string
  fab_rais: string
  mnt_siren?: string
  mnt_rais?: string
  modele: string
  num_serie: string
  id_euro?: string
  lc_ped?: string
  dtpr_lcped?: string
  dtpr_lcad?: string
  dtpr_bat?: string
  freq_mnt?: string
  dispsurv?: string
  dermnt: string
  expt_siren: string
  expt_siret?: string
  expt_rais: string
  expt_tel1: string
  expt_tel2?: string
  expt_email: string
}

type Request = {
  body: EntryType
  params: { entryId: string }
}


const addEntry = async (req: Request, res: Response) => {
  const {
    nom,
    lat_coor1,
    long_coor1,
    // acc,
    // acc_lib,
    disp_j,
    // disp_h,
    // tel1,
    // etat_fonct,
    // fab_rais,
    // modele,
    // num_serie,
    // dermnt,
    // expt_siren,
    // expt_rais,
    // expt_tel1,
    // expt_email,
  } = req.body
  try {
    const entry = db.collection('entries').doc()
    const entryObject = {
      id: entry.id,
      nom,
      lat_coor1,
      long_coor1,
      // acc,
      // acc_lib,
      disp_j,
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
    // body: { text, title },
    body: { nom, lat_coor1, long_coor1, disp_j },
    params: { entryId },
  } = req

  try {
    const entry = db.collection('entries').doc(entryId)
    const currentData = (await entry.get()).data() || {}

    const entryObject = {
      nom: nom || currentData.nom,
      lat_coor1: lat_coor1 || currentData.lat_coor1,
      long_coor1: long_coor1 || currentData.long_coor1,
      disp_j: disp_j || currentData.disp_j,
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
