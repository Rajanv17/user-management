import { Router } from "express";
import { UserService } from "../controllers";
import { authenticateJWT } from "../middlewares";
import { UserRole } from "../interface/user.interface";

const router = Router();
const userService = new UserService();

// Auth Routes

router.post("/register", async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// User Routes
router.get("/users", authenticateJWT([UserRole.Admin]), async (req, res) => {
  try {
    const query: any = req.query;
    const users = await userService.findUsers(query);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get(
  "/:id",
  authenticateJWT([UserRole.Admin, UserRole.Staff]),
  async (req: any, res) => {
    try {
      const requestingUserId = req.user.id;
      const targetUserId = req.params.id;
      const targetRole = req.user.role;

      const user = await userService.findUser(
        requestingUserId,
        targetUserId,
        targetRole
      );
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default router;
