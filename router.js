function route(handle, pathname, response, request) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](request, response);
	}
	else {
		console.log("Wrong URL");
		response.writeHead(404,{"Content-Type":"text/plain"});
		response.write("404 not found");
		response.end();
	}	
}
exports.route=route;
