var horizontal = '-stretch';
var vertical = '-start';
var direction = 'row';
var sandbox;

setDirection = function(direc) {
	switch(direc){
	case 'row':
		sandbox.classList.remove('layout-column', 'layout-column-reverse', 'layout-row-reverse');
		sandbox.classList.add('layout-row');
		break;
	case 'col':
		sandbox.classList.remove('layout-column-reverse', 'layout-row', 'layout-row-reverse');
		sandbox.classList.add('layout-column');
		break;
	case 'row reverse':
		sandbox.classList.remove('layout-column-reverse', 'layout-column', 'layout-row-reverse');
		sandbox.classList.add('layout-row-reverse');
		break;
	case 'col reverse':
		sandbox.classList.remove('layout-column', 'layout-row', 'layout-row-reverse');
		sandbox.classList.add('layout-column-reverse');
		break;
	}
};

setHorizontal = function(horiz) {
	sandbox.classList.remove(`layout-align${vertical}${horizontal}`);
	horizontal = horiz;
	sandbox.classList.add(`layout-align${vertical}${horizontal}`);
};

setVertical = function(vert) {
	sandbox.classList.remove(`layout-align${vertical}${horizontal}`);
	vertical = vert;
	sandbox.classList.add(`layout-align${vertical}${horizontal}`);
};

setTimeout(()=>{
	sandbox = document.querySelector('.sandbox-container'); 
});