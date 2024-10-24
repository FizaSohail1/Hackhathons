var coverPage = document.getElementById('cover-page');
var formPage = document.getElementById('form-page');
var startButton = document.getElementById('start-button');
var addSkillbtn = document.getElementById("addmoreSkills");
var skillsList = document.querySelector('.skills-list');
var resumeForm = document.getElementById('resumeForm');
var resumeDisplay = document.getElementById('resumeDisplay');
var nextStepBtn = document.getElementById('nextStep');
var personalInfoForm = document.getElementById('personalInfoForm');
var experienceForm = document.getElementById('experienceForm');
var educationForm = document.getElementById('educationForm');
var skillsForm = document.getElementById('skillsForm');
var progress = document.getElementById('progress');
var generateButton = document.getElementById('generateButton');
startButton.addEventListener('click', function () {
    coverPage.style.display = 'none';
    formPage.style.display = 'block';
});
var addMoreExperienceBtn = document.getElementById('addMoreExperience');
var experienceFieldsContainer = document.getElementById('experienceFields');
var addMoreEducationBtn = document.getElementById('addMoreEducation');
var educationFieldContainer = document.getElementById('educationFields');
addMoreExperienceBtn.addEventListener('click', function () {
    var experienceTemplate = document.createElement('div');
    experienceTemplate.className = 'experience-section';
    experienceTemplate.innerHTML = "\n        <div class=\"form-section\">\n            <div class=\"form-group\">\n                <label for=\"company\">Employer</label>\n                <input type=\"text\" name=\"company[]\" placeholder=\"Ex: Microsoft\" required />\n            </div>\n            <div class=\"form-group\">\n                <label for=\"position\">Job Title</label>\n                <input type=\"text\" name=\"position[]\" placeholder=\"Ex: Full Stack Developer\" required />\n            </div>\n        </div>\n        <div class=\"form-section\">\n            <div class=\"form-group\">\n                <label for=\"experienceDescription\">Job Description</label>\n                <textarea name=\"experienceDescription[]\" rows=\"5\" required></textarea>\n            </div>\n        </div>\n        <div class=\"form-section\">\n            <div class=\"form-group\">\n                <label for=\"startDate\">Start Date</label>\n                <input type=\"date\" name=\"startDate[]\" required />\n            </div>\n            <div class=\"form-group\">\n                <label for=\"endDate\">End Date</label>\n                <input type=\"date\" name=\"endDate[]\" />\n            </div>\n        </div>\n        <hr/>\n    ";
    experienceFieldsContainer.appendChild(experienceTemplate);
});
addMoreEducationBtn.addEventListener('click', function () {
    var educationTemplate = document.createElement('div');
    educationTemplate.className = 'education-section';
    educationTemplate.innerHTML = "\n      <div class=\"form-section\">\n          <div class=\"form-group\">\n              <label for=\"school\">School/College</label>\n              <input type=\"text\" name=\"school[]\" required />\n          </div>\n          <div class=\"form-group\">\n              <label for=\"degree\">Qualification</label>\n              <input type=\"text\" name=\"degree[]\" placeholder=\"Ex: Bacheolars\" required />\n          </div>\n      </div>\n      <div class=\"form-section\">\n          <div class=\"form-group\">\n              <label for=\"field\">Field Of Study</label>\n              <input type=\"text\" name=\"field[]\" placeholder=\"Ex: Computer Science\" required />\n          </div>\n          <div class=\"form-group\">\n              <label for=\"year\">Academic Year</label>\n              <input type=\"number\" name=\"year[]\" />\n          </div>\n      </div>\n      <hr/>\n  ";
    educationFieldContainer.appendChild(educationTemplate);
});
addSkillbtn.addEventListener('click', function () {
    var newField = document.createElement('input');
    newField.type = 'text';
    newField.setAttribute('name', 'skills-list[]');
    newField.className = 'skills-input';
    skillsList.appendChild(newField);
});
var imgField = document.getElementById('imgField');
var imageUrl = '';
imgField.addEventListener('change', function () {
    if (imgField.files && imgField.files[0]) {
        var file = imgField.files[0];
        if (file.type.startsWith('image/')) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                // Store the image data URL in the imageUrl variable
                imageUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                console.log(imageUrl);
            };
            reader.readAsDataURL(file);
        }
        else {
            alert('Please select a valid image file.');
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    if (resumeForm) {
        resumeForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevents page reload
            var firstName = document.getElementById('firstname');
            var lastName = document.getElementById('lastname');
            var profession = document.getElementById('profession');
            var city = document.getElementById('city');
            var country = document.getElementById('country');
            var phone = document.getElementById('phone');
            var email = document.getElementById('email');
            var about = document.getElementById('about');
            var skillInputs = document.querySelectorAll('.skills-list input');
            var skills = Array.from(skillInputs).map(function (skillInput) { return skillInput.value; }).filter(function (skill) { return skill.trim() !== ''; });
            // experiences 
            var companies = document.querySelectorAll('[name="company[]"]');
            var positions = document.querySelectorAll('[name="position[]"]');
            var descriptions = document.querySelectorAll('[name="experienceDescription[]"]');
            var startDates = document.querySelectorAll('[name="startDate[]"]');
            var endDates = document.querySelectorAll('[name="endDate[]"]');
            var experienceHTML = '';
            for (var i = 0; i < companies.length; i++) {
                experienceHTML += "\n                  <div class=\"experience-item\">\n                      <p><strong>Company:</strong> ".concat(companies[i].value, "</p>\n                      <p><strong>Position:</strong> ").concat(positions[i].value, "</p>\n                      <p><strong>From:</strong> ").concat(startDates[i].value, " <strong>to:</strong> ").concat(endDates[i].value || 'Present', "</p>\n                      <p><strong>Description:</strong> ").concat(descriptions[i].value, "</p>\n                  </div>\n                  <hr/>\n              ");
            }
            //education
            var schools = document.querySelectorAll('[name="school[]"]');
            var degrees = document.querySelectorAll('[name="degree[]"]');
            var fields = document.querySelectorAll('[name="field[]"]');
            var years = document.querySelectorAll('[name="year[]"]');
            var educationHTML = '';
            for (var i = 0; i < schools.length; i++) {
                educationHTML += "\n                   <div class=\"education-item\">\n                       <p><strong>School/College:</strong> ".concat(schools[i].value, "</p>\n                       <p><strong>Qualification:</strong> ").concat(degrees[i].value, "</p>\n                       <p><strong>Field Of Study:</strong> ").concat(fields[i].value, "</p>\n                       <p><strong>Academic Year:</strong> ").concat(years[i].value, "</p>\n                   </div>\n                   <hr/>\n               ");
            }
            var resumeHTML = "\n              <div class=\"card\">\n                  <div class=\"left-side\">\n                      <div class=\"personalInfo\">\n                        <img src=\"".concat(imageUrl, "\" style=\"width: 200px; height: 200px;\" id=\"profileImage\" />\n                        <h1><strong> ").concat(firstName.value, " ").concat(lastName.value, " </strong></h1>\n                       <h4>").concat(profession.value, "</h4>\n                       <div class=\"contactSection\">\n                        <h2>Contact</h2>\n                        <p><strong>Phone:</strong> ").concat(phone.value, "</p>\n                        <p><strong>Email:</strong> ").concat(email.value, "</p>\n                       <p><strong>Address:</strong> ").concat(city.value, ", ").concat(country.value, "</p>\n                     </div>\n                    <div class=\"skills-container\">\n                    <h2>Skills</h2>\n                    <div class=\"skills-list\"> ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</div>\n                   </div>\n                  </div>\n                </div>\n                 <div class=\"secondSection\">\n        <div class=\"about\">\n          <h3>About Me</h3>\n          <p>").concat(about.value, "</p>\n          <hr/>\n        </div>\n         <div class=\"experienceAndEducationDisplay\">\n                          <h2>Work Experience</h2>\n                          ").concat(experienceHTML, "  \n\n                          <h2>Education</h2>\n                        ").concat(educationHTML, "\n\n                        </div>\n                    </div>\n                  </div>\n          ");
            resumeDisplay.innerHTML = resumeHTML;
        });
    }
});
var nextStep = 0;
experienceForm.style.display = 'none';
educationForm.style.display = 'none';
skillsForm.style.display = 'none';
generateButton.addEventListener('click', function () {
    nextStep++;
    experienceForm.style.display = 'none';
    educationForm.style.display = 'none';
    skillsForm.style.display = 'none';
    resumeDisplay.style.display = 'none';
    switch (nextStep) {
        case 1:
            experienceForm.style.display = 'block';
            personalInfoForm.style.display = 'none';
            break;
        case 2:
            educationForm.style.display = 'block';
            experienceForm.style.display = 'none';
            break;
        case 3:
            skillsForm.style.display = 'block';
            educationForm.style.display = 'none';
            generateButton.textContent = 'Generate Resume';
            break;
        case 4:
            formPage.style.display = 'none';
            resumeDisplay.style.display = 'block';
            var inputs = resumeForm.querySelectorAll('input');
            inputs.forEach(function (input) {
                input.disabled = true;
            });
            break;
    }
    var progressPercentage = (nextStep / 4) * 100;
    progress.style.width = "".concat(progressPercentage, "%");
});
