import { Router } from 'express'
//import { verifyToken } from '../../authentication/JWT';
import MainWhatsappConnectivity from '../../app/usecases/whatsapp/functions/MainWhatsappConnectivity';
import { ApplyUseCase } from '../middlewares/ApplyUseCase';

const router = Router()
const mainWhatsapp = new MainWhatsappConnectivity()

router.post("/connect", (req, res) => { ApplyUseCase(res, mainWhatsapp.CreateConnection) })//
router.patch("/desconnect", (req, res) => { ApplyUseCase(res, mainWhatsapp.Desconnect) })
router.get("/check-status", (req, res) => { ApplyUseCase(res, mainWhatsapp.CheckConnectionStatus) })
router.get("/get-qr", (req, res) => { ApplyUseCase(res, mainWhatsapp.GetQrCode) })

router.get("/select-stream", (req, res) => { ApplyUseCase(res, mainWhatsapp.SelectStream, req.query, req.body) })

export default router;