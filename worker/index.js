let currentMessage = null;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    // Pagina principale
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(`
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="UTF-8">
          <title>Tablet Casa API</title>
        </head>
        <body>
          <h1>📱 Tablet Casa API</h1>
          <p>Worker online.</p>
        </body>
        </html>
      `, {
        headers: {
          "Content-Type": "text/html; charset=UTF-8"
        }
      });
    }

    // Controlla messaggio
    if (request.method === "GET" && url.pathname === "/message") {
      return json({
        message: currentMessage
      });
    }

    // Invia messaggio
    if (request.method === "POST" && url.pathname === "/message") {
      try {
        const body = await request.json();

        if (
          !body.message ||
          typeof body.message !== "string" ||
          !body.message.trim()
        ) {
          return json({
            error: "Messaggio non valido."
          }, 400);
        }

        currentMessage = {
          id: Date.now(),
          message: body.message.trim(),
          read: false,
          createdAt: new Date().toISOString()
        };

        return json({
          success: true,
          message: currentMessage
        });

      } catch {
        return json({
          error: "JSON non valido."
        }, 400);
      }
    }

    // Segna come letto
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

    return json({
      error: "Endpoint non trovato."
    }, 404);
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
