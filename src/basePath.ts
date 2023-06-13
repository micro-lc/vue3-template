const getBasePath = () => {
  const { pathname: parcelBase } = new URL(
    document.querySelector<HTMLBaseElement>('qiankun-head base')?.getAttribute('href') ?? document.baseURI,
    window.document.baseURI
  )
  const documentBase = document.querySelector('base')?.getAttribute('href') ?? undefined
  console.log(parcelBase, documentBase)

  return {
    parcelBase: documentBase === undefined ? parcelBase : parcelBase.replace(documentBase, '/'),
    documentBase
  }
}

export { getBasePath }