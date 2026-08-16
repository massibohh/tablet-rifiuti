let currentMessage = null;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders()
      });
    }

    // INVIA MESSAGGIO
    if (request.method === "POST" && url.pathname === "/message") {
      try {
        const body = await request.json();

        if (!body.message || typeof body.message !== "string") {
          return json(
            { error: "Messaggio non valido." },
            400
          );
        }

        const message = body.message.trim();

        if (!message) {
          return json(
            { error: "Il messaggio è vuoto." },
            400
          );
        }

        if (message.length > 300) {
          return json(
            { error: "Il messaggio è troppo lungo." },
            400
          );
        }

        currentMessage = {
          id: Date.now(),
          message: message,
          read: false,
          createdAt: new Date().toISOString()
        };

        return json({
          success: true,
          message: "Messaggio inviato."
        });

      } catch {
        return json(
          { error: "Richiesta non valida." },
          400
        );
      }
    }

    // IL TABLET CONTROLLA SE C'È UN MESSAGGIO
    if (request.method === "GET" && url.pathname === "/message") {
      return json({
        message: currentMessage
      });
    }

    // IL TABLET SEGNA IL MESSAGGIO COME LETTO
    if (
      request.method === "POST" &&
      url.pathname === "/message/read"
    ) {
      if (currentMessage) {
        currentMessage.read = true;
      }

      return json({
        success: true
      });
    }

    return new Response("Not Found", {
      status: 404,
      headers: corsHeaders()
    });
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders()
    }
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
