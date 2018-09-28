// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('jarvis-authority') : str;
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  return authority || [];
}

export function setAuthority (authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('jarvis-authority', JSON.stringify(proAuthority));
}
