export const getElementFromTemplate = (layout) => {
  const div = document.createElement(`div`);
  div.innerHTML = layout;

  return div;
};
