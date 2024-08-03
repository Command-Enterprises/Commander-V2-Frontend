const http = require("http")
const fs = require("fs")
const path = require("path")
http.createServer(async function(request,response){
    var parth = path.dirname(__filename) + request.url
    fs.readFile(parth, "utf8", function(err,data){
        if(err){
            response.writeHead(404,{"Content-Type":"text/html"})
            var notFoundFIle
            fs.readFile(path.dirname(__filename)+"\\404.html", "utf8", function(error,dat){
                if(error){
                    response.end("404.html wasnt found, something is wrong")
                    return;
                }else{  
                    notFoundFIle = dat
                    response.end(notFoundFIle)
                }
            });
        }else{
            var filetype = path.extname(parth).substring(1,path.extname(parth).length)
            var isImage = false
            if(filetype=="html"){
                response.writeHead(200,{"Content-Type":"text/html"})
            }else{
                if(filetype=="css"){
                    response.writeHead(200,{"Content-Type":"text/css"})
                }else{
                    if(filetype=="js"){
                        response.writeHead(200,{"Content-Type":"text/js"})
                    }else{
                        if(filetype=="jpeg"){
                            response.writeHead(200,{"Content-Type":"image/jpeg"})
                            isImage = true
                        }else{
                            if(filetype=="svg"){
                                response.writeHead(200,{"Content-Type":"image/svg+xml"})
                                isImage = true
                            }else{
                                if(filetype=="png"){
                                    response.writeHead(200,{"Content-Type":"image/png"})
                                    isImage = true
                                }
                            }
                        }
                    }
                }
            }
            if(!isImage){
                response.end(data,"utf8")
            }else{
                fs.createReadStream(parth).pipe(response);
            }
        }
    });
}).listen(80);