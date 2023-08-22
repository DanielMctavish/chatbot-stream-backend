import { Router } from 'express'
//import { verifyToken } from '../../authentication/JWT';
import MainWhatsappConnectivity from '../../app/usecases/whatsapp/functions/MainWhatsappConnectivity';
import { ApplyUseCase } from '../middlewares/ApplyUseCase';

const router = Router()
const mainWhatsapp = new MainWhatsappConnectivity()

router.post("/connect", (req, res) => { ApplyUseCase(res, mainWhatsapp.CreateConnection), req.query, req.body })//
router.patch("/desconnect", (req, res) => { ApplyUseCase(res, mainWhatsapp.Desconnect), req.query, req.body })
router.get("/check-status", (req, res) => { ApplyUseCase(res, mainWhatsapp.CheckConnectionStatus) })


export default router;