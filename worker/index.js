export default {
  async fetch(request) {
    return new Response("ziopera", {
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
};
