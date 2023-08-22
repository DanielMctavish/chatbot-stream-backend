import { Request, Response } from 'express'



export const ApplyUseCase = (res: Response, usecase: Function, params?: object, data?: object, loginFuncion?: Function, file?: object) => {

    const handle = () => {
        usecase(data, params, file)
            .then((response: any) => {

                loginFuncion ?
                    loginFuncion(data)
                        .then(async (response: any) => {
                            return res.status(response.status_code).json({ body: response.body })
                        }).catch((err: any) => {
                            return res.status(response.status_code).json({ body: response.body })

                        }) : res.status(response.status_code).json({ body: response.body })



            }).catch((err: any) => {
                return res.status(err.status_code).json({ msg: err.body })
            })

    }



    handle()
}