import { Services } from './../his/services';
import * as HttpStatus from 'http-status-codes';
// import * as express from 'express';
// import * as request from 'request';
// import * as moment from 'moment';
import { Router, Request, Response } from 'express';


const provider = process.env.HIS_PROVIDER;
const services = new Services();
const router: Router = Router();


router.get('/', (req, res, next) => {
    res.render('index', { title: 'MOPH PHR API' });
});

router.get('/view/:hn/:dateServe/:request_id/:uid', async (req: Request, res: Response) => {
    let db = req.db;
    let hn: any = req.params.hn;
    let dateServe: any = req.params.dateServe;
    let uid: any = req.params.uid;
    let requestId: any = req.params.request_id;
    let rs: any;
    if (provider == 'jhcis') {
        rs = await services.his_jhcis(db, hn, dateServe, uid, requestId);
    } else if (provider == 'hosxpv3') {
        rs = await services.his_hosxp(db, hn, dateServe, uid, requestId);
    } else if (provider == 'hi') {
        rs = await services.his_hi(db, hn, dateServe, uid, requestId);
    } else if (provider == 'jhos') {
        rs = await services.his_jhos(db, hn, dateServe, uid, requestId);
    }
    res.send(rs);
});

// router.get('/office', async (req: Request, res: Response) => {
//     let db = req.db;

//     try {
//         let rs: any = await his.getHospital(db);
//         if (rs.length) {
//             res.send({ ok: true, info: rs, code: HttpStatus.OK });
//         } else {
//             res.send({ ok: true, info: {}, code: HttpStatus.OK });
//         }
//     } catch (error) {
//         res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
//     }
// });

// router.post('/botline', function (req, res, next) {
//     var token = req.body.token;
//     var message = req.body.message;
//     console.log(token);
//     console.log(message);

//     request({
//         method: 'POST',
//         uri: 'https://notify-api.line.me/api/notify',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         auth: {
//             'bearer': token
//         },
//         form: {
//             message: message
//         }
//     }, (err, httpResponse, body) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json({
//                 httpResponse: httpResponse,
//                 body: body
//             });
//         }
//     });
// });

export default router;