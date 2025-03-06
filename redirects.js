const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }
  const emailSignaturesRedirect = {
    destination: '/email-signatures.html',
    source: '/email-signatures',
    permanent: true,
  }

  const redirects = [internetExplorerRedirect, emailSignaturesRedirect]

  return redirects
}

export default redirects
