import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false, // 필요 시 false로 설정
  },
}

const proxy = createProxyMiddleware({
  target: 'https://www.springgreens.store', // 올바른 타겟 URL
  changeOrigin: true,
  secure: false, // 자가 서명 인증서 무시 (개발 환경에서만 사용)
  ws: true, // 웹 소켓 요청을 프록시하도록 설정
  onError(err, req, res) {
    // 프록시 요청 중 오류가 발생할 경우 처리
    console.error('프록시 요청 오류:', err);
    res.status(500).json({ error: '프록시 요청 오류' });
  },
  onProxyReqWs(proxyReq, req, socket, options) {
    // 웹 소켓 요청 시 추가 처리가 필요하다면 이곳에서
    console.log('웹 소켓 요청:', req.url);
  },
  onProxyRes(proxyRes, req, res) {
    // 프록시 응답 시 추가 처리가 필요하다면 이곳에서
    console.log('프록시 응답:', proxyRes.statusCode);
  },
});

export default function handler(req, res) {
  // 프록시 요청을 처리
  proxy(req, res, (result) => {
    if (result instanceof Error) {
      console.error('프록시 오류:', result);
      res.status(500).json({ error: '프록시 오류' });
    }
  });
}