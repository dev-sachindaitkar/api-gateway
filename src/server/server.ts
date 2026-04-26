import { app } from "../app/app";

// parse port as number with safe fallback
const rawPort = process.env.SERVICE_PORT ?? "3000";
const port = Number.parseInt(rawPort, 10);
if (Number.isNaN(port) || port <= 0) {
  console.error(
    `Invalid SERVICE_PORT value (${rawPort}), falling back to 3000`,
  );
}

const listenPort = Number.isNaN(port) ? 3000 : port;

if (require.main === module) {
  // start server only when run directly
  const server = app.listen(listenPort, () => {
    console.log(`API GATEWAY running on port ${listenPort}`);
  });

  // graceful shutdown
  const shutdown = (signal?: string) => {
    console.log(`Received ${signal ?? "shutdown"}, closing server...`);
    server.close((err?: Error) => {
      if (err) {
        console.error("Error during server close:", err);
        process.exit(1);
      }
      console.log("Server closed, exiting.");
      process.exit(0);
    });
    // force exit after timeout
    setTimeout(() => {
      console.warn("Forcing shutdown.");
      process.exit(1);
    }, 10_000).unref();
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    shutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled rejection:", reason);
    shutdown("unhandledRejection");
  });
}
