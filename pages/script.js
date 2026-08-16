const WORKER_URL = "INSERISCI_QUI_L_URL_DEL_WORKER";

const messageInput = document.getElementById("message");
const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");
const count = document.getElementById("count");

messageInput.addEventListener("input", () => {
  count.textContent = messageInput.value.length;
});

sendButton.addEventListener("click", async () => {
  const message = messageInput.value.trim();

  if (!message) {
    status.textContent = "Scrivi prima un messaggio.";
    return;
  }

  sendButton.disabled = true;
  status.textContent = "Invio...";

  try {
    const response = await fetch(`${WORKER_URL}/message`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Errore durante l'invio.");
    }

    status.textContent = "✅ Messaggio inviato!";

    messageInput.value = "";
    count.textContent = "0";

  } catch (error) {
    console.error(error);
    status.textContent = "❌ Non è stato possibile inviare il messaggio.";
  }

  sendButton.disabled = false;
});
