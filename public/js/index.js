const token = window.localStorage.getItem('token');
const username = window.localStorage.getItem('username');
if(!token) window.location = '/login';

const socket = io('/app', { auth:{ token }});
const chatContainer = document.getElementById('chat');
const senderSelect = document.getElementById('senderSelect');
const elForm = document.querySelector('form');
const input = document.getElementById('messageInput');


    
    function renderUsers(obj){
        senderSelect.innerHTML = '';
        for(let key in obj){
            if(key != username){
                const option = document.createElement('option');
                option.textContent = key;
                option.value = key;
                senderSelect.append(option);
            }
        }
    }

    socket.emit('connected', { username });
    socket.on('joined', ({joinedUsername, allUser})=>{
        if(!(joinedUsername == username)) showFlash(`${joinedUsername} joined`);
        else{showFlash('You joined');}
        renderUsers(allUser);
    });

    socket.on('resive', ({from, message })=>{
        console.log(from, message);
        sendMessage(message, from);
    })

    function sendMessage(text, user='') {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const messageEl = document.createElement('div');
      messageEl.className = 'message ' + (user ? 'other' : 'user');

      messageEl.innerHTML = `
        <div class="sender">${user?user:username}</div>
        <div>${text}</div>
        <div class="time">${time}</div>
      `;

      chatContainer.appendChild(messageEl);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function showFlash(message) {
      const flash = document.createElement('div');
      flash.className = 'flash-message';
      flash.textContent = message;

      document.body.appendChild(flash);

      setTimeout(() => {
        flash.remove();
      }, 2500); // 2.5 soniyadan keyin o‘chadi
    }

    elForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        const formData = new FormData(elForm);
        const data = Object.fromEntries(formData);
        if (data.text === '') return;
        sendMessage(data.text, undefined);
        socket.emit('send', {from: username, to: data.selectedUser, message: data.text});
        input.value = '';
        input.focus();
    });