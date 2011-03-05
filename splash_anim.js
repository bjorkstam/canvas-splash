// Mikael Bjorkstam
// @bjorkstam
// 3/5/2011

var SHAPES = [];
var SETTINGS = {
	genSpeed : 120,
	remSpeed : 70,
	alphaFade : 0.01
}

var createShape = function() {
	return {
		radius : Math.floor(30+Math.random()*80),
		x : Math.floor(Math.random()*document.width),
		y : Math.floor(Math.random()*document.height),
		r : 255,
		g : 100,
		b : Math.floor(Math.random()*255),
		alpha: Math.round(30+Math.random()*70)/100,
		fadeFactor : Math.floor(1+Math.random()*1)
	}
}
var generateShape = function() {
	var shape = createShape();
	if (shape) {
		SHAPES.push(shape);
	}
}
var fadeShape = function(shapeObj) {
	shapeObj.radius -= shapeObj.fadeFactor;
	shapeObj.alpha -= SETTINGS.alphaFade;
	if (shapeObj.radius < 1 || shapeObj.alpha < 0.0) return false;
	return true;
}
var getCanvas = function() {
	return document.getElementById('splash_area');
}
var resizeCanvas = function() {
	var elem = getCanvas();
	elem.width = document.width;
	elem.height = document.height;
}
window.onresize = resizeCanvas;
var draw = function() {
	var elem = getCanvas(), i=0;
	if (!elem || SHAPES.length==0) return;
	
	var ctx = elem.getContext("2d");
	ctx.clearRect(0,0,elem.width,elem.height);
	for (i=0; i < SHAPES.length; i++) {
		var rgba_str = "rgba("+SHAPES[i].r+", "+SHAPES[i].g+", "+SHAPES[i].b+", "+SHAPES[i].alpha+")";
		ctx.fillStyle = rgba_str; //"rgba(255, 255, 0, .5)";
		ctx.beginPath();
		ctx.arc(SHAPES[i].x, SHAPES[i].y, SHAPES[i].radius, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
	}
}

var remAnimate = function() {
	var i=0;
	for (i=0; i<SHAPES.length;i++) {
		if (!fadeShape(SHAPES[i])) {
			SHAPES.splice(i,1);
		}
	}
	draw();
	if (SHAPES.length > 0)
		setTimeout('remAnimate()', SETTINGS.remSpeed);
}

var genAnimate = function() {
	generateShape();
	draw();
	setTimeout('genAnimate()', SETTINGS.genSpeed);
}
var startAnimation = function() {
	genAnimate();
	remAnimate();
}