var canvas, ctx, flag = false,
	prevX = 0,
	currX = 0,
	prevY = 0,
	currY = 0,
	dot_flag = false;
var ctx2;

var thisStrokeStyle = '#c72084',
	thisLineWidth = 3;

resizeCanvas = window.onresize = function() {
	canvas = document.getElementById('manilacanvas');
	canvas.width = window.document.body.clientWidth;
	canvas.height = window.document.body.scrollHeight;
    canvas.style.top = '0px';
}

rescrollCanvas = window.onscroll = function() {
//	document.body.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
//	canvas.style.top = document.body.scrollTop + 'px';
};


function init() {

	$('<canvas id="manilacanvas" style="position:absolute;top:0; left: 0;"></canvas>').appendTo($("body"));

	canvas = document.getElementById('manilacanvas');
	resizeCanvas();
	ctx = canvas.getContext("2d");
	w = canvas.width;
	h = canvas.height;


	canvas.addEventListener("mousemove", function (e) {
		findxy('move', e)
	}, false);
	canvas.addEventListener("mousedown", function (e) {
		findxy('down', e)
	}, false);
	canvas.addEventListener("mouseup", function (e) {
		findxy('up', e)
	}, false);
	canvas.addEventListener("mouseout", function (e) {
		findxy('out', e)
	}, false);
}

function executeUpload() {
	var canvasdata = canvas.toDataURL("image/png");
    canvasdata = canvasdata.replace('data:image/png;base64,', '');
	canvas = document.getElementById('manilacanvas');
	var url = "http://vps.provolot.com/manila_api/set_scribbled_tab";
	var g = $.ajax({
		type: 'POST',
		url: url,
		data: {
			imgBase64: canvasdata,
			timestamp: Math.floor(Date.now() / 1000),
			filename: "manila-drawing-" + Math.floor(Date.now() / 1000) + ".png",
			taburl: window.location.href,
			tabroom: 'surfclub'
		}
	}).done(function(o) {
		console.log(o);
	}); //POSTDATA
}

window.onkeyup = function(e) {
	console.log(e.keyCode);
	var kc = e.keyCode;
	if(kc == 88) { executeUpload(); }
}

function color(col) {
	switch (col) {
		case "green":
			thisStrokeStyle = "green";
			break;
		case "blue":
			thisStrokeStyle = "blue";
			break;
		case "red":
			thisStrokeStyle = "red";
			break;
		case "yellow":
			thisStrokeStyle = "yellow";
			break;
		case "orange":
			thisStrokeStyle = "orange";
			break;
		case "black":
			thisStrokeStyle = "black";
			break;
		case "white":
			thisStrokeStyle = "white";
			break;
		default:
			thisStrokeStyle = col;
	}
	if (thisStrokeStyle == "white") thisLineWidth = 14;
	else thisLineWidth = 2;

}

function draw() {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = thisStrokeStyle;
	ctx.lineWidth = thisLineWidth;
	ctx.stroke();
	ctx.closePath();

}

function erase() {
	var m = confirm("Want to clear");
	if (m) {
		ctx.clearRect(0, 0, w, h);
		document.getElementById("canvasimg").style.display = "none";
	}
}

function save() {
	document.getElementById("canvasimg").style.border = "2px solid";
	var dataURL = canvas.toDataURL();
	document.getElementById("canvasimg").src = dataURL;
	document.getElementById("canvasimg").style.display = "inline";
}


function findxy(res, e) {
	var eX = e.clientX;
	var eY = e.clientY  + document.body.scrollTop;

	if (res == 'down') {
		prevX = currX;
		prevY = currY;
		currX = eX - canvas.offsetLeft;
		currY = eY - canvas.offsetTop;

		flag = true;
		dot_flag = true;
		if (dot_flag) {
			ctx.beginPath();
			ctx.fillStyle = thisStrokeStyle;
			ctx.fillRect(currX, currY, 2, 2);
			ctx.closePath();
			dot_flag = false;
		}
	}
	if (res == 'up' || res == "out") {
		flag = false;
	}
	if (res == 'move') {
		if (flag) {
			prevX = currX;
			prevY = currY;
			currX = eX - canvas.offsetLeft;
			currY = eY - canvas.offsetTop;
			draw();
		}
	}
}

$(document).ready(function() {
	init();
});
