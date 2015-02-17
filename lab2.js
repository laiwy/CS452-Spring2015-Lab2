//Name: LAI Wing Yue
//Date: 30th January, 2015.

var gl;
var uTranslation;
var x=0.0, y=0.0;

window.onload=function init()
{
	var canvas=document.getElementById("gl-canvas");

	gl=WebGLUtils.setupWebGL(canvas);

	if (!gl)
	{
		alert("WebGL isn't available");
	}

	var vertices=new Float32Array([-0.1, -0.1, 1.0, 0.0, 0.0,
				          0,  0.1, 0.0, 1.0, 0.0,
					0.1, -0.1, 0.0, 0.0, 1.0]);

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	var program=initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	var buffer=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	var fSize=vertices.BYTES_PER_ELEMENT;

	var vPosition=gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, fSize*5, 0);
	gl.enableVertexAttribArray(vPosition);

	var vColor=gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, fSize*5, fSize*2);
	gl.enableVertexAttribArray(vColor);

	window.onkeydown=function(event)
	{
		var key=String.fromCharCode(event.keyCode);	


		switch(key)
		{
			case 'W':y+=0.3;

				if (y<1)
				{
					uTranslation=gl.getUniformLocation(program, "uTranslation");
					gl.uniform4f(uTranslation, x, y, 0.0, 0.0);
					render();
				}
				else
					y-=0.3;
				break;
			case 'A':x-=0.3;

				if (-1<x)
				{
					uTranslation=gl.getUniformLocation(program, "uTranslation");
					gl.uniform4f(uTranslation, x, y, 0.0, 0.0);
					render();
				}
				else
					x+=0.3;
				break;
			case 'S':y-=0.3;

				if (-1<y)
				{
					uTranslation=gl.getUniformLocation(program, "uTranslation");
					gl.uniform4f(uTranslation, x, y, 0.0, 0.0);
					render();
				}
				else
					y+=0.3;
				break;
			case 'D':x+=0.3;

				if (x<1)
				{
					uTranslation=gl.getUniformLocation(program, "uTranslation");
					gl.uniform4f(uTranslation, x, y, 0.0, 0.0);
					render();
				}
				else
					x-=0.3;
				break;
			case '1':uTranslation=gl.getUniformLocation(program, "uTranslation");
				gl.uniform4f(uTranslation, 0.0, 0.0, 0.0, 0.0);
				render();
				x=0.0;
				y=0.0;
		}
	};

	render();
};

function render()
{
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}
