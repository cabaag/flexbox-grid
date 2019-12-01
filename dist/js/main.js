let horizontal = '-stretch';
let vertical = '-start';
const direction = 'row';
let sandbox;

function setDirection(direc) {
   switch (direc) {
      case 'row':
         sandbox.classList.remove('column', 'column-reverse', 'row-reverse');
         sandbox.classList.add('row');
         break;
      case 'col':
         sandbox.classList.remove('column-reverse', 'row', 'row-reverse');
         sandbox.classList.add('column');
         break;
      case 'row reverse':
         sandbox.classList.remove('column-reverse', 'column', 'row-reverse');
         sandbox.classList.add('row-reverse');
         break;
      case 'col reverse':
         sandbox.classList.remove('column', 'row', 'row-reverse');
         sandbox.classList.add('column-reverse');
         break;
      default:
         break;
   }
}

function setHorizontal(horiz) {
   sandbox.classList.remove(`align${vertical}${horizontal}`);
   horizontal = horiz;
   sandbox.classList.add(`align${vertical}${horizontal}`);
}

function setVertical(vert) {
   sandbox.classList.remove(`align${vertical}${horizontal}`);
   vertical = vert;
   sandbox.classList.add(`align${vertical}${horizontal}`);
}

setTimeout(() => {
   sandbox = document.querySelector('.sandbox-container');
});
