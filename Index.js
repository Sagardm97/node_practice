const http=require("node:http")
const server=http.createServer((req,res)=>{
    const superHero=
    {
        fname:"ssss",
        lname:"lowdu",
    };
    res.writeHead(300,{"content-Type":"application/json"});
    res.end(JSON.stringify(superHero))

})
server.listen(3000,()=>{
    console.log("server is  successfully running at port 3000")
})
