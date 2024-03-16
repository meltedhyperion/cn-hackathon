import { Request, Response } from 'express';
import { getDB } from '../config/database';
import { orgUserSchema } from '../utils/schema';
import { randomUUID } from 'crypto';

export const accessKey = async (req: Request, res: Response) => {
  const orgUser = orgUserSchema.safeParse(req.body);

  if (!orgUser.success) {
    res.status(400).send('Invalid data');
  }

  try {
    const db = await getDB();
    const collection = db.collection('api-keys');
    const data = (orgUser as any).data;
    const alreadyRegisterd = await collection.findOne({
      email: data.email,
    });
    if (alreadyRegisterd) {
      res.status(200).send({ apiKey: alreadyRegisterd.apiKey });
    } else {
      const apiKey = randomUUID();
      const result = await collection.insertOne({
        email: data.email,
        apiKey: apiKey,
      });
      if (result.acknowledged) {
        res.status(200).send({ apiKey: apiKey });
      } else {
        res.status(500).send('Something went wrong');
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
