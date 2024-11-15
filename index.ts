Bun.serve({
  fetch(req) {
    return new Response("Hello from Bun server!");
  },
});
console.log("Server running!");
