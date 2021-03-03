const room = document.getElementById('room')
const button = document.getElementById('button')
const close = document.getElementById('close')
const box = document.getElementById('box')
const success = document.getElementById('success')

room.addEventListener('input', () => {
    if (room.value.length > 0) {
        if (button.disabled) {
            button.disabled = false;
        }
    } else {
        button.disabled = true;
    }
})

button.addEventListener('click', () => {
    electron.createRoom(room.value.trim());
    box.classList.add('hidden')
    success.classList.remove('hidden')

})

close.addEventListener('click', () => {
    window.close();
})
