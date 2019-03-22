const blober = (target, filename = 'file.txt', type = 'text/plain') => {
  if (!target) return;
  let blob = new Blob([target], {type});
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export default blober;
