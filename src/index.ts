import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "api-gateway",
  });
});

const port = process.env.SERVICE_PORT || 3000;

app.listen(port, () => {
  console.log(`API GATEWAY running on port ${port}`);
});
