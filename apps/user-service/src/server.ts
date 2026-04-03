import express, { Request, Response }  from "express"
import helmet from "helmet"
import cors from "cors"
import 'dotenv/config';
import prisma from "../src/db/prisma";
import userRoutes from  "./routes/auth.routes" 


const app = express()
app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());


app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;


    res.json({
      status: 'ok',
      database: 'connected',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
    });
  }
});

app.use("/api", userRoutes);


const PORT = process.env.PORT || 3001;
  
app.listen(PORT, () => {
  console.log(` User Service running on http://localhost:${PORT}`);
});