let btn = document.querySelector('button');
let heading = document.querySelector('h1');
let box = document.querySelector('p');

function generateColor() {
    let val1,val2,val3;
    val1 = Math.floor(Math.random()* 255 + 1);
    val2 = Math.floor(Math.random()* 255 + 1);
    val3 = Math.floor(Math.random()* 255 + 1);

    let colorArray = [val1, val2, val3];
    return colorArray;
}

function changeColor() {
    let colorArr = generateColor();
    heading.innerText = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
    box.style.backgroundColor = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
}

btn.addEventListener('click', changeColor);


