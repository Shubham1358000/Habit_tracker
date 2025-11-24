let userinput = document.querySelector("#habitInput");
let addBtn = document.querySelector("#addHabitBtn");
let hList = document.querySelector("#habitList");

let datastor = JSON.parse(localStorage.getItem("Habit")) || [];// get data from local storage or initialize empty array
display_Habit();// display existing habits on page load

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let userinp = userinput.value.trim();
  if (userinp === "") {
    alert("Please enter a habit");
    return;
  }
  const Habit = {
    name: userinp,
    strike: 0,
    lastcheck: null,
  };

  datastor.push(Habit);// user data push to array
  push_Datatosave();// array data push to local storage
  display_Habit();// delete the previous list and display updated list


  userinput.value = "";
});

function display_Habit() {
  hList.innerHTML = "";

  datastor.forEach((Habit, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <strong style="text-transform: capitalize;">${Habit.name}</strong><br>
    Streak: ${Habit.strike} days<br>
    <button onclick="markComplete(${index})">Mark Completed</button>
    <button onclick="delet_Habit(${index})" style="color:red; margin-top: 1px;">Delete</button>
    `;
    
    hList.appendChild(li);
    
  });
}


function markComplete(index) {
  const today = new Date().toDateString();
  if (datastor[index].lastcheck === today) {
    alert("Habit already marked as completed for today!");
    return;
  }

  Yesterday = new Date();
  Yesterday.setDate(Yesterday.getDate() - 1);
  datastor[index].strike = (datastor[index].lastcheck === Yesterday.toDateString())? datastor[index].strike + 1 : 1;
  datastor[index].lastcheck = today ;
  display_Habit();
  push_Datatosave();

}




function delet_Habit(index) {
  datastor.splice(index, 1);
  display_Habit();
  push_Datatosave();
}

function push_Datatosave() {
  localStorage.setItem("Habit", JSON.stringify(datastor));
}
