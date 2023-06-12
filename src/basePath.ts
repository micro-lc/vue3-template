const getBasePath = () => new URL(
  document.querySelector<HTMLBaseElement>('qiankun-head base')?.href ?? document.baseURI,
  window.document.baseURI
).pathname

export {getBasePath}