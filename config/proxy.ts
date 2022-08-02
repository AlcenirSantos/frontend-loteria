/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/v1/': {
      target: 'https://jogos-loterias.herokuapp.com',
      changeOrigin: true,
      headers: {
        Authorization: 'Basic bG90ZXJpYXMtd2ViOkBuZ3VsQHIw',
      },
      pathRewrite: {
        '^': '',
      },
    },
    '/login/': {
      target: 'https://jogos-loterias.herokuapp.com',
      changeOrigin: true,
      headers: {
        Authorization: 'Basic bG90ZXJpYXMtd2ViOkBuZ3VsQHIw',
      },
      pathRewrite: { '^/api': '' },
    },
    '/api/*': {
      target: 'https://jogos-loterias.herokuapp.com',
      changeOrigin: true,
      headers: {
        Authorization: 'Basic bG90ZXJpYXMtd2ViOkBuZ3VsQHIw',
      },
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
