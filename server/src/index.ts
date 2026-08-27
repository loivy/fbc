import express from "express";
import cors from "cors";
import { env } from "./lib/env";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import adminRoutes from "./routes/admin";
import applicationRoutes from "./routes/applications";

const app = express();

// Cloud Run sits behind a proxy, so without this req.ip is the proxy address
// and the per-IP throttle on public submissions would bucket everyone together.
app.set("trust proxy", true);

app.use(cors({ origin: env.clientOrigins }));
app.use(express.json({ limit: "64kb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(env.port, () => {
  console.log(`Server listening on http://localhost:${env.port}`);
});
