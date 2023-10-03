import { Prisma } from "@prisma/client"

//NullableJsonNullValueInput | InputJsonValue | undefined

interface IVariable {
    id: string
    name: string
    color: string
    api_url?: string | null
    request_method?: REQUEST_METHODS | null
    body_json?: object | any
}

const REQUEST_METHODS: { [x: string]: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT' } = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    PUT: 'PUT'
}

export type REQUEST_METHODS = typeof REQUEST_METHODS[keyof typeof REQUEST_METHODS]

export default IVariable