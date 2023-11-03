import JWT from "jsonwebtoken";

const generateJWT = async payload => {
    try {
        const token = await JWT.sign(payload, process.env.SECRET, {
            algorithm: "HS256"
        })
        return token
    } catch (error) {
        console.log(`~~JWT ERROR~~\n${error}`)
        return null
    }
}
const verifyToken = async token => {
    try {
        const certificated = await JWT.verify(token, process.env.SECRET, {
            algorithms: ["HS256"]
        })
        return certificated
    } catch (error) {
        return null

    }
}

const decode = async token => {
    try {
        const decodeToken = await JWT.decode(token, config.jwt_secret, {
            algorithm: [config.jwt_algorithm]
        });
        return decodeToken;
    } catch (error) {
        return null;
    }
}

export {generateJWT, verifyToken,decode}