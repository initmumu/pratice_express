import * as express from "express";

import { Cat, CatType } from "./app.model";

const app: express.Express = express();
const PORT: Number = 8000;

/* 
  미들 웨어는 순서가 굉장히 중요함
*/

// Logging Middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next();
});

// JSON Middleware
app.use(express.json());

// READ 고양이 전체 데이터 모두 조회
app.get("/cats", (req, res) => {
  try {
    // throw new Error("DB 서버 접속에 실패했습니다.");
    const cats = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

// READ 특정 고양이 데이터 조회
app.get("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    console.log(params);
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

// CREATE 새로운 고양이 추가
app.post("/cats", (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    Cat.push(data);
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

// 404 Middleware
app.use((req, res) => {
  res.send({ error: "[404] 해당 페이지를 찾을 수 없습니다." });
});

app.listen(PORT, () => {
  console.log(`Server is on ${PORT}`);
});
