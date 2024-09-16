const btn = document.getElementById("toggleSkills") as HTMLButtonElement
const hiddenSkills = document.querySelectorAll(".hidden-skill") as NodeListOf<HTMLElement>;
const skillsList = document.querySelector(".skills-list") as HTMLDivElement ;
let opened = false;

function openedaddmore(){
    if (opened) {
        hiddenSkills.forEach(skill => skill.style.display = "none");
        skillsList.style.maxHeight = "180px";
        btn.textContent = "Show More";
    } else {
        hiddenSkills.forEach(skill => skill.style.display = "block");
        skillsList.style.maxHeight = "500px"; 
        btn.textContent = "Show Less";
    }
}

btn.addEventListener("click", () => {
   
   
});