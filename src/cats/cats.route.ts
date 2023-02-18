import { Router } from "express";
import {
  readAllcat,
  readCat,
  createCat,
  updateCat,
  patchCat,
} from "./cats.service";

const router = Router();

// READ 고양이 전체 데이터 모두 조회
router.get("/", readAllcat);

// READ 특정 고양이 데이터 조회
router.get("/:id", readCat);

// CREATE 새로운 고양이 추가
router.post("/", createCat);

// UPDATE 고양이 데이터 업데이트 -> PUT
router.put("/:id", updateCat);

// UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
router.patch("/:id", patchCat);

// DELETE 고양이 데이터 삭제 -> DELETE

export default router;
