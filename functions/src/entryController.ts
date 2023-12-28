import { Response } from 'express'
import { db } from './config/firebase'

// type EntryType = {
//   title: string
//   text: string
// }
type EntryType = {
  gid: string
  c_gid?: string
  c_etat_valid?: string
  c_nom?: string
  c_x_coor2?: string
  c_y_coor2?: string
  c_lat_coor1: string
  c_long_coor1: string
  c_xy_precis?: string
  c_id_adr?: string
  c_adr_num?: string
  c_adr_voie?: string
  c_com_cp?: string
  c_com_insee?: string
  c_com_nom?: string
  c_acc?: string
  c_acc_lib?: string
  c_acc_pcsec?: string
  c_acc_acc?: string
  c_acc_etg?: string
  c_acc_complt?: string
  c_photo1?: string
  c_photo2?: string
  c_disp_j?: string
  c_disp_h?: string
  c_disp_complt?: string
  c_date_instal?: string
  c_etat_fonct?: string
  c_id_euro?: string
  c_lc_ped?: string
  c_dtpr_lcped?: string
  c_dtpr_lcad?: string
  c_dtpr_bat?: string
  c_freq_mnt?: string
  c_dispsurv?: string
  c_dermnt?: string
  c_maj_don?: string
  c_expt_siren?: string
  c_expt_rais?: string
  c_etat?: string
  c_application_provenance?: string
  c_doublon?: string
  c__edit_datemaj?: string
  c_srid_origin?: string
  the_geom?: string
  cc_photo1?: string
  __1?: string
}

type Request = {
  body: EntryType
  params: { entryId: string }
}

const addEntry = async (req: Request, res: Response) => {
  const {
    gid,
    c_gid,
    c_etat_valid,
    c_nom,
    c_x_coor2,
    c_y_coor2,
    c_lat_coor1,
    c_long_coor1,
    c_xy_precis,
    c_id_adr,
    c_adr_num,
    c_adr_voie,
    c_com_cp,
    c_com_insee,
    c_com_nom,
    c_acc,
    c_acc_lib,
    c_acc_pcsec,
    c_acc_acc,
    c_acc_etg,
    c_acc_complt,
    c_photo1,
    c_photo2,
    c_disp_j,
    c_disp_h,
    c_disp_complt,
    c_date_instal,
    c_etat_fonct,
    c_id_euro,
    c_lc_ped,
    c_dtpr_lcped,
    c_dtpr_lcad,
    c_dtpr_bat,
    c_freq_mnt,
    c_dispsurv,
    c_dermnt,
    c_maj_don,
    c_expt_siren,
    c_expt_rais,
    c_etat,
    c_application_provenance,
    c_doublon,
    c__edit_datemaj,
    c_srid_origin,
    the_geom,
    cc_photo1,
    __1,
  } = req.body
  try {
    const entry = db.collection('entries').doc()
    const entryObject = {
      id: entry.id,
      gid,
      c_gid,
      c_etat_valid,
      c_nom,
      c_x_coor2,
      c_y_coor2,
      c_lat_coor1,
      c_long_coor1,
      c_xy_precis,
      c_id_adr,
      c_adr_num,
      c_adr_voie,
      c_com_cp,
      c_com_insee,
      c_com_nom,
      c_acc,
      c_acc_lib,
      c_acc_pcsec,
      c_acc_acc,
      c_acc_etg,
      c_acc_complt,
      c_photo1,
      c_photo2,
      c_disp_j,
      c_disp_h,
      c_disp_complt,
      c_date_instal,
      c_etat_fonct,
      c_id_euro,
      c_lc_ped,
      c_dtpr_lcped,
      c_dtpr_lcad,
      c_dtpr_bat,
      c_freq_mnt,
      c_dispsurv,
      c_dermnt,
      c_maj_don,
      c_expt_siren,
      c_expt_rais,
      c_etat,
      c_application_provenance,
      c_doublon,
      c__edit_datemaj,
      c_srid_origin,
      the_geom,
      cc_photo1,
      __1,
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
    body: {
      gid,
      c_gid,
      c_etat_valid,
      c_nom,
      c_x_coor2,
      c_y_coor2,
      c_lat_coor1,
      c_long_coor1,
      c_xy_precis,
      c_id_adr,
      c_adr_num,
      c_adr_voie,
      c_com_cp,
      c_com_insee,
      c_com_nom,
      c_acc,
      c_acc_lib,
      c_acc_pcsec,
      c_acc_acc,
      c_acc_etg,
      c_acc_complt,
      c_photo1,
      c_photo2,
      c_disp_j,
      c_disp_h,
      c_disp_complt,
      c_date_instal,
      c_etat_fonct,
      c_id_euro,
      c_lc_ped,
      c_dtpr_lcped,
      c_dtpr_lcad,
      c_dtpr_bat,
      c_freq_mnt,
      c_dispsurv,
      c_dermnt,
      c_maj_don,
      c_expt_siren,
      c_expt_rais,
      c_etat,
      c_application_provenance,
      c_doublon,
      c__edit_datemaj,
      c_srid_origin,
      the_geom,
      cc_photo1,
      __1,
    },
    params: { entryId },
  } = req

  try {
    const entry = db.collection('entries').doc(entryId)
    const currentData = (await entry.get()).data() || {}

    const entryObject = {
      // nom: nom || currentData.nom,
      // lat_coor1: lat_coor1 || currentData.lat_coor1,
      // long_coor1: long_coor1 || currentData.long_coor1,
      // disp_j: disp_j || currentData.disp_j,
      gid: gid || currentData.gid,
      c_gid: c_gid || currentData.c_gid,
      c_etat_valid: c_etat_valid || currentData.c_etat_valid,
      c_nom: c_nom || currentData.c_nom,
      c_x_coor2: c_x_coor2 || currentData.c_x_coor2,
      c_y_coor2: c_y_coor2 || currentData.c_y_coor2,
      c_lat_coor1: c_lat_coor1 || currentData.c_lat_coor1,
      c_long_coor1: c_long_coor1 || currentData.c_long_coor1,
      c_xy_precis: c_xy_precis || currentData.c_xy_precis,
      c_id_adr: c_id_adr || currentData.c_id_adr,
      c_adr_num: c_adr_num || currentData.c_adr_num,
      c_adr_voie: c_adr_voie || currentData.c_adr_voie,
      c_com_cp: c_com_cp || currentData.c_com_cp,
      c_com_insee: c_com_insee || currentData.c_com_insee,
      c_com_nom: c_com_nom || currentData.c_com_nom,
      c_acc: c_acc || currentData.c_acc,
      c_acc_lib: c_acc_lib || currentData.c_acc_lib,
      c_acc_pcsec: c_acc_pcsec || currentData.c_acc_pcsec,
      c_acc_acc: c_acc_acc || currentData.c_acc_acc,
      c_acc_etg: c_acc_etg || currentData.c_acc_etg,
      c_acc_complt: c_acc_complt || currentData.c_acc_complt,
      c_photo1: c_photo1 || currentData.c_photo1,
      c_photo2: c_photo2 || currentData.c_photo2,
      c_disp_j: c_disp_j || currentData.c_disp_j,
      c_disp_h: c_disp_h || currentData.c_disp_h,
      c_disp_complt: c_disp_complt || currentData.c_disp_complt,
      c_date_instal: c_date_instal || currentData.c_date_instal,
      c_etat_fonct: c_etat_fonct || currentData.c_etat_fonct,
      c_id_euro: c_id_euro || currentData.c_id_euro,
      c_lc_ped: c_lc_ped || currentData.c_lc_ped,
      c_dtpr_lcped: c_dtpr_lcped || currentData.c_dtpr_lcped,
      c_dtpr_lcad: c_dtpr_lcad || currentData.c_dtpr_lcad,
      c_dtpr_bat: c_dtpr_bat || currentData.c_dtpr_bat,
      c_freq_mnt: c_freq_mnt || currentData.c_freq_mnt,
      c_dispsurv: c_dispsurv || currentData.c_dispsurv,
      c_dermnt: c_dermnt || currentData.c_dermnt,
      c_maj_don: c_maj_don || currentData.c_maj_don,
      c_expt_siren: c_expt_siren || currentData.c_expt_siren,
      c_expt_rais: c_expt_rais || currentData.c_expt_rais,
      c_etat: c_etat || currentData.c_etat,
      c_application_provenance:
        c_application_provenance || currentData.c_application_provenance,
      c_doublon: c_doublon || currentData.c_doublon,
      c__edit_datemaj: c__edit_datemaj || currentData.c__edit_datemaj,
      c_srid_origin: c_srid_origin || currentData.c_srid_origin,
      the_geom: the_geom || currentData.the_geom,
      cc_photo1: cc_photo1 || currentData.cc_photo1,
      __1: __1 || currentData.__1,
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
