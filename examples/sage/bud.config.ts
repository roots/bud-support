export default (app) => {
  app
    .use(require('@roots/sage'))
    .entry({
      app: ['**/app.{js,css}'],
      editor: ['**/editor.{js,css}'],
      customizer: ['**/customizer.{js,css}'],
    })
    .assets(['assets/images'])
    .persist(false);

  return app;
};
