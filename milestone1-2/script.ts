const btn = document.getElementById("toggleSkills") as HTMLButtonElement
const hiddenSkills = document.querySelectorAll(".hidden-skill") as NodeListOf<HTMLElement>;
const skillsList = document.querySelector(".skills-list") as HTMLDivElement ;
let opened = false;

function openedaddmore(){
    if (opened) {
        hiddenSkills.forEach(skill => skill.style.display = "none");
        skillsList.style.maxHeight = "280px";
        btn.textContent = "Show More";
    } else {
        hiddenSkills.forEach(skill => skill.style.display = "block");

.        skillsList.style.maxHeight = "800px"; 
        btn.textContent = "Show Less";
    }
}

let button = 0

btn.addEventListener("click", () => {
    button++

    switch(button){
        case 1:openedaddmore();
        break
        case 2:
            hiddenSkills.forEach(skill => skill.style.display = "none");
            skillsList.style.maxHeight = "280px";
            btn.textContent = "Show More";
        break;
        case 3: openedaddmore()
    }
   
   
});