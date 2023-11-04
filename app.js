// const express=require("express")

// require("dotenv").config();

// const app=express()
// const products_router=require("./routes/products")
// const connectDB=require("./db/connect")
// const PORT=process.env.port || 5000
// app.get("/",(req,res)=>{
//     res.send("helloo world")
// })

// app.use("/api/products",products_router)

// const start=async()=>{
// try {
//      connectDB(process.env.MONGODB_URL);
//     app.listen(PORT,()=>{
//         console.log(`nothing broooo im just running at ${PORT}`)

//     })
// } catch (error) {
//     console.log(error);

// }

// }
// start()

//*******************************************************************//
//microtask =>{the preference of the promise is lower than nextTick() callback}

// order of the event loop is like this 1) nexttick 2)promise 3) settimeout,inteval 4)

process.nextTick(() => console.log("this is next tick 1"));
process.nextTick(() => {
  console.log("this is next tick 2");
  process.nextTick(() => {
    console.log("this is next tick inside next 3");
  });
});
Promise.resolve().then(() => console.log("this is promise 1"));
Promise.resolve().then(() => {
  process.nextTick(() => console.log("this is next tick inside the promise"));
});
Promise.resolve().then(() => {
  console.log("this promise 2");
});

//***************************************************************************//
//timer queue

setTimeout(() => console.log("this is the settimeout 1"), 0);
setTimeout(() => {
  console.log("this is the settimeout 2");
}, 0);
setTimeout(() => {
  process.nextTick(() => {
    console.log("this is the nextick method inside the settimeout");
  });
}, 0);

process.nextTick(() => console.log("this is next tick 1"));
process.nextTick(() => {
  console.log("this is next tick 2");
  process.nextTick(() => {
    console.log("this is next tick inside next 3");
  });
});
Promise.resolve().then(() => console.log("this is promise 1"));
Promise.resolve().then(() => {
  process.nextTick(() => console.log("this is next tick inside the promise"));
});
Promise.resolve().then(() => {
  console.log("this promise 2");
});

//*****************************************************************/
// i/o queue
// i/o queue and settimeout are never be gaurntee execution like in order they always varies soo we have to make sure about this two  things //
const fs = require("fs");
fs.readFile(__filename, () => {
  console.log("this is readfile ");
});

setTimeout(() => {
  console.log("this is interval ");
}, 0);

//*************************************************************************/

// i/o pooling
//soo the behaviour of the setImmediate is varies from i/o pooling like readfile 
const fs1 = require("fs");
fs1.readFile(__filename, () => {
  console.log("this is readfile fs1");
  process.nextTick(() => {
console.log("this is next tick inside the readfile");
process.nextTick(() => console.log("this is input pooling *****"));
Promise.resolve().then(() => console.log("this is promise ***"));
setTimeout(() => console.log("this is timeout"),1000);
  })
});
setImmediate(()=>{
    console.log("this is set Immediate :")
    process.nextTick(() => console.log("this is input settimmediate pooling "));
Promise.resolve().then(() => console.log("this is promise inside the immediate"));
setTimeout(() => console.log("this is timeout inside the setImmediate"));
})
process.nextTick(() => console.log("this is input pooling 1"));
Promise.resolve().then(() => console.log("this is promise 1"));
setTimeout(() => console.log("this is timeout"));

for(let i=0;i<=20000;i++){}     // it helps to  know the readfile behaviour

//close queue callbacks are executed after all the execution of event loop
//*******************************************************************************/

const fs2=require("fs")
const readableStream=fs2.createReadStream(__filename);
readableStream.close();

readableStream.on("close",()=>{
    console.log("this is read stream");
})
setImmediate(()=>{
    console.log("this is set Immediate :")
    process.nextTick(() => console.log("this is input settimmediate pooling "));
Promise.resolve().then(() => console.log("this is promise inside the immediate"));
setTimeout(() => console.log("this is timeout inside the setImmediate"));
})
process.nextTick(() => console.log("this is input pooling 1"));
Promise.resolve().then(() => console.log("this is promise 1"));
setTimeout(() => console.log("this is timeout"));

//*********************************/