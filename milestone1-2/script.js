var btn = document.getElementById("toggleSkills");
var hiddenSkills = document.querySelectorAll(".hidden-skill");
var skillsList = document.querySelector(".skills-list");
var opened = false;
function openedaddmore() {
    if (opened) {
        hiddenSkills.forEach(function (skill) { return skill.style.display = "none"; });
        skillsList.style.maxHeight = "280px";
        btn.textContent = "Show More";
    }
    else {
        hiddenSkills.forEach(function (skill) { return skill.style.display = "block"; });
        skillsList.style.maxHeight = "800px";
        btn.textContent = "Show Less";
    }
}
var button = 0;
btn.addEventListener("click", function () {
    button++;
    switch (button) {
        case 1:
            openedaddmore();
            break;
        case 2:
            hiddenSkills.forEach(function (skill) { return skill.style.display = "none"; });
            skillsList.style.maxHeight = "280px";
            btn.textContent = "Show More";
            break;
        case 3: openedaddmore();
    }
});
