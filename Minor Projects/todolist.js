let list = document.querySelector(".tasks");
let addTask = document.querySelector("#input");
let btn = document.querySelector("#btn");

btn.addEventListener("click", (event) => {
  event.preventDefault();
  if (addTask.value == "") {
    console.log("No value passed");
  } else {
    let newList = document.createElement("li");
    let newBtn = document.createElement("button");
    newBtn.innerText = "Delete";
    newBtn.setAttribute("id", "delete");
    newList.innerText = `${addTask.value}   `;

    newList.append(newBtn);
    list.children[0].append(newList);
    addTask.value = "";

    console.log(newList.parentElement);
  }
});

let delBtn = document.querySelector("#delete");
list.addEventListener("click", (event) => {
  if (event.target.nodeName == "BUTTON") {
    event.target.parentElement.remove();
  }
});
