let url = 'https://icanhazdadjoke.com';

let para = document.querySelector('p');
let btn = document.querySelector('button');

function flashBtn() {
    btn.classList.add('flash');
    setTimeout(() => {
        btn.classList.remove('flash');
    }, 50)
}

async function tellMeJoke() {
    try {
        let res = await axios.get(url, {
            headers: {
                'Accept' : 'application/json'
            }
        });
        return res.data;
    } catch(error) {
        para.innerText = "Uhm, seems like Dad isn't around!";
    } 
}

btn.addEventListener('click', async () => {
    flashBtn();
    let newJoke = await tellMeJoke();
    para.innerText = `${newJoke.joke}`;
});





