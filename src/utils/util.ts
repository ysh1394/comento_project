const debounce = (func: any, delay: any) => {
  let timeoutId: any = null;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...args), delay);
  };
};

export default debounce;
