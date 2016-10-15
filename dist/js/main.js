var aligmnent = 'top-xs';
var distribution = 'start-xs';
var direction = 'row';
var sandbox;

setDirection = function(direc) {
	switch(direc){
	case 'row':
		sandbox.classList.remove('col', 'reverse');
		sandbox.classList.add('row');
		break;
	case 'col':
		sandbox.classList.remove('reverse');
		sandbox.classList.add('col');
		break;
	case 'row reverse':
		sandbox.classList.remove('col');
		sandbox.classList.add('reverse');
		break;
	case 'col reverse':
		sandbox.classList.add('col', 'reverse');
		break;
	}
};

setAligment = function(align) {
	sandbox.classList.remove(aligmnent);
	aligmnent = align + '-xs';
	sandbox.classList.add(aligmnent);
};

setDistribution = function(distrib) {
	sandbox.classList.remove(distribution);
	distribution = distrib + '-xs';
	sandbox.classList.add(distribution);
};

setTimeout(()=>{
	sandbox = document.querySelector('.sandbox-container'); 
});