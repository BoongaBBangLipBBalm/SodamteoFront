
import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://sodam.store',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/', // '/api'로 시작하는 경로를 실제 경로로 변경
  },
});

export const config = {
  api: {
    bodyParser: false, // 필수: bodyParser를 사용하지 않도록 설정
  },
};
