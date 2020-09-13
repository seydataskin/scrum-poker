function setLocalStorage(itemName, item) {
    localStorage.removeItem(item);
    localStorage.setItem(itemName, JSON.stringify(item));
  }
  
  function getLocalStorage(item) {
    return JSON.parse(localStorage.getItem(item));
  }
  
  export { setLocalStorage, getLocalStorage };
  