module.exports = {
    connection: {
        protocol: 'http',
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT || 3000
    },
    logs: {
        location: process.cwd() + "/log"
    },
    cors: {
        origin: ['*'],
        headers: [
            "Accept",
            "Authorization",
            "Content-Type",
            "content-type",
            "If-None-Match",
            "Accept-language",
            "access_token",
            "Cache-Control",
            "Pragma",
            "WWW-Authenticate",
            "Server-Authorization",
            "X-HTTP-Method-Override"
        ]
    }
}