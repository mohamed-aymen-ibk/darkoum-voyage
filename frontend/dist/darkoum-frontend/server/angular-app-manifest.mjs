
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/auth/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "route": "/auth/register"
  },
  {
    "renderMode": 2,
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/provider"
  },
  {
    "renderMode": 2,
    "route": "/client"
  },
  {
    "renderMode": 2,
    "route": "/pack"
  },
  {
    "renderMode": 2,
    "route": "/article"
  },
  {
    "renderMode": 2,
    "route": "/vente"
  }
],
  assets: {
    'index.csr.html': {size: 8995, hash: '9e94abc302e819f58d995d8f0da639fc9db527419fab6b9485d4d9db2707262b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 994, hash: '791aab13cdc32b71d3018369556566ebbd5429e3a8ea62a7a48f1743b7aab8d0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 12513, hash: 'b3f27b6391c81f092b84786148c3af7ef425050d702f3425c4c705b660ff62ee', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 12513, hash: 'b3f27b6391c81f092b84786148c3af7ef425050d702f3425c4c705b660ff62ee', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'pack/index.html': {size: 12513, hash: 'b3f27b6391c81f092b84786148c3af7ef425050d702f3425c4c705b660ff62ee', text: () => import('./assets-chunks/pack_index_html.mjs').then(m => m.default)},
    'auth/register/index.html': {size: 13141, hash: '9443624550042a98d165af771afa66f1ecb00836c23d7d817aa4a54a99407cfc', text: () => import('./assets-chunks/auth_register_index_html.mjs').then(m => m.default)},
    'provider/index.html': {size: 12513, hash: 'b3f27b6391c81f092b84786148c3af7ef425050d702f3425c4c705b660ff62ee', text: () => import('./assets-chunks/provider_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 12513, hash: 'b3f27b6391c81f092b84786148c3af7ef425050d702f3425c4c705b660ff62ee', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'article/index.html': {size: 12513, hash: 'b3f27b6391c81f092b84786148c3af7ef425050d702f3425c4c705b660ff62ee', text: () => import('./assets-chunks/article_index_html.mjs').then(m => m.default)},
    'vente/index.html': {size: 12513, hash: 'b3f27b6391c81f092b84786148c3af7ef425050d702f3425c4c705b660ff62ee', text: () => import('./assets-chunks/vente_index_html.mjs').then(m => m.default)},
    'styles-653VPEW2.css': {size: 20301, hash: 'h4YCSXN1Yi4', text: () => import('./assets-chunks/styles-653VPEW2_css.mjs').then(m => m.default)}
  },
};
