import jwt from "jsonwebtoken";

export const signJWTAccessToken = (payload) => {
  const secret_key = process.env.SECRET_KEY;

  const token = jwt.sign(payload, secret_key, {
    expiresIn: "1h",
  });

  return token;
};

export const verifyJWT = (token) => {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};
