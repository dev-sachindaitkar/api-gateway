import express from "express";
const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "api-gateway",
    message: "api-gateway is up and running.",
  });
});

export { app };
