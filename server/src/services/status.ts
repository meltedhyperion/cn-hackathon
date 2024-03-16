/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import { getDB } from '../config/database';

export const status = async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const filestatusCollection = db.collection('filestatus');
    const statusdata = await filestatusCollection.findOne({
      pointer: 'statusDisplay',
    });
    if (!statusdata) {
      throw new Error('No status data found');
    }
    res.status(200).send(statusdata);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'No status data found' });
  }
};
