export const setStorage = (list) => {
  if (!(list instanceof Array)) return null;
  return localStorage.setItem('medo-list', JSON.stringify(list));
}

export function getStorage (str) {
  const medoListString = typeof str === 'undefined' ?
    localStorage.getItem('medo-list') : str;
  let medoList;
  try {
    medoList = JSON.parse(medoListString);
  } catch (e) {
    medoList = medoListString;
  }
  return medoList || [];
}
