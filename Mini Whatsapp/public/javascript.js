let contacts = [];

async function fetchChats() {
    try {
        const response = await fetch('/chats/api');
        contacts = await response.json();
        console.log(contacts);
    } catch (err) {
        console.log("Error was ", err);
    }
}

fetchChats();

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const dropdownMenu = document.getElementById('dropdownMenu');


    function filterContacts() {
        const query = searchInput.value.toLowerCase();
        dropdownMenu.innerHTML = ''; 
        if (query === '') {
            dropdownMenu.style.display = 'none';
            return;
        }

        const filteredContacts = contacts.filter(contact => contact.toLowerCase().includes(query));


        if (filteredContacts.length > 0) {
            dropdownMenu.style.display = 'block';
            filteredContacts.forEach(contact => {
                const contactItem = document.createElement('div');
                contactItem.classList.add('dropdown-item');
                contactItem.textContent = contact;
                contactItem.addEventListener('click', () => selectContact(contact));
                dropdownMenu.appendChild(contactItem);
            });
        } else {
            dropdownMenu.style.display = 'none';
        }
    }


    function selectContact(contact) {
        searchInput.value = contact;
        dropdownMenu.style.display = 'none';
    }


    searchInput.addEventListener('input', filterContacts);
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
    let chats = document.querySelectorAll(".chat");

    chats.forEach(chat => {
        chat.addEventListener('click', () => {
            let contact = chat.getAttribute('data-contact');
            console.log(contact);
            window.location.href = `/chats/message?user_name=${contact}`;
        })
    })

    let messages = document.querySelectorAll(".message");
    let deleteBtn = document.querySelector('.deleteBtn');
    let editBtn = document.querySelector('.editBtn');

    messages.forEach(message => {
        message.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            let popupMenu = document.getElementById('popupMenu');
            let msgType = message.getAttribute('msgType');

            if(msgType === 'sent') {
                popupMenu.style.left = `${event.pageX}px`;
                popupMenu.style.top = `${event.pageY}px`;
                popupMenu.style.display = 'block';
            }
            console.log("Menu Accessed!");
            event.stopPropagation();

            editBtn.addEventListener('click', (event) => {
                let msgId = message.getAttribute('msgId');
                let name = message.getAttribute('usrName');
                window.location.href = `/chats/message/edit/?id=${msgId}&name=${name}`;
            })

            deleteBtn.addEventListener('click', async (event) => {
                let msgId = message.getAttribute('msgId');
                let name = message.getAttribute('usrName');
                await fetch(`/chats/delete/${msgId}/${name}`, { method: 'DELETE'});
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            })

        })
    })

});

document.addEventListener('click', () => {
    document.getElementById('popupMenu').style.display = 'none';
});

