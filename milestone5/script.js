var html2pdf;
var skillbtn = document.getElementById("addmoreSkills");
var SkillsList = document.querySelector(".skills-list");
var ResumeForm = document.getElementById('resumeForm');
var ResumeDisplay = document.getElementById('resumeDisplay');
var shareableLinkContainer = document.getElementById('shareContainer');
var shareLink = document.getElementById('shareLink');
var downloadPDF = document.getElementById('downloadPDF');
var mainHeading = document.getElementById('mainHeading');
var shareHeading = document.getElementById('shareHeading');
skillbtn.onclick = function () {
    var newField = document.createElement('input');
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'skills-list[]');
    SkillsList.appendChild(newField);
};
var ImageUrl = '';
var ProfileImage = document.getElementById('img');
var ImagePreview = document.getElementById('image');
ProfileImage.addEventListener('change', function () {
    var _a;
    var PImage = (_a = ProfileImage.files) === null || _a === void 0 ? void 0 : _a[0];
    if (PImage) {
        var reader_1 = new FileReader();
        reader_1.onloadend = function () {
            ImageUrl = reader_1.result;
        };
        reader_1.readAsDataURL(PImage);
    }
});
ResumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('userName').value.trim();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contact = document.getElementById('contact').value;
    var about = document.getElementById('about').value;
    var degree = document.getElementById('degree').value;
    var academicYear = document.getElementById('academicYear').value;
    var school = document.getElementById('school').value;
    var company = document.getElementById('company').value;
    var position = document.getElementById('position').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var description = document.getElementById('experienceDescription').value.trim();
    var skillInputs = document.querySelectorAll('.skills-list input');
    var skills = Array.from(skillInputs).map(function (skillInput) { return skillInput.value.trim(); }).filter(function (skill) { return skill !== ''; });
    var resumeHTML = "\n        <div class=\"card\">\n          <div class=\"personalInfo\">\n            <img src=\"".concat(ImageUrl, "\" alt=\"Profile Image\" height=\"200px\" width=\"200px\" id=\"image\"/>\n            <h2>Personal Information</h2>\n            <p><strong>Name:</strong> ").concat(name, "</p>\n            <p><strong>Contact:</strong> ").concat(contact, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <div class=\"about\">\n              <h3>About</h3>\n              <p>").concat(about, "</p>\n            </div>\n          </div> \n          <div class=\"secondSection\">\n            <div class=\"experienceDisplay\">\n              <h2>Work Experience</h2>\n              <p><strong>Company:</strong> ").concat(company, "</p>\n              <p><strong>Position:</strong> ").concat(position, "</p>\n              <p><strong>From:</strong> ").concat(startDate, "</p>\n              <p><strong>To:</strong> ").concat(endDate, "</p>\n              <p><strong>Description:</strong> ").concat(description, "</p>\n            </div>\n            <section class=\"skills-container\">\n              <h2>Skills</h2>\n              <ul class=\"skills-list\">\n                ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "  \n              </ul>\n            </section>\n            <h2>Education</h2>\n            <p><strong>Degree:</strong> ").concat(degree, "</p>\n            <p><strong>Year:</strong> ").concat(academicYear, "</p>\n            <p><strong>School/College:</strong> ").concat(school, "</p>\n          </div>\n        </div>\n    ");
    var resumeData = {
        name: name,
        email: email,
        contact: contact,
        about: about,
        company: company,
        position: position,
        startDate: startDate,
        endDate: endDate,
        description: description,
        degree: degree,
        academicYear: academicYear,
        school: school,
        skills: skills,
        ImageUrl: ImageUrl
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    shareLink.href = shareableURL;
    shareableLinkContainer.style.display = 'block';
    shareLink.textContent = shareableURL;
    if (ResumeDisplay) {
        ResumeDisplay.innerHTML = resumeHTML;
    }
});
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        ResumeForm.style.display = 'none';
        mainHeading.style.display = 'none';
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            var resumeHTML = "\n                <div class=\"card\">\n                  <div class=\"personalInfo\">\n                    <img src=\"".concat(resumeData.ImageUrl, "\" alt=\"Profile Image\" height=\"200px\" width=\"200px\" id=\"image\"/>\n                    <h2>Personal Information</h2>\n                    <p><strong>Name:</strong> ").concat(resumeData.name, "</p>\n                    <p><strong>Contact:</strong> ").concat(resumeData.contact, "</p>\n                    <p><strong>Email:</strong> ").concat(resumeData.email, "</p>\n                    <div class=\"about\">\n                      <h3>About</h3>\n                      <p>").concat(resumeData.about, "</p>\n                    </div>\n                  </div>\n                  <div class=\"secondSection\">\n                    <div class=\"experienceDisplay\">\n                      <h2>Work Experience</h2>\n                      <p><strong>Company:</strong> ").concat(resumeData.company, "</p>\n                      <p><strong>Position:</strong> ").concat(resumeData.position, "</p>\n                      <p><strong>From:</strong> ").concat(resumeData.startDate, "</p>\n                      <p><strong>To:</strong> ").concat(resumeData.endDate, "</p>\n                      <p><strong>Description:</strong> ").concat(resumeData.description, "</p>\n                    </div>\n                    <section class=\"skills-container\">\n                      <h2>Skills</h2>\n                      <ul class=\"skills-list\">\n                        ").concat(resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "  \n                      </ul>\n                    </section>\n                    <h2>Education</h2>\n                    <p><strong>Degree:</strong> ").concat(resumeData.degree, "</p>\n                    <p><strong>Year:</strong> ").concat(resumeData.academicYear, "</p>\n                    <p><strong>School/College:</strong> ").concat(resumeData.school, "</p>\n                  </div>\n                </div>\n            ");
            ResumeDisplay.innerHTML = resumeHTML;
        }
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
        shareHeading.style.display = 'flex';
        shareLink.style.display = 'block';
    }
});
saveButton.addEventListener('click', function () {
    ResumeForm.style.display = 'none';
    mainHeading.style.display = 'none';
    downloadPDF.style.display = 'block';
    alert('Resume Saved Successfully');
});
// download PDF
downloadPDF.addEventListener('click', function () {
    if (ResumeDisplay && ResumeDisplay.innerHTML) {
        var opt = {
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(ResumeDisplay).set(opt).save();
    }
});
