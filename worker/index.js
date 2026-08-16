export default {
  async fetch(request) {
    return new Response("WORKER FUNZIONANTE!", {
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
};
