import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { Users } from "../entity/User";

const router = Router()

//GET * USER
router.get("/users", async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await getRepository(Users).find();
  return res.json(users);
});


//GET USER
router.get("/user/:uuid",async (
  req: Request,
  res: Response
): Promise<Response> => {
  const results = await getRepository(Users).findOne(req.params.id);
  return res.json(results);
});

  
//UPDATE USER
router.put("/user/:uuid",async (
  req: Request,
  res: Response
)=> {
  const user = await getRepository(Users).findOne(req.params.id);
  if (user) {
    getRepository(Users).merge(user, req.body);
    const results = await getRepository(Users).save(user);
    res.json(results);
  }
  res.json({msg: 'Not user found'});
});
  
//DELETE USER
router.delete("/user/:uuid", async (
  req: Request, res: Response
  )=> {
  const results = await getRepository(Users).delete(req.params.id);
  res.json(results);
});

export default router