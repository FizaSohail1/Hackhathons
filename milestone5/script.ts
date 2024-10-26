let html2pdf: any;

const coverPage = document.getElementById('cover-page') as HTMLElement;
const  formPage = document.getElementById('form-page') as HTMLElement;
const startButton = document.getElementById('start-button') as HTMLButtonElement;
const addSkillbtn = document.getElementById("addmoreSkills") as HTMLButtonElement;
const skillsList = document.querySelector('.skills-list');
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplay = document.getElementById('resumeDisplay') as HTMLDivElement;
 const nextStepBtn = document.getElementById('nextBtn') as HTMLButtonElement;
 const personalInfoForm = document.getElementById('personalInfoForm') as HTMLDivElement
const experienceForm = document.getElementById('experienceForm') as HTMLDivElement;
const educationForm = document.getElementById('educationForm') as HTMLDivElement;
const skillsForm = document.getElementById('skillsForm') as HTMLDivElement;
const progress = document.getElementById('progress') as HTMLDivElement

const generateButton = document.getElementById('generateButton') as HTMLButtonElement;

const shareableLinkContainer = document.getElementById('shareContainer') as HTMLDivElement;
const shareLink = document.getElementById('shareLink') as HTMLAnchorElement;
const downloadPDF = document.getElementById('downloadPDF') as HTMLButtonElement;
const mainHeading = document.getElementById('mainHeading') as HTMLHeadingElement;
const shareHeading = document.getElementById('shareHeading') as HTMLHeadingElement;

startButton.addEventListener('click', () => {
  coverPage.style.display = 'none';
  formPage.style.display = 'block';
});

const addMoreExperienceBtn = document.getElementById('addMoreExperience') as HTMLButtonElement;
const experienceFieldsContainer = document.getElementById('experienceFields') as HTMLDivElement;
const addMoreEducationBtn = document.getElementById('addMoreEducation') as HTMLButtonElement;
const educationFieldContainer = document.getElementById('educationFields') as HTMLDivElement;

addMoreExperienceBtn.addEventListener('click', () => {
    const experienceTemplate = document.createElement('div');
    experienceTemplate.className = 'experience-section';
    experienceTemplate.innerHTML = `
        <div class="form-section">
            <div class="form-group">
                <label for="company">Employer</label>
                <input type="text" name="company[]" placeholder="Ex: Microsoft" required />
            </div>
            <div class="form-group">
                <label for="position">Job Title</label>
                <input type="text" name="position[]" placeholder="Ex: Full Stack Developer" required />
            </div>
        </div>
        <div class="form-section">
            <div class="form-group">
                <label for="experienceDescription">Job Description</label>
                <textarea name="experienceDescription[]" rows="5" required></textarea>
            </div>
        </div>
        <div class="form-section">
            <div class="form-group">
                <label for="startDate">Start Date</label>
                <input type="date" name="startDate[]" required />
            </div>
            <div class="form-group">
                <label for="endDate">End Date</label>
                <input type="date" name="endDate[]" />
            </div>
        </div>
    `;
    experienceFieldsContainer.appendChild(experienceTemplate);
});

addMoreEducationBtn.addEventListener('click', () => {
  const educationTemplate = document.createElement('div');
  educationTemplate.className = 'education-section';
  educationTemplate.innerHTML = `
      <div class="form-section">
          <div class="form-group">
              <label for="school">School/College</label>
              <input type="text" name="school[]" required />
          </div>
          <div class="form-group">
              <label for="degree">Qualification</label>
              <input type="text" name="degree[]" placeholder="Ex: Bacheolars" required />
          </div>
      </div>
      <div class="form-section">
          <div class="form-group">
              <label for="field">Field Of Study</label>
              <input type="text" name="field[]" placeholder="Ex: Computer Science" required />
          </div>
          <div class="form-group">
              <label for="year">Academic Year</label>
              <input type="number" name="year[]" />
          </div>
      </div>
  `;
  educationFieldContainer.appendChild(educationTemplate);
});

 addSkillbtn.addEventListener('click' , () => {
     const newField = document.createElement('input') as HTMLInputElement;
     newField.type = 'text';
     newField.setAttribute('name', 'skills-list[]');
     newField.className = 'skills-input';
    skillsList.appendChild(newField);  
 });

const imgField = document.getElementById('imgField') as HTMLInputElement;
let imageUrl: string = '';

imgField.addEventListener('change', () => {
  if (imgField.files && imgField.files[0]) {
    const file = imgField.files[0];
  
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // Store the image data URL in the imageUrl variable
        imageUrl = e.target?.result as string;
        console.log(imageUrl)
      };

      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  }
});

resumeForm.addEventListener('submit', function (event) {
     event.preventDefault(); // Prevents page reload
         
        const username = (document.getElementById('userName') as HTMLInputElement).value.trim();
        const firstName = document.getElementById('firstname') as HTMLInputElement;
        const lastName = document.getElementById('lastname') as HTMLInputElement;
        const profession = document.getElementById('profession') as HTMLInputElement;
        const city = document.getElementById('city') as HTMLInputElement;
        const country = document.getElementById('country') as HTMLInputElement;
        const phone = document.getElementById('phone') as HTMLInputElement;
        const email = document.getElementById('email') as HTMLInputElement;
        const about = document.getElementById('about') as HTMLTextAreaElement;
  
        const skillInputs = document.querySelectorAll('.skills-list input') as NodeListOf<HTMLInputElement>;
        const skills = Array.from(skillInputs).map(skillInput => skillInput.value).filter(skill => skill.trim() !== '');
  
        const companies = document.querySelectorAll('[name="company[]"]') as NodeListOf<HTMLInputElement>;
        const positions = document.querySelectorAll('[name="position[]"]') as NodeListOf<HTMLInputElement>;
        const descriptions = document.querySelectorAll('[name="experienceDescription[]"]') as NodeListOf<HTMLTextAreaElement>;
        const startDates = document.querySelectorAll('[name="startDate[]"]') as NodeListOf<HTMLInputElement>;
        const endDates = document.querySelectorAll('[name="endDate[]"]') as NodeListOf<HTMLInputElement>;
  
        let experienceHTML = '';
        for (let i = 0; i < companies.length; i++) {
          experienceHTML += `
            <div class="experience-item editable-section">
                <p><strong>Company:</strong> ${companies[i].value}</p>
                <p><strong>Position:</strong> ${positions[i].value}</p>
                <p><strong>From:</strong> ${startDates[i].value} <strong>to:</strong> ${endDates[i].value || 'Present'}</p>
                <p><strong>Description:</strong> ${descriptions[i].value}</p>
            </div>
            <hr/>
          `;
        }
        const schools = document.querySelectorAll('[name="school[]"]') as NodeListOf<HTMLInputElement>;
        const degrees = document.querySelectorAll('[name="degree[]"]') as NodeListOf<HTMLInputElement>;
        const fields = document.querySelectorAll('[name="field[]"]') as NodeListOf<HTMLInputElement>;
        const years = document.querySelectorAll('[name="year[]"]') as NodeListOf<HTMLInputElement>;
  
        let educationHTML = '';
        for (let i = 0; i < schools.length; i++) {
          educationHTML += `
            <div class="education-item editable-section">
                <p><strong>School/College:</strong> ${schools[i].value}</p>
                <p><strong>Qualification:</strong> ${degrees[i].value}</p>
                <p><strong>Field Of Study:</strong> ${fields[i].value}</p>
                <p><strong>Academic Year:</strong> ${years[i].value}</p>
            </div>
            <hr/>
          `;
        }
  
        // Generating Resume HTML
        const resumeHTML = `
          <div class="card">
            <div class="left-side">
              <div class="personalInfo editable-section">
                <img src="${imageUrl}" style="width: 200px; height: 200px;" id="profileImage" />
                <h1><strong>${firstName.value} ${lastName.value}</strong></h1>
                <h4>${profession.value}</h4>
                <div class="contactSection">
                  <h2>Contact</h2>
                  <p><strong>Phone:</strong> ${phone.value}</p>
                  <p><strong>Email:</strong> ${email.value}</p>
                  <p><strong>Address:</strong> ${city.value}, ${country.value}</p>
                </div>
                <div class="skills-container">
                  <h2>Skills</h2>
                  <ul class="skills-list">${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
                </div>
              </div>
            </div>
            <div class="secondSection">
              <div class="about editable-section">
                <h3>About Me</h3>
                <p>${about.value}</p>
                <hr/>
              </div>
              <div class="experienceAndEducationDisplay editable-section">
                <h2>Work Experience</h2>
                ${experienceHTML}
                <h2>Education</h2>
                ${educationHTML}
              </div>
            </div>
          </div>
         <div class="styleBtn">
          <button id="editBtn">Edit Resume</button>
          <button id="saveChanges" >Save Changes</button>
         </div>
        `;

        const resumeData = {
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value,
          email: email.value,
          profession: profession.value,
          city: city.value,
          country: country.value,
          about: about.value,
          companies: Array.from(companies).map(input => input.value),
          positions: Array.from(positions).map(input => input.value),
          startDates: Array.from(startDates).map(input => input.value),
          endDates: Array.from(endDates).map(input => input.value),
          descriptions: Array.from(descriptions).map(input => input.value),
          degrees: Array.from(degrees).map(input => input.value),
          years: Array.from(years).map(input => input.value),
          schools: Array.from(schools).map(input => input.value),
          fields: Array.from(fields).map(input => input.value),
          skills,
          imageUrl
        };
         localStorage.setItem(username, JSON.stringify(resumeData));

         const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`
         shareLink.href = shareableURL;
         shareableLinkContainer.style.display = 'block';
         shareLink.textContent = shareableURL;
     
         if (resumeDisplay) {
           resumeDisplay.innerHTML = resumeHTML;
       }
  
           const editBtn = document.getElementById('editBtn') as HTMLButtonElement;
  const saveBtn = document.getElementById('saveChanges') as HTMLButtonElement;
  const editableSections = document.querySelectorAll('.editable-section') as NodeListOf<HTMLDivElement>;

  editBtn.addEventListener('click', () => {
    editableSections.forEach(section => {
      section.contentEditable = 'true';
    });
    editBtn.style.display = 'block'; 
    saveBtn.style.display = 'inline'; 
    alert('You can now make changes to your resume.');
  });

  saveBtn.addEventListener('click', () => {
    editableSections.forEach(section => {
      section.contentEditable = 'false';
    });
    saveBtn.style.display = 'none'; 
    editBtn.style.display = 'none'; 
    downloadPDF.style.display = 'block';
    alert('Changes Saved!');
    });
  
});

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('username');

  if (userName) {
    coverPage.style.display = 'none'
      resumeForm.style.display = 'none';
      mainHeading.style.display = 'none';

      const savedResumeData = localStorage.getItem(userName);
      
      if (savedResumeData) {
          const resumeData = JSON.parse(savedResumeData);
          
          const companies = document.querySelectorAll('[name="company[]"]') as NodeListOf<HTMLInputElement>;
          const positions = document.querySelectorAll('[name="position[]"]') as NodeListOf<HTMLInputElement>;
          const descriptions = document.querySelectorAll('[name="experienceDescription[]"]') as NodeListOf<HTMLTextAreaElement>;
         const startDates = document.querySelectorAll('[name="startDate[]"]') as NodeListOf<HTMLInputElement>;
         const endDates = document.querySelectorAll('[name="endDate[]"]') as NodeListOf<HTMLInputElement>;

        let experienceHTML = '';
        for (let i = 0; i < companies.length; i++) {
    experienceHTML += `
      <div class="experience-item editable-section">
          <p><strong>Company:</strong> ${companies[i].value}</p>
          <p><strong>Position:</strong> ${positions[i].value}</p>
          <p><strong>From:</strong> ${startDates[i].value} <strong>to:</strong> ${endDates[i].value || 'Present'}</p>
          <p><strong>Description:</strong> ${descriptions[i].value}</p>
      </div>
      <hr/>
    `;
  }      
  const schools = document.querySelectorAll('[name="school[]"]') as NodeListOf<HTMLInputElement>;
  const degrees = document.querySelectorAll('[name="degree[]"]') as NodeListOf<HTMLInputElement>;
  const fields = document.querySelectorAll('[name="field[]"]') as NodeListOf<HTMLInputElement>;
  const years = document.querySelectorAll('[name="year[]"]') as NodeListOf<HTMLInputElement>;

  let educationHTML = '';
  for (let i = 0; i < schools.length; i++) {
    educationHTML += `
      <div class="education-item editable-section">
          <p><strong>School/College:</strong> ${schools[i].value}</p>
          <p><strong>Qualification:</strong> ${degrees[i].value}</p>
          <p><strong>Field Of Study:</strong> ${fields[i].value}</p>
          <p><strong>Academic Year:</strong> ${years[i].value}</p>
      </div>
      <hr/>
            `;
       }
          const resumeHTML = `
          <div class="card">
            <div class="left-side">
              <div class="personalInfo editable-section">
                <img src="${resumeData.imageUrl}" style="width: 200px; height: 200px;" id="profileImage" />
                <h1><strong>${resumeData.firstName} ${resumeData.lastName}</strong></h1>
                <h4>${resumeData.professions}</h4>
                <div class="contactSection">
                  <h2>Contact</h2>
                  <p><strong>Phone:</strong> ${resumeData.phone}</p>
                  <p><strong>Email:</strong> ${resumeData.email}</p>
                  <p><strong>Address:</strong> ${resumeData.city}, ${resumeData.countries}</p>
                </div>
                <div class="skills-container">
                  <h2>Skills</h2>
                  <ul class="skills-list">${resumeData.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
                </div>
              </div>
            </div>
            <div class="secondSection">
              <div class="about editable-section"> 
                <h3>About Me</h3>
                <p>${resumeData.about}</p>
                <hr/>
              </div>
              <div class="experienceAndEducationDisplay editable-section">
                <h2>Work Experience</h2>
                ${experienceHTML}
                <h2>Education</h2>
                ${educationHTML}
              </div>
            </div>
          </div>
         <div class="styleBtn">
          <button id="editBtn">Edit Resume</button>
          <button id="saveChanges" >Save Changes</button>
         </div>
        `;

          resumeDisplay.innerHTML = resumeHTML;
      }
  }
});
  
let nextStep = 0;
experienceForm.style.display = 'none';
educationForm.style.display = 'none';
skillsForm.style.display = 'none';
generateButton.style.display = 'none'
resumeDisplay.style.display = 'block'

nextStepBtn.addEventListener('click', () => {

  let requiredFieldsFill = true;

  let requiredFields: HTMLInputElement[] = [];

  if(nextStep === 0){
    requiredFields = Array.from(personalInfoForm.querySelectorAll('[required]')) as HTMLInputElement[];
  }
  else if(nextStep === 1 ){
    requiredFields = Array.from(experienceForm.querySelectorAll('[required]')) as HTMLInputElement[];
  }
  else if(nextStep === 2){
    requiredFields = Array.from(educationForm.querySelectorAll('[required]')) as HTMLInputElement[];
  }
  else if(nextStep === 3){
    requiredFields = Array.from(skillsForm.querySelectorAll('[required]')) as HTMLInputElement[];
  }
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      requiredFieldsFill = false;

    } 
  });

  if (requiredFieldsFill) {
    nextStep++;
    experienceForm.style.display = 'none';
    educationForm.style.display = 'none';
    skillsForm.style.display = 'none';
    resumeDisplay.style.display = 'none';

    switch (nextStep) {
      case 1:
        personalInfoForm.style.display = 'none'
        experienceForm.style.display = 'block';
        break;
      case 2:
        experienceForm.style.display = 'none';
        educationForm.style.display = 'block';
        break;
      case 3:
        experienceForm.style.display = 'none';
        skillsForm.style.display = 'block';
        educationForm.style.display = 'none';
        nextStepBtn.style.display = 'none';
        generateButton.style.display = 'block';
        break;
    }

    // progress bar
    const progressPercentage = (nextStep / 4) * 100;
    progress.style.width = `${progressPercentage}%`;
  } else {
    alert('Please fill in all required fields.');
  }
});


generateButton.addEventListener('click' , () => {

  formPage.style.display = 'none';   
       resumeDisplay.style.display = 'block';

       const inputs = resumeForm.querySelectorAll('input');
       inputs.forEach(input => {
           input.disabled = true;  
       });

       shareHeading.style.display = 'block'
       downloadPDF.style.display = 'block'
 })

// download PDF
downloadPDF.addEventListener('click', function () {
  if (resumeDisplay && resumeDisplay.innerHTML) {
      resumeDisplay.classList.add('pdf-style');

      const opt = {
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 100 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Generate PDF
      html2pdf().from(resumeDisplay).set(opt).save().then(function () {
          resumeDisplay.classList.remove('pdf-style');
      });
      resumeDisplay.style.width='800px'
  }
});
