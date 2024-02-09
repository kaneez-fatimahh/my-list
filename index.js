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
//create list
let createListItem = (item) => {
  let newLi = document.createElement("li");
  let itemId = `${item.id}`;
  newLi.id = `${item.id}`;
  newLi.innerHTML = `<i class="fa-solid fa-check icon"></i>${item.liData} <span class="float-end" onclick="dell(event)"><i class="fa-solid fa-xmark"></i></span>`;
  list.appendChild(newLi);
  input.value = "";
  const icon = newLi.querySelector(".icon");

  const updateStyle = () => {
    if (!item.incomplete) {
      newLi.style.textDecoration = "none";
      icon.style.display = "none";
    } else {
      newLi.style.textDecoration = "line-through";
      icon.style.display = "inline-block";
    }
  };

  updateStyle();

  newLi.onclick = function (e) {
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
      item.incomplete = !item.incomplete;
      updateStyle();
    }
  };
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
