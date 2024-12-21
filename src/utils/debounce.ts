const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return function(...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, delay);
  };
};
