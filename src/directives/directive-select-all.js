export const selectAll = {
  inserted(el) {
    let input = el.querySelector('.q-field__native');
    input.addEventListener('focus', () => {
      console.log('adfas');
      if (input.value.length) {
        input.select();
      }
    });
  }
};
