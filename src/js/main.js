let justifyContent = 'flex-start';
let justifyItems = 'flex-start';
let alignContent = 'flex-start';
let alignItems = 'flex-start';
let wrap = 'wrap';
let items = 3;

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

function changeChildren() {
   if (document.getElementById('children').value < 0 && document.getElementById('children').value > 40) {
      return;
   }
   items = +document.getElementById('children').value;
   sandbox.innerHTML = '';
   console.log(items);
   for (let i = 1; i < items + 1; i += 1) {
      console.log(i);
      const node = document.createElement('div');
      node.classList.add('box', 'ma-2');
      node.style.padding = `${i * 2}px`;
      sandbox.appendChild(node);
   }
}

function setWrap(newWrap) {
   sandbox.classList.remove(wrap);
   wrap = newWrap;
   sandbox.classList.add(newWrap);
}

function setJustifyContent(newHorizontal) {
   sandbox.classList.remove(justifyContent);
   justifyContent = newHorizontal;
   sandbox.classList.add(newHorizontal);
}

function setJustifyItems(newHorizontal) {
   sandbox.classList.remove(justifyItems);
   justifyItems = newHorizontal;
   sandbox.classList.add(newHorizontal);
}

function setAlignContent(newVertical) {
   sandbox.classList.remove(alignContent);
   alignContent = newVertical;
   sandbox.classList.add(newVertical);
}

function setAlignItems(newVertical) {
   sandbox.classList.remove(alignItems);
   alignItems = newVertical;
   sandbox.classList.add(newVertical);
}

setTimeout(() => {
   sandbox = document.querySelector('.sandbox-container');
   changeChildren();
});
