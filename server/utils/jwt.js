import jwt from "jsonwebtoken"; // we import jwt module which we installed in the begining
import dotenv from "dotenv"; // we import dotenv module which we installed in the begining
dotenv.config(); // we call config method to read .env file

export function generateJWT(email) {
  // payload is just an object which usually contains some information about user but not confidential information such as password.
  const payload = {
    user: {
      email,
    },
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}
