import { Request, Response,Router } from "express";
import { getRepository } from "typeorm";
import { Buckets } from "../entity/Bucket";

const router = Router()



//UPDATE BUCKET
router.put("/bucket/:id", async (
  req: Request,
  res: Response
): Promise<Response> => {
  const results = await getRepository(Buckets).findOne(req.params.id);
  return res.json(results);
});

//CREATE BUCKET
router.post("/user/:user_uuid/bucket", async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log(req.body)
  const newBucket = await getRepository(Buckets).create(req.body);
  const results = await getRepository(Buckets).save(newBucket);
  return res.json(results);
});

//UPDATE BUCKET
router.post("/bucket/:id", async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(Buckets).findOne(req.params.id);
  if (user) {
    getRepository(Buckets).merge(user, req.body);
    const results = await getRepository(Buckets).save(user);
    return res.json(results);
  }

  return res.json({msg: 'Not user found'});
});
    
//DELETE BUCKET
router.delete("/bucket/:id", async (
  req: Request, 
  res: Response
): Promise<Response> => {
  const Bucket = await getRepository(Buckets).findOne(req.params.id)
  const results = await getRepository(Buckets).delete(req.params.id);
  return res.json(results);
});

export default router