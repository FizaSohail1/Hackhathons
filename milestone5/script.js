var html2pdf;
var coverPage = document.getElementById('cover-page');
var formPage = document.getElementById('form-page');
var startButton = document.getElementById('start-button');
var addSkillbtn = document.getElementById("addmoreSkills");
var skillsList = document.querySelector('.skills-list');
var resumeForm = document.getElementById('resumeForm');
var resumeDisplay = document.getElementById('resumeDisplay');
var nextStepBtn = document.getElementById('nextBtn');
var personalInfoForm = document.getElementById('personalInfoForm');
var experienceForm = document.getElementById('experienceForm');
var educationForm = document.getElementById('educationForm');
var skillsForm = document.getElementById('skillsForm');
var progress = document.getElementById('progress');
var generateButton = document.getElementById('generateButton');
var shareableLinkContainer = document.getElementById('shareContainer');
var shareLink = document.getElementById('shareLink');
var downloadPDF = document.getElementById('downloadPDF');
var mainHeading = document.getElementById('mainHeading');
var shareHeading = document.getElementById('shareHeading');
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
    experienceTemplate.innerHTML = "\n        <div class=\"form-section\">\n            <div class=\"form-group\">\n                <label for=\"company\">Employer</label>\n                <input type=\"text\" name=\"company[]\" placeholder=\"Ex: Microsoft\" required />\n            </div>\n            <div class=\"form-group\">\n                <label for=\"position\">Job Title</label>\n                <input type=\"text\" name=\"position[]\" placeholder=\"Ex: Full Stack Developer\" required />\n            </div>\n        </div>\n        <div class=\"form-section\">\n            <div class=\"form-group\">\n                <label for=\"experienceDescription\">Job Description</label>\n                <textarea name=\"experienceDescription[]\" rows=\"5\" required></textarea>\n            </div>\n        </div>\n        <div class=\"form-section\">\n            <div class=\"form-group\">\n                <label for=\"startDate\">Start Date</label>\n                <input type=\"date\" name=\"startDate[]\" required />\n            </div>\n            <div class=\"form-group\">\n                <label for=\"endDate\">End Date</label>\n                <input type=\"date\" name=\"endDate[]\" />\n            </div>\n        </div>\n    ";
    experienceFieldsContainer.appendChild(experienceTemplate);
});
addMoreEducationBtn.addEventListener('click', function () {
    var educationTemplate = document.createElement('div');
    educationTemplate.className = 'education-section';
    educationTemplate.innerHTML = "\n      <div class=\"form-section\">\n          <div class=\"form-group\">\n              <label for=\"school\">School/College</label>\n              <input type=\"text\" name=\"school[]\" required />\n          </div>\n          <div class=\"form-group\">\n              <label for=\"degree\">Qualification</label>\n              <input type=\"text\" name=\"degree[]\" placeholder=\"Ex: Bacheolars\" required />\n          </div>\n      </div>\n      <div class=\"form-section\">\n          <div class=\"form-group\">\n              <label for=\"field\">Field Of Study</label>\n              <input type=\"text\" name=\"field[]\" placeholder=\"Ex: Computer Science\" required />\n          </div>\n          <div class=\"form-group\">\n              <label for=\"year\">Academic Year</label>\n              <input type=\"number\" name=\"year[]\" />\n          </div>\n      </div>\n  ";
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
// document.addEventListener('DOMContentLoaded', function () {
//     if (resumeForm) {
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents page reload
    var username = document.getElementById('userName').value.trim();
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
    var companies = document.querySelectorAll('[name="company[]"]');
    var positions = document.querySelectorAll('[name="position[]"]');
    var descriptions = document.querySelectorAll('[name="experienceDescription[]"]');
    var startDates = document.querySelectorAll('[name="startDate[]"]');
    var endDates = document.querySelectorAll('[name="endDate[]"]');
    var experienceHTML = '';
    for (var i = 0; i < companies.length; i++) {
        experienceHTML += "\n            <div class=\"experience-item editable-section\">\n                <p><strong>Company:</strong> ".concat(companies[i].value, "</p>\n                <p><strong>Position:</strong> ").concat(positions[i].value, "</p>\n                <p><strong>From:</strong> ").concat(startDates[i].value, " <strong>to:</strong> ").concat(endDates[i].value || 'Present', "</p>\n                <p><strong>Description:</strong> ").concat(descriptions[i].value, "</p>\n            </div>\n            <hr/>\n          ");
    }
    var schools = document.querySelectorAll('[name="school[]"]');
    var degrees = document.querySelectorAll('[name="degree[]"]');
    var fields = document.querySelectorAll('[name="field[]"]');
    var years = document.querySelectorAll('[name="year[]"]');
    var educationHTML = '';
    for (var i = 0; i < schools.length; i++) {
        educationHTML += "\n            <div class=\"education-item editable-section\">\n                <p><strong>School/College:</strong> ".concat(schools[i].value, "</p>\n                <p><strong>Qualification:</strong> ").concat(degrees[i].value, "</p>\n                <p><strong>Field Of Study:</strong> ").concat(fields[i].value, "</p>\n                <p><strong>Academic Year:</strong> ").concat(years[i].value, "</p>\n            </div>\n            <hr/>\n          ");
    }
    // Generating Resume HTML
    var resumeHTML = "\n          <div class=\"card\">\n            <div class=\"left-side\">\n              <div class=\"personalInfo editable-section\">\n                <img src=\"".concat(imageUrl, "\" style=\"width: 200px; height: 200px;\" id=\"profileImage\" />\n                <h1><strong>").concat(firstName.value, " ").concat(lastName.value, "</strong></h1>\n                <h4>").concat(profession.value, "</h4>\n                <div class=\"contactSection\">\n                  <h2>Contact</h2>\n                  <p><strong>Phone:</strong> ").concat(phone.value, "</p>\n                  <p><strong>Email:</strong> ").concat(email.value, "</p>\n                  <p><strong>Address:</strong> ").concat(city.value, ", ").concat(country.value, "</p>\n                </div>\n                <div class=\"skills-container\">\n                  <h2>Skills</h2>\n                  <ul class=\"skills-list\">").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n                </div>\n              </div>\n            </div>\n            <div class=\"secondSection\">\n              <div class=\"about editable-section\">\n                <h3>About Me</h3>\n                <p>").concat(about.value, "</p>\n                <hr/>\n              </div>\n              <div class=\"experienceAndEducationDisplay editable-section\">\n                <h2>Work Experience</h2>\n                ").concat(experienceHTML, "\n                <h2>Education</h2>\n                ").concat(educationHTML, "\n              </div>\n            </div>\n          </div>\n         <div class=\"styleBtn\">\n          <button id=\"editBtn\">Edit Resume</button>\n          <button id=\"saveChanges\" >Save Changes</button>\n         </div>\n        ");
    var resumeData = {
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phone.value,
        email: email.value,
        profession: profession.value,
        city: city.value,
        country: country.value,
        about: about.value,
        companies: Array.from(companies).map(function (input) { return input.value; }),
        positions: Array.from(positions).map(function (input) { return input.value; }),
        startDates: Array.from(startDates).map(function (input) { return input.value; }),
        endDates: Array.from(endDates).map(function (input) { return input.value; }),
        descriptions: Array.from(descriptions).map(function (input) { return input.value; }),
        degrees: Array.from(degrees).map(function (input) { return input.value; }),
        years: Array.from(years).map(function (input) { return input.value; }),
        schools: Array.from(schools).map(function (input) { return input.value; }),
        fields: Array.from(fields).map(function (input) { return input.value; }),
        skills: skills,
        imageUrl: imageUrl
    };
    console.log(resumeData);
    localStorage.setItem(username, JSON.stringify(resumeData));
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    shareLink.href = shareableURL;
    shareableLinkContainer.style.display = 'block';
    shareLink.textContent = shareableURL;
    if (resumeDisplay) {
        resumeDisplay.innerHTML = resumeHTML;
    }
    var editBtn = document.getElementById('editBtn');
    var saveBtn = document.getElementById('saveChanges');
    var editableSections = document.querySelectorAll('.editable-section');
    editBtn.addEventListener('click', function () {
        editableSections.forEach(function (section) {
            section.contentEditable = 'true';
        });
        editBtn.style.display = 'block';
        saveBtn.style.display = 'inline';
        alert('You can now make changes to your resume.');
    });
    saveBtn.addEventListener('click', function () {
        editableSections.forEach(function (section) {
            section.contentEditable = 'false';
        });
        saveBtn.style.display = 'none';
        editBtn.style.display = 'none';
        downloadPDF.style.display = 'block';
        alert('Changes Saved!');
    });
});
//     }
// });
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var userName = urlParams.get('username');
    if (userName) {
        coverPage.style.display = 'none';
        resumeForm.style.display = 'none';
        mainHeading.style.display = 'none';
        var savedResumeData = localStorage.getItem(userName);
        console.log('no data', savedResumeData);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            console.log('saved data', userName, resumeData);
            var companies = document.querySelectorAll('[name="company[]"]');
            var positions = document.querySelectorAll('[name="position[]"]');
            var descriptions = document.querySelectorAll('[name="experienceDescription[]"]');
            var startDates = document.querySelectorAll('[name="startDate[]"]');
            var endDates = document.querySelectorAll('[name="endDate[]"]');
            var experienceHTML = '';
            for (var i = 0; i < companies.length; i++) {
                experienceHTML += "\n      <div class=\"experience-item editable-section\">\n          <p><strong>Company:</strong> ".concat(companies[i].value, "</p>\n          <p><strong>Position:</strong> ").concat(positions[i].value, "</p>\n          <p><strong>From:</strong> ").concat(startDates[i].value, " <strong>to:</strong> ").concat(endDates[i].value || 'Present', "</p>\n          <p><strong>Description:</strong> ").concat(descriptions[i].value, "</p>\n      </div>\n      <hr/>\n    ");
            }
            var schools = document.querySelectorAll('[name="school[]"]');
            var degrees = document.querySelectorAll('[name="degree[]"]');
            var fields = document.querySelectorAll('[name="field[]"]');
            var years = document.querySelectorAll('[name="year[]"]');
            var educationHTML = '';
            for (var i = 0; i < schools.length; i++) {
                educationHTML += "\n      <div class=\"education-item editable-section\">\n          <p><strong>School/College:</strong> ".concat(schools[i].value, "</p>\n          <p><strong>Qualification:</strong> ").concat(degrees[i].value, "</p>\n          <p><strong>Field Of Study:</strong> ").concat(fields[i].value, "</p>\n          <p><strong>Academic Year:</strong> ").concat(years[i].value, "</p>\n      </div>\n      <hr/>\n            ");
            }
            var resumeHTML = "\n          <div class=\"card\">\n            <div class=\"left-side\">\n              <div class=\"personalInfo editable-section\">\n                <img src=\"".concat(resumeData.imageUrl, "\" style=\"width: 200px; height: 200px;\" id=\"profileImage\" />\n                <h1><strong>").concat(resumeData.firstName, " ").concat(resumeData.lastName, "</strong></h1>\n                <h4>").concat(resumeData.professions, "</h4>\n                <div class=\"contactSection\">\n                  <h2>Contact</h2>\n                  <p><strong>Phone:</strong> ").concat(resumeData.phone, "</p>\n                  <p><strong>Email:</strong> ").concat(resumeData.email, "</p>\n                  <p><strong>Address:</strong> ").concat(resumeData.city, ", ").concat(resumeData.countries, "</p>\n                </div>\n                <div class=\"skills-container\">\n                  <h2>Skills</h2>\n                  <ul class=\"skills-list\">").concat(resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n                </div>\n              </div>\n            </div>\n            <div class=\"secondSection\">\n              <div class=\"about editable-section\"> \n                <h3>About Me</h3>\n                <p>").concat(resumeData.about, "</p>\n                <hr/>\n              </div>\n              <div class=\"experienceAndEducationDisplay editable-section\">\n                <h2>Work Experience</h2>\n                ").concat(experienceHTML, "\n                <h2>Education</h2>\n                ").concat(educationHTML, "\n              </div>\n            </div>\n          </div>\n         <div class=\"styleBtn\">\n          <button id=\"editBtn\">Edit Resume</button>\n          <button id=\"saveChanges\" >Save Changes</button>\n         </div>\n        ");
            resumeDisplay.innerHTML = resumeHTML;
        }
    }
});
var nextStep = 0;
experienceForm.style.display = 'none';
educationForm.style.display = 'none';
skillsForm.style.display = 'none';
generateButton.style.display = 'none';
nextStepBtn.addEventListener('click', function () {
    nextStep++;
    experienceForm.style.display = 'none';
    educationForm.style.display = 'none';
    skillsForm.style.display = 'none';
    resumeDisplay.style.display = 'none';
    switch (nextStep) {
        case 1:
            experienceForm.style.display = 'block';
            break;
        case 2:
            educationForm.style.display = 'block';
            experienceForm.style.display = 'block';
            break;
        case 3:
            skillsForm.style.display = 'block';
            educationForm.style.display = 'block';
            nextStepBtn.style.display = 'none';
            generateButton.style.display = 'block';
            break;
    }
    var progressPercentage = (nextStep / 4) * 100;
    progress.style.width = "".concat(progressPercentage, "%");
    shareHeading.style.display = 'flex';
    shareLink.style.display = 'block';
    downloadPDF.style.display = 'block';
});
generateButton.addEventListener('click', function () {
    formPage.style.display = 'none';
    resumeDisplay.style.display = 'block';
    var inputs = resumeForm.querySelectorAll('input');
    inputs.forEach(function (input) {
        input.disabled = true;
    });
    nextStep++;
    if (nextStep === 4) {
        generateButton.dispatchEvent(new Event('submit'));
    }
});
// download PDF
downloadPDF.addEventListener('click', function () {
    if (resumeDisplay && resumeDisplay.innerHTML) {
        // Add PDF-specific styling
        resumeDisplay.classList.add('pdf-style');
        var opt = {
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 100 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        // Generate PDF
        html2pdf().from(resumeDisplay).set(opt).save().then(function () {
            resumeDisplay.classList.remove('pdf-style');
        });
        resumeDisplay.style.width = '800px';
    }
});
// const skillbtn = document.getElementById("addmoreSkills") as HTMLButtonElement;
// const SkillsList = document.querySelector(".skills-list") as HTMLDivElement;
// const ResumeForm = document.getElementById('resumeForm') as HTMLFormElement;
// const ResumeDisplay = document.getElementById('resumeDisplay') as HTMLDivElement;
// const shareableLinkContainer = document.getElementById('shareContainer') as HTMLDivElement;
// const shareLink = document.getElementById('shareLink') as HTMLAnchorElement;
// const downloadPDF = document.getElementById('downloadPDF') as HTMLButtonElement;
// const mainHeading = document.getElementById('mainHeading') as HTMLHeadingElement;
// const shareHeading = document.getElementById('shareHeading') as HTMLHeadingElement;
// skillbtn.onclick = function () {
//     const newField = document.createElement('input') as HTMLInputElement;
//     newField.setAttribute('type', 'text');
//     newField.setAttribute('name', 'skills-list[]');
//     SkillsList.appendChild(newField);
// };
// let ImageUrl:string = '';
// const ProfileImage = document.getElementById('img') as HTMLInputElement;
// const ImagePreview = document.getElementById('image') as HTMLImageElement
// ProfileImage.addEventListener('change',() =>{
// const PImage = ProfileImage.files?.[0];
// if(PImage){
//   const reader = new FileReader();
//   reader.onloadend = () => {
//     ImageUrl = reader.result as string
//   }
//   reader.readAsDataURL(PImage)
// }
// })
// ResumeForm.addEventListener('submit', (event: Event) => {
//     event.preventDefault();
//     const username = (document.getElementById('userName') as HTMLInputElement).value.trim();
//     const name = (document.getElementById('name') as HTMLInputElement).value;
//     const email = (document.getElementById('email') as HTMLInputElement).value;
//     const contact = (document.getElementById('contact') as HTMLInputElement).value;
//     const about = (document.getElementById('about') as HTMLTextAreaElement).value;
//     const degree = (document.getElementById('degree') as HTMLInputElement).value;
//     const academicYear = (document.getElementById('academicYear') as HTMLInputElement).value;
//     const school = (document.getElementById('school') as HTMLInputElement).value
//     const company = (document.getElementById('company') as HTMLInputElement).value;
//     const position = (document.getElementById('position') as HTMLInputElement).value;
//     const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
//     const endDate = (document.getElementById('endDate') as HTMLInputElement).value
//     const description = (document.getElementById('experienceDescription') as HTMLTextAreaElement).value.trim();
//     const skillInputs = document.querySelectorAll('.skills-list input') as NodeListOf<HTMLInputElement>;
//     const skills = Array.from(skillInputs).map(skillInput => skillInput.value.trim()).filter(skill => skill !== '');
//     const resumeHTML = `
//         <div class="card">
//           <div class="personalInfo">
//             <img src="${ImageUrl}" alt="Profile Image" height="200px" width="200px" id="image"/>
//             <h2>Personal Information</h2>
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Contact:</strong> ${contact}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <div class="about">
//               <h3>About</h3>
//               <p>${about}</p>
//             </div>
//           </div> 
//           <div class="secondSection">
//             <div class="experienceDisplay">
//               <h2>Work Experience</h2>
//               <p><strong>Company:</strong> ${company}</p>
//               <p><strong>Position:</strong> ${position}</p>
//               <p><strong>From:</strong> ${startDate}</p>
//               <p><strong>To:</strong> ${endDate}</p>
//               <p><strong>Description:</strong> ${description}</p>
//             </div>
//             <section class="skills-container">
//               <h2>Skills</h2>
//               <ul class="skills-list">
//                 ${skills.map(skill => `<li>${skill}</li>`).join('')}  
//               </ul>
//             </section>
//             <h2>Education</h2>
//             <p><strong>Degree:</strong> ${degree}</p>
//             <p><strong>Year:</strong> ${academicYear}</p>
//             <p><strong>School/College:</strong> ${school}</p>
//           </div>
//         </div>
//     `;  
//     const resumeData = {
//       name,
//       email,
//       contact,
//       about,
//       company,
//       position,
//       startDate,
//       endDate,
//       description,
//       degree,
//       academicYear,
//       school,
//       skills,
//       ImageUrl 
//   };
//   localStorage.setItem(username, JSON.stringify(resumeData));
//     const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`
//     shareLink.href = shareableURL;
//     shareableLinkContainer.style.display = 'block';
//     shareLink.textContent = shareableURL;
//     if (ResumeDisplay) {
//       ResumeDisplay.innerHTML = resumeHTML;
//   }
// });
// window.addEventListener('DOMContentLoaded', () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const username = urlParams.get('username');
//     if (username) {
//         ResumeForm.style.display = 'none';
//         mainHeading.style.display = 'none';
//         const savedResumeData = localStorage.getItem(username);
//         if (savedResumeData) {
//             const resumeData = JSON.parse(savedResumeData);
//             const resumeHTML = `
//                 <div class="card">
//                   <div class="personalInfo">
//                     <img src="${resumeData.ImageUrl}" alt="Profile Image" height="200px" width="200px" id="image"/>
//                     <h2>Personal Information</h2>
//                     <p><strong>Name:</strong> ${resumeData.name}</p>
//                     <p><strong>Contact:</strong> ${resumeData.contact}</p>
//                     <p><strong>Email:</strong> ${resumeData.email}</p>
//                     <div class="about">
//                       <h3>About</h3>
//                       <p>${resumeData.about}</p>
//                     </div>
//                   </div>
//                   <div class="secondSection">
//                     <div class="experienceDisplay">
//                       <h2>Work Experience</h2>
//                       <p><strong>Company:</strong> ${resumeData.company}</p>
//                       <p><strong>Position:</strong> ${resumeData.position}</p>
//                       <p><strong>From:</strong> ${resumeData.startDate}</p>
//                       <p><strong>To:</strong> ${resumeData.endDate}</p>
//                       <p><strong>Description:</strong> ${resumeData.description}</p>
//                     </div>
//                     <section class="skills-container">
//                       <h2>Skills</h2>
//                       <ul class="skills-list">
//                         ${resumeData.skills.map((skill: string) => `<li>${skill}</li>`).join('')}  
//                       </ul>
//                     </section>
//                     <h2>Education</h2>
//                     <p><strong>Degree:</strong> ${resumeData.degree}</p>
//                     <p><strong>Year:</strong> ${resumeData.academicYear}</p>
//                     <p><strong>School/College:</strong> ${resumeData.school}</p>
//                   </div>
//                 </div>
//             `;
//             ResumeDisplay.innerHTML = resumeHTML;
//         }
//     }
// });
// const GenerateButton = document.getElementById('generateButton') as HTMLButtonElement;
// const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
// let generated = false;
// GenerateButton.addEventListener('click', function () {
//     if (!generated) {
//         GenerateButton.textContent = "Edit Resume";
//         saveButton.style.display = 'inline-block';
//         generated = true;
//         shareHeading.style.display = 'flex';
//         shareLink.style.display = 'block';
//     }
// });
// saveButton.addEventListener('click', function () {
//     ResumeForm.style.display = 'none';
//     mainHeading.style.display = 'none';
//     downloadPDF.style.display = 'block';
//     alert('Resume Saved Successfully');
// });
// // download PDF
// downloadPDF.addEventListener('click', function () {
//     if (ResumeDisplay && ResumeDisplay.innerHTML) {
//         const opt = {
//             filename: 'resume.pdf',
//             image: { type: 'jpeg', quality: 0.98 },
//             jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//         };
//         html2pdf().from(ResumeDisplay).set(opt).save();
//     }
// });
