const cookieOptions = ({ dateOfExpiration = 30 }: { dateOfExpiration?: number }) => {
    return {
        httpOnly: true,
        secure: false,
        signed: true,
        expires: new Date(Date.now() + dateOfExpiration)
    }
}

export { cookieOptions }