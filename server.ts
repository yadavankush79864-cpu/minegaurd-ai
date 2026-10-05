import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // JSON body parser
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'online',
      system: 'MineGuard AI Core Server',
      stage: 'Stage 1 - Dashboard & Architecture Setup',
      timestamp: new Date().toISOString(),
      activeMine: 'Jharkhand Coalfield - Sector 4 Under-Grid',
    });
  });

  // Stage 1 Demo Auth API
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, role } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    return res.json({
      success: true,
      user: {
        id: `usr-${Date.now()}`,
        email,
        name: email.split('@')[0].toUpperCase(),
        role: role || 'OPERATOR',
        sector: 'Jharkhand Central Pit 07',
        loggedAt: new Date().toISOString(),
      },
    });
  });

  // Serve static assets in production, or attach Vite middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MineGuard AI] Control Server operational on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[MineGuard AI Server Init Error]:', err);
  process.exit(1);
});
