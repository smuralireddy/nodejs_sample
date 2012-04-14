var querystring = require("querystring");
var formidable = require("formidable");
var fs = require("fs");

function start(response) {
	var exec=require("child_process").exec;
	console.log(" Request handler for start called ");
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write('<html>'+
			'<body>'+
			'<form action="upload" method="post">'+
			'<input type="file" name="upload" multiple="multiple"/>'+
			'<input type="submit" value="submit"/>'+
			'</form></body></html>');
	response.end();
}
function upload(request, response) {
	console.log(" Request handler for upload called ");
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		fs.rename(files.upload.path, "/tmp/test.png", function(err) {
			if (err) {
        			fs.unlink("/tmp/test.png");
        			fs.rename(files.upload.path, "/tmp/test.png");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}
function show(response) {
	fs.readFile("/tmp/test.png", "binary", function(error, file) {
		if(error) {
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write("Error "+ error);
		}
		else {
			response.writeHead(200,{"Content-Type":"image/png"});
			response.write(file,"binary");
			response.end();
		}
	});
}

exports.start=start;
exports.upload=upload;
exports.show=show;
