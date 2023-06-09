import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import path from 'path';
import { router } from './routes';
import cors from 'cors';
const app = express();
app.use(cors())
app.use(express.json());

app.use(router);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) =>{
  if(err instanceof Error){
    // Se for uma instancia do tipo erro
    return res.status(400).json({error: err.message})
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}) 
app.listen(process.env.PORT || 3333, () => {
})

