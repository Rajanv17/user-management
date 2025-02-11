import bcrypt from "bcryptjs";
import { UserEntity } from "../entities";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { ApiError } from "../utils/ApiError";
import { User } from "../interface";
import { UserFilter } from "../interface/user.interface";

export class UserService {
  userRepository = AppDataSource.getRepository(UserEntity);

  async register(userData: User): Promise<User> {
    const { name, email, password, role, phone, city, country } = userData;

    if (!name || !email || !password || !role || !phone || !city) {
      throw new ApiError("Missing required fields");
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (existingUser) {
      throw new ApiError("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      city,
      country,
    });

    if (!user) {
      throw new ApiError(400, "Failed to create user");
    }

    return user;
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new ApiError("Missing required fields");
    }

    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid password");
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        city: user.city,
        country: user.country,
        password: password,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }

  async findUser(requestingUserId: string, targetingId: string, role: string) {
    if (requestingUserId !== targetingId && role !== "Admin") {
      throw new ApiError(403, "Insufficient permissions");
    }
    const user = await this.userRepository.findOne({
      where: { id: targetingId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async findUsers(filter: UserFilter) {
    const queryBuilder = this.userRepository.createQueryBuilder("user");

    if (filter.search) {
      queryBuilder.andWhere(
        "(user.name ILIKE :search OR user.email ILIKE :search)",
        { search: `%${filter.search}%` }
      );
    }

    if (filter.country) {
      queryBuilder.andWhere("user.country = :country", {
        country: filter.country,
      });
    }

    return await queryBuilder.getMany();
  }
}
