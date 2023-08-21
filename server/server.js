const io = require("socket.io")(3000,{
    cors : {
        origin : ["http://localhost:8080"]
    }
})

io.on('connection', (socket) => {
    console.log(socket.id ,'connected!');
    socket.on("send-chat" ,( message,id )=>{
        console.log(id)
        socket.broadcast.emit("receive-message", {
            message : message,
            style : "right",
            userId : id
        })
    })

    socket.on('disconnect', () => {
        console.log(`A client with id ${socket.id} disconnected`);
      })
  });


  

