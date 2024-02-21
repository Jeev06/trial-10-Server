import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../Config/config";

const generateToken = (user: { id: number; username: string }): string => {
  const token = jwt.sign({ user }, config.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export default {
  hashPassword,
  comparePasswords,
  generateToken,
};
