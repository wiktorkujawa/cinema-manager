import { Users } from "../entity/Users";
import { NextFunction, Request, Response } from "express";

export const activateAccount = async (request: Request, response: Response, _next: NextFunction) => {
  let users: any = await Users.findOne({activeToken: request.params.activeToken});

  if (!users) throw new Error("Post not found!");

  if(users.activeExpires.getTime() < Date.now()){
    return response.status(501).json({message:'Activation link expired'});
  }
  
  Object.assign(users, {active:true});
  return users.save()
  .then(() => {
    return response.status(200).redirect('/');
    // json({message:'Users account activated'})
  })
  .catch((error:any) => {
    return response.status(200).json(error);
   });;
}