import { User } from "../entity/User";
import { NextFunction, Request, Response } from "express";

export const activateAccount = async (request: Request, response: Response, _next: NextFunction) => {
  let user: any = await User.findOne({activeToken: request.params.activeToken});

  if (!user) throw new Error("Post not found!");

  if(user.activeExpires < Date.now()){
    return response.status(501).json({message:'Activation link expired'});
  }
  
  Object.assign(user, {active:true});
  return user.save()
  .then(() => {
    return response.status(200).redirect('/');
    // json({message:'User account activated'})
  })
  .catch((error:any) => {
    return response.status(200).json(error);
   });;
}