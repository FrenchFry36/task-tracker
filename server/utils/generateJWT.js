import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generateJWT(email) {
  // payload is just an object which usually contains some information about user but not confidential information such as password.
  const payload = {
    user: {
      email: email,
    },
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}
