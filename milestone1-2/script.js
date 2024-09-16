var btn = document.getElementById("toggleSkills");
var hiddenSkills = document.querySelectorAll(".hidden-skill");
var skillsList = document.querySelector(".skills-list");
var opened = false;
btn.addEventListener("click", function () {
    if (opened) {
        hiddenSkills.forEach(function (skill) { return skill.style.display = "none"; });
        skillsList.style.maxHeight = "180px";
        btn.textContent = "Show More";
    }
    else {
        hiddenSkills.forEach(function (skill) { return skill.style.display = "block"; });
        skillsList.style.maxHeight = "500px";
        btn.textContent = "Show Less";
    }
    opened = !opened;
});
