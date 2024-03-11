const cardContainer = document.getElementById("cardContainer");
const textMessage = document.getElementById("textMessage");
const submitButton = document.getElementById("submit");
const actualMessageContainer = document.getElementById(
  "actualMessageContainer"
);

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const url = "https://walloftext-986d8e27f640.herokuapp.com/walloftexts";
  const method = "POST";

  const message = {
    messages: textMessage.value, //messages is connected to the table name in MySQL hence messages: []
  };
  textMessage.value = "";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      console.error("Failed to send message");
    } else {
      await renderAllMessages();
      // location.reload(); //Reloads the page everytime a message is sent!
    }
  } catch (err) {
    console.error(err, "server failed");
  }
});

async function renderAllMessages() {
  const url = "https://walloftext-986d8e27f640.herokuapp.com/walloftexts";
  const method = "GET";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      console.error("Failed to get message");
      return;
    }
    const allMessages = await response.json();
    cardContainer.innerHTML = ""; // Clear cardContainer
    allMessages.reverse().forEach((message) => {
      const messageElement = document.createElement("p");
      messageElement.textContent = message.messages;
      messageElement.className = "card";
      cardContainer.appendChild(messageElement);
    });
  } catch (err) {
    console.error(err, "server failed");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await renderAllMessages();
});
