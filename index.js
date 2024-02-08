let addButton = document.getElementById("button-addon2");
let list = document.getElementById("list");
let delIcon = document.getElementById("dell");
let input = document.getElementsByClassName("form-control")[0];

// del items
let dell = (e) => {
  let itemId = e.target.parentElement.parentElement.id;
  getData = localStorage.getItem("Data");
  if (getData) {
    let parseData = JSON.parse(getData);
    let updatedData = parseData.filter((x) => x.id !== parseInt(itemId));
    localStorage.setItem("Data", JSON.stringify(updatedData));
    e.target.parentElement.parentElement.remove();
  }
};

// Save data on local storage
function saveDataOnLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem("Data")) || [];
  let newData = {
    id: storedData.length,
    liData: input.value,
  };
  storedData.push(newData);
  localStorage.setItem("Data", JSON.stringify(storedData));
}

// Display data from local storage
let displaydata = () => {
  getData = localStorage.getItem("Data");
  if (getData) {
    let parseData = JSON.parse(getData);
    parseData.forEach((value) => {
      createListItem(value);
    });
  }
};

let createListItem = (item) => {
  let newLi = document.createElement("li");
  let icon;
  newLi.onclick = function (e) {
    console.log("hyyy hlooo");
    let itemId = e.target.id;
    let targetElement = document.getElementById(itemId);
    if (targetElement.classList.contains("active")) {
      targetElement.classList.remove("active");
      if (targetElement.contains(icon)) {
        icon.remove();
      }
    
     
    else {
      targetElement.classList.add("active");
      icon = document.createElement("i");
      icon.className = "fa fa-check";
      targetElement.insertBefore(icon, targetElement.firstChild);
     getData = localStorage.getItem("Data");
      if (getData) {
        let parseData = JSON.parse(getData);
        let updatedData = parseData.filter((x) => x.id !== parseInt(itemId));
        let updatedobj = {
          id :`${targetElement}`,
          liData :`${item.liData}`
        }
        let newupdatedData =  updatedData.push(updatedobj)
        localStorage.setItem("Data", JSON.stringify(newupdatedData));
    } 
   }
  };
  }
  newLi.id = `${item.id}`;
  newLi.classList.add("gray");
  newLi.innerHTML = `${item.liData} <span class="float-end" onclick="dell(event)"><i class="fa-solid fa-xmark"></i></span>`;
  list.appendChild(newLi);
  console.log(item.id);
  input.value = "";
};

addButton.addEventListener("click", () => {
  saveDataOnLocalStorage();
  const newData = {
    id: localStorage.getItem("Data").length,
    liData: input.value,
  };
  createListItem(newData);
});

displaydata();
