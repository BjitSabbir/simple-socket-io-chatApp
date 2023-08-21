import { io } from "socket.io-client"
const chatInput = document.getElementById("chatInpput")
const sendChatBtn = document.getElementById("sendChatBtn")
const connectionStatus = document.getElementById("connectionStatus")
const roomInput = document.getElementById("roomInput")
const roomInputBtn = document.getElementById("roomInputBtn")
const chatBoxDiv = document.getElementById("chatBoxdiv")

const chatValue =[];

const socket = io("http://localhost:3000")

const displayMessageReceived = (value) => {
    const messageElement = document.createElement("div");
    const hr = document.createElement("hr");
  
    messageElement.textContent = value.message; 
    messageElement.style.textAlign = value.style; // Set text alignment to left
    value.userId ? messageElement.style.color = "red" : messageElement.style.color = "green"
    messageElement.style.paddingLeft="10px";
    messageElement.style.paddingRight="10px";

    // 
    chatBoxDiv.appendChild(messageElement);
    chatBoxDiv.appendChild(hr);
  };

  const displayConnectionStatus =(id)=>{
    connectionStatus.innerHTML=""
    const connectionElement = document.createElement("div")
    connectionElement.textContent="🟢 connected with id" + id
    connectionStatus.appendChild(connectionElement)
  }
  
socket.on("connect",()=>{
    console.log(socket.id)
    displayConnectionStatus(socket.id)
})

socket.on("receive-message",(value)=>{
    chatValue.push(value); 
    displayMessageReceived(value)
})

sendChatBtn.addEventListener("click", () => {
    const message = chatInput.value;

    if(message!==""){
        chatValue.push({message : message,
            style : "left",
        }); // Save the message in the array
        updateChatBox(); // Update the chat box with the new messages
        chatInput.value = ''; // Clear the input field
        socket.emit("send-chat",message,socket.id)
    }
  });

  roomInputBtn.addEventListener("click", () => {
    const roomName = roomInput.value;
    console.log("Room Name:", roomName);
  });

  function updateChatBox() {
    chatBoxDiv.innerHTML = ''; // Clear the chat box
    for (const message of chatValue) {
        displayMessageReceived(message) 
    }
  }