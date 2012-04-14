var http = require("http");
var url = require("url");

function start(route,handle) {
	http.createServer(function(request,response){
	var pathname = url.parse(request.url).pathname;
	console.log("Request for " +pathname+ "recieved.");
	var postdata = "";
	request.setEncoding("utf-8");
	request.addListener("data",function(postdatachunk) {
		postdata+=postdatachunk;
		console.log(" recieved chunk "+ postdatachunk);
	});
	request.addListener("end",function() {
		route(handle,pathname,response,request);
	});

}).listen(8888);
}
exports.start = start;
