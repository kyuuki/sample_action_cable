import consumer from "channels/consumer"

const btn = document.querySelector('#btn');
const body = document.querySelector('#body');
const name = document.querySelector('#name');
const messages = document.getElementById('messages');    

const app = consumer.subscriptions.create("MessageChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    const p = document.createElement('p');
    p.textContent = `${data.name}：${data.body}`;
    messages.prepend(p);      
  },

  sendMessage(name, msg) {
    return this.perform('sendMessage', { name: name, body: msg });
  }
});

btn?.addEventListener("click", function(e) {
  e.preventDefault();
  app.sendMessage(name.value, body.value);
    body.value = "";    
}, false);
