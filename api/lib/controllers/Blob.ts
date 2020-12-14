import { Request, Response,Router } from "express";
import { getRepository } from "typeorm";
import { Blobs } from "../entity/Blob";

const router = Router()

//GET BLOB
router.get("/blob/:id", async (
  req: Request,
  res: Response
): Promise<Response> => {
  const blobs = await getRepository(Blobs).find();
  return res.json(blobs);
}) 

//CREATE BLOB
router.post("/user/:user_uuid/buckets/:bucket_id/blobs", async (
  req: Request,
  res: Response
) => {
  console.log(req.body)
  const newBlob = await getRepository(Blobs).create(req.body);
  const results = await getRepository(Blobs).save(newBlob);
  res.json(results);
});
  
//UPDATE BLOB
router.put("/blob/:id", async (
  req: Request,
  res: Response
) => {
  const user = await getRepository(Blobs).findOne(req.params.id);
  if (user) {
    getRepository(Blobs).merge(user, req.body);
    const results = await getRepository(Blobs).save(user);
    res.json(results);
  }
  res.json({msg: 'Not user found'});
});

//DELETE BLOB
router.delete("/blob/:id", async ( 
  req: Request, res: Response
  ) => {
  const results = await getRepository(Blobs).delete(req.params.id);
  res.json(results);
});

export default router
