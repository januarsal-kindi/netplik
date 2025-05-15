import type { NextApiRequest, NextApiResponse } from "next";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ClientRequest, IncomingMessage } from "http";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

// Disable Next’s default body parsing so proxy can stream
export const config = { api: { bodyParser: false } };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logger = (proxy: any) => {
  proxy.on("proxyReq", (proxyReq: ClientRequest, req: IncomingMessage) => {
    console.log(`[HPM] [${req.method}] ${req.url}`); // outputs: [HPM] GET /users
  });
};
const onProxyReq = (proxyReq: ClientRequest) => {
  proxyReq.setHeader(
    "Authorization",
    `Bearer ${serverRuntimeConfig.token_api}`
  );
};
const proxy = createProxyMiddleware({
  target: serverRuntimeConfig.api_domain,
  changeOrigin: true,
  pathRewrite: { "^/api": "" }, // strip the prefix
  on: {
    proxyReq: onProxyReq,
  },
  plugins: [logger],
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return proxy(req, res, (err) => {
    if (err) {
      console.error("Proxy error:", err);
      res.status(500).end("Proxy failed.");
    }
  });
}
