import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // A Railway informa uma porta específica e valida o serviço pela rede externa do contêiner.
  const port = parseInt(process.env.PORT || "3000", 10);

  server.listen({ port, host: "0.0.0.0" }, () => {
    console.log(`Servidor em produção disponível na porta ${port}.`);
  });

  server.on("error", error => {
    console.error("Falha ao iniciar o servidor HTTP:", error);
  });
}

startServer().catch(console.error);
