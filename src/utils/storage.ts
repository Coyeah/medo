export const setStorage = (list: object[]): void => {
  if (!(list instanceof Array)) return null;
  return localStorage.setItem('medo-list', JSON.stringify(list));
}

export const getStorage = (): object[] => {
  const medoListString = localStorage.getItem('medo-list');
  let medoList: object[];
  try {
    medoList = JSON.parse(medoListString);
  } catch(err) {
    medoList = medoListString;
  }
  return medoList || [];
}
