var addSkillbtn = document.getElementById("addmoreSkills");
var skillsList = document.querySelector(".skills-list");
var resumeForm = document.getElementById('resumeForm');
var resumeDisplay = document.getElementById('resumeDisplay');
var imageUrl = '';
addSkillbtn.onclick = function () {
    var newField = document.createElement('input');
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'skills-list[]');
    newField.setAttribute('placeholder', '');
    skillsList.appendChild(newField);
};
var profileImage = document.getElementById('img');
var imagePreview = document.getElementById('imagePreview');
profileImage.addEventListener('change', function () {
    var _a;
    var file = (_a = profileImage.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        imageUrl = URL.createObjectURL(file);
        imagePreview.src = imageUrl;
    }
});
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contact = document.getElementById('contact').value;
    var about = document.getElementById('about').value;
    var degree = document.getElementById('degree').value;
    var acadamicYear = document.getElementById('academicYear').value;
    var school = document.getElementById('school').value;
    var company = document.getElementById('company').value;
    var position = document.getElementById('position').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var description = document.getElementById('experienceDescription').value;
    var skillInputs = document.querySelectorAll('.skills-list input');
    var skills = Array.from(skillInputs).map(function (skillInput) { return skillInput.value; }).filter(function (skill) { return skill.trim() !== ''; });
    var resumeHTML = "\n        <h1>Resume</h1>\n        <div class=\"card\">\n          <div class=\"personalInfo\">\n           <img src=\"".concat(imageUrl, "\" alt=\"Profile Image\" height=\"250px\" width=\"250px\" id=\"image\"/>\n           <h2>Personal Information</h2>\n            <p><strong>Name:</strong> ").concat(name, "</p>\n            <p><strong>Contact:</strong> ").concat(contact, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <div class=\"about\">\n            <h3>About</h3>\n            <p>").concat(about, "</P>\n          </div>\n          </div> \n            <div class=\"secondSection\">\n                 <div class=\"experienceDisplay\">\n                    <h2> Work Experience</h2>\n                    <p><strong>Company:</strong> ").concat(company, "</p>\n                    <p><strong>Position:</strong> ").concat(position, "</p>\n                    <p><strong>From:</strong> ").concat(startDate, "</p>\n                    <p><strong>To:</strong> ").concat(endDate, "</p>\n                    <p><strong>Description:</strong> ").concat(description, "</p>\n                    <section class=\"skills-container\">\n                      <h2>Skills</h2>   \n                     <div class=\"skills-list\">\n                      ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "  \n                     </div>\n                    </section>  \n                    \n                    <h2>Education</h2>\n                    <p><strong>Degree:</strong> ").concat(degree, "</p>\n                    <p><strong>Year:</strong> ").concat(acadamicYear, "</p>\n                    <p><strong>School/College:</strong> ").concat(school, "</p>\n                 </div>\n            </div> \n        </div> \n    ");
    // Display the resume
    if (resumeDisplay) {
        resumeDisplay.innerHTML = resumeHTML;
    }
});
var generateButton = document.getElementById('generateButton');
generateButton.addEventListener('click', function () {
    // doing disable to all input filds in form
    var inputs = resumeForm.querySelectorAll('input');
    inputs.forEach(function (input) {
        input.disabled = true;
    });
    generateButton.style.display = 'none';
});
