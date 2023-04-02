import { Request, Response, Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
const router = Router();

/**
 * Product
 */

router.get("/product", (req: Request, res: Response) => {
  res.json({ message: "hello" });
});
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/product",
  body("name").isString().trim().notEmpty(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);
router.delete("/product/:id", () => {});
/**
 * Update
 */

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("status").optional(),
  body("version").optional(),
  (req: Request, res: Response) => {}
);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  () => {}
);
router.delete("/update/:id", () => {});

/**
 * Update Point
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  () => {}
);
router.post(
  "/updatepoint",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
