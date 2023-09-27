
interface IClient {
    phone_number: string
    name: string
    avatar_url: string
    email?: string | null
    password?: string | null
}

export default IClient