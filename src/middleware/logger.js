const redis = require('redis');

const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.on('error', (err) => {
    console.error('Redis error de conexion:', err);
});

client.connect().then(() => {
    console.log('Conectado-->> Redis');
}).catch((err) => {
    console.error('Error conexion a Redis:', err);
});

module.exports = (req, res, next) => {
    res.on('finish', async () => {
        if (!client.isOpen) {
            console.error('Redis client -->> No conectado.');
            return;
        }
        const key = `${req.method}:${Date.now()}:${req.originalUrl}`;
        const logEntry = JSON.stringify({
            time: new Date(),
            req: {
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                body: req.body
            },
            res: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage
            }
        });
        try {
            await client.set(key, logEntry, 'EX', 60 * 60 * 24);
        } catch (err) {
            console.error('Error al salvar:', err);
        }
    });
    next();
};