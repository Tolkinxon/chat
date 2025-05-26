const token = window.localStorage.getItem('token');
const username = window.localStorage.getItem('username');
if(!token) window.location = '/login';

const socket = io('/app', { auth:{ token }});
const chatContainer = document.getElementById('chat');
const senderSelect = document.getElementById('senderSelect');
const elForm = document.querySelector('form');
const input = document.getElementById('messageInput');
const elChaters = document.querySelector('.chaters');


    
    function renderUsers(obj){
        elChaters.innerHTML = '';
        for(let key in obj){
            if(key != username){
                const p = document.createElement('p');
                p.classList.add('chaters-item')
                p.textContent = key;
                p.value = key;
                p.dataset.id = key;
                elChaters.append(p);
            }
        }
        elChaters.childNodes[0].classList.add('active');
        window.localStorage.setItem('partner', elChaters.childNodes[0].dataset.id);
    }

    elChaters.addEventListener('click', (evt)=>{
      const chater = evt.target.matches('.chaters-item');
      if(chater) {
        elChaters.childNodes.forEach(item => item.classList.remove('active'));
        evt.target.classList.add('active');
        window.localStorage.setItem('partner', evt.target.dataset.id);
        socket.emit('changePartner')
      }
    })

    socket.emit('connected', { username });
    socket.on('joined', ({joinedUsername, allUser})=>{
        if(!(joinedUsername == username)) showFlash(`${joinedUsername} joined`);
        else{showFlash('You joined');}
        renderUsers(allUser);
    });

    socket.on('resive', (messages)=>{
        const partner = window.localStorage.getItem('partner')
        chatContainer.innerHTML = '';
        messages.forEach(({ from, to, message }) => {
          if(from == username && to == partner) sendMessage(message, undefined);
          if(from == partner && to == username) sendMessage(message, from);
        })
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
        const partner = window.localStorage.getItem('partner')
        socket.emit('send', {from: username, to: partner, message: data.text});
        input.value = '';
        input.focus();
    });