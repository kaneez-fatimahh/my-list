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
    console.log("hyy");
    let itemId = `${newLi.id}`;
    //let itemId = e.target.id;
    let targetElement = document.getElementById(itemId);
    console.log(itemId + "ye ha ");
    icon = document.createElement("i");
    icon.className = "fa fa-check";
    targetElement.insertBefore(icon, targetElement.firstChild);
    newLi.classList.toggle("active");
    getData = localStorage.getItem("Data");
    if (getData) {
      let parseData = JSON.parse(getData);
      let updatedData = parseData.map((x) => {
        if (x.id === parseInt(item.id)) {
          return {
            id: x.id,
            liData: x.liData,
            incomplete: !x.incomplete,
          };
        } else {
          return x;
        }
      });
      localStorage.setItem("Data", JSON.stringify(updatedData));
    }
  };
  newLi.id = `${item.id}`;
  // newLi.classList.add("active");
  newLi.innerHTML = `${item.liData} <span class="float-end" onclick="dell(event)"><i class="fa-solid fa-xmark"></i></span>`;
  list.appendChild(newLi);
  console.log(item.id);
  input.value = "";
};

addButton.addEventListener("click", () => {
  const storedData = JSON.parse(localStorage.getItem("Data")) || [];
  const inputValue = input.value.trim().toLowerCase();
  if (inputValue === "" || storedData.some((x) => x.liData === inputValue)) {
    console.log("Already exists or empty input");
  } else {
    const newData = {
      id: storedData.length,
      liData: input.value,
      incomplete: false,
    };
    storedData.push(newData);
    localStorage.setItem("Data", JSON.stringify(storedData));
    createListItem(newData);
  }
});

displaydata();
