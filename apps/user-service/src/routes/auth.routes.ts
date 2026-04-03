import express from "express"
import { authMiddleware } from "../middleware/auth.middleware";
import prisma from "../db/prisma";
const router = express.Router();

router.get("/me",authMiddleware,async (req: any, res) => {
  const kcUser = req.user;

  let user = await prisma.user.findUnique({
    where: { email: kcUser.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: kcUser.email,
        name: kcUser.preferred_username,
        keycloakId: kcUser.sub,
      },
    });
  }

  res.json(user);
}) ; 


export default router