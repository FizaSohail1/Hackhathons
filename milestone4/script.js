var addskillbtn = document.getElementById("addmoreSkills");
var SkillsList = document.querySelector(".skills-list");
var ResumeForm = document.getElementById('resumeForm');
var ResumeDisplay = document.getElementById('resumeDisplay');
var ImageUrl = '';
addskillbtn.onclick = function () {
    var newField = document.createElement('input');
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'skills-list[]');
    newField.setAttribute('placeholder', '');
    SkillsList.appendChild(newField);
};
var ProfileImage = document.getElementById('img');
var ImagePreview = document.getElementById('imagePreview');
ProfileImage.addEventListener('change', function () {
    var _a;
    var file = (_a = ProfileImage.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        ImageUrl = URL.createObjectURL(file);
        ImagePreview.src = ImageUrl;
    }
});
ResumeForm.addEventListener('submit', function (event) {
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
    var resumeHTML = "\n        <h1>Resume</h1>\n        <div class=\"card\">\n          <div class=\"personalInfo\">\n           <img src=\"".concat(ImageUrl, "\" alt=\"Profile Image\" height=\"250px\" width=\"250px\" id=\"image\" contenteditable=\"true\"/>\n           <h2>Personal Information</h2>\n            <p><strong>Name:</strong><span contenteditable=\"true\"> ").concat(name, "</span></p>\n            <p><strong>Contact:</strong><span contenteditable=\"true\"> ").concat(contact, "</span></p>\n            <p><strong>Email:</strong><span contenteditable=\"true\"> ").concat(email, "</span></p>\n            <div class=\"about\">\n            <h3>About</h3>\n            <p contenteditable = \"true\">").concat(about, "</P>\n          </div>\n          </div> \n            <div class=\"secondSection\">\n                 <div class=\"experienceDisplay\">\n                    <h2> Work Experience</h2>\n                    <p><strong>Company:</strong><span contenteditable=\"true\"> ").concat(company, "</span></p>\n                    <p><strong>Position:</strong><span contenteditable=\"true\"> ").concat(position, "</span></p>\n                    <p><strong>From:</strong><span contenteditable=\"true\"> ").concat(startDate, "</span></p>\n                    <p><strong>To:</strong><span contenteditable=\"true\"> ").concat(endDate, "</span></p>\n                    <p><strong>Description:</strong><span contenteditable=\"true\"> ").concat(description, "</span></p>\n                    <section class=\"skills-container\">\n                      <h2>Skills</h2>   \n                     <div class=\"skills-list\">\n                      ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "  \n                     </div>\n                    </section>  \n                    \n                    <h2>Education</h2>\n                    <p\"><strong>Degree:</strong><span contenteditable=\"true\"> ").concat(degree, "</span></p>\n                    <p><strong>Year:</strong><span contenteditable=\"true\"> ").concat(acadamicYear, "</span></p>\n                    <p><strong>School/College:</strong><span contenteditable=\"true\"> ").concat(school, "</span></p>\n                 </div>\n            </div> \n        </div> \n    ");
    // Display the resume
    if (ResumeDisplay) {
        ResumeDisplay.innerHTML = resumeHTML;
    }
});
var GenerateButton = document.getElementById('generateButton');
var saveButton = document.getElementById('saveButton');
var generated = false;
GenerateButton.addEventListener('click', function () {
    if (!generated) {
        GenerateButton.textContent = "Edit Resume";
        saveButton.style.display = 'inline-block';
        generated = true;
    }
});
saveButton.addEventListener('click', function () {
    GenerateButton.style.display = 'none';
    saveButton.style.display = 'none';
    alert('Resume Saved Successfully');
});
