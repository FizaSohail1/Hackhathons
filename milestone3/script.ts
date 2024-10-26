const coverPage = document.getElementById('cover-page') as HTMLElement;
const formPage = document.getElementById('form-page') as HTMLElement;
const startButton = document.getElementById('start-button') as HTMLButtonElement;
const addSkillbtn = document.getElementById("addmoreSkills") as HTMLButtonElement;
const skillsList = document.querySelector('.skills-list');
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplay = document.getElementById('resumeDisplay') as HTMLDivElement;
 const personalInfoForm = document.getElementById('personalInfoForm') as HTMLDivElement
const experienceForm = document.getElementById('experienceForm') as HTMLDivElement;
const educationForm = document.getElementById('educationForm') as HTMLDivElement;
const skillsForm = document.getElementById('skillsForm') as HTMLDivElement;
const progress = document.getElementById('progress') as HTMLDivElement
const nextStepBtn = document.getElementById('nextBtn') as HTMLButtonElement;
const generateButton = document.getElementById('generateButton') as HTMLButtonElement;



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
        <hr/>
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
      <hr/>
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

document.addEventListener('DOMContentLoaded', function() {
  if (resumeForm) {
      resumeForm.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevents page reload
          const firstName = document.getElementById('firstname') as HTMLInputElement;
            const lastName = document.getElementById('lastname') as HTMLInputElement;
            const profession = document.getElementById('profession') as HTMLInputElement;
            const city = document.getElementById('city') as HTMLInputElement;
            const country = document.getElementById('country') as HTMLInputElement;
            const phone = document.getElementById('phone') as HTMLInputElement;
            const email = document.getElementById('email') as HTMLInputElement;
            const about = document.getElementById('about') as HTMLTextAreaElement;
            const skillInputs = document.querySelectorAll('.skills-list input') as NodeListOf<HTMLInputElement>;
            const skills = Array.from(skillInputs).map(skillInput => skillInput.value).filter(skill => skill.trim() !== '')

          // experiences 
          const companies = document.querySelectorAll('[name="company[]"]') as NodeListOf<HTMLInputElement>;
          const positions = document.querySelectorAll('[name="position[]"]') as NodeListOf<HTMLInputElement>;
          const descriptions = document.querySelectorAll('[name="experienceDescription[]"]') as NodeListOf<HTMLTextAreaElement>;
          const startDates = document.querySelectorAll('[name="startDate[]"]') as NodeListOf<HTMLInputElement>;
          const endDates = document.querySelectorAll('[name="endDate[]"]') as NodeListOf<HTMLInputElement>;

          let experienceHTML = '';
          for (let i = 0; i < companies.length; i++) {
              experienceHTML += `
                  <div class="experience-item">
                      <p><strong>Company:</strong> ${companies[i].value}</p>
                      <p><strong>Position:</strong> ${positions[i].value}</p>
                      <p><strong>From:</strong> ${startDates[i].value} <strong>to:</strong> ${endDates[i].value || 'Present'}</p>
                      <p><strong>Description:</strong> ${descriptions[i].value}</p>
                  </div>
                  <hr/>
              `;
          }

           //education

           const schools = document.querySelectorAll('[name="school[]"]') as NodeListOf<HTMLInputElement>;
           const degrees = document.querySelectorAll('[name="degree[]"]') as NodeListOf<HTMLInputElement>;
           const fields = document.querySelectorAll('[name="field[]"]') as NodeListOf<HTMLInputElement>;
           const years = document.querySelectorAll('[name="year[]"]') as NodeListOf<HTMLInputElement>;
 
           let educationHTML = '';
           for (let i = 0; i < schools.length; i++) {
               educationHTML += `
                   <div class="education-item">
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
                      <div class="personalInfo">
                        <img src="${imageUrl}" style="width: 200px; height: 200px;" id="profileImage" />
                        <h1><strong> ${firstName.value} ${lastName.value} </strong></h1>
                       <h4>${profession.value}</h4>
                       <div class="contactSection">
                        <h2>Contact</h2>
                        <p><strong>Phone:</strong> ${phone.value}</p>
                        <p><strong>Email:</strong> ${email.value}</p>
                       <p><strong>Address:</strong> ${city.value}, ${country.value}</p>
                     </div>
                    <div class="skills-container">
                    <h2>Skills</h2>
                    <div class="skills-list"> ${skills.map(skill => `<li>${skill}</li>`).join('')}</div>
                   </div>
                  </div>
                </div>
                 <div class="secondSection">
        <div class="about">
          <h3>About Me</h3>
          <p>${about.value}</p>
          <hr/>
        </div>
         <div class="experienceAndEducationDisplay">
                          <h2>Work Experience</h2>
                          ${experienceHTML}  

                          <h2>Education</h2>
                        ${educationHTML}

                        </div>
                    </div>
                  </div>
          `;

          resumeDisplay.innerHTML = resumeHTML;
      });
  }
});


let nextStep = 0;
experienceForm.style.display = 'none';
educationForm.style.display = 'none';
skillsForm.style.display = 'none';
generateButton.style.display = 'none'

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


generateButton.addEventListener('click',() => {
formPage.style.display = 'none';   
       resumeDisplay.style.display = 'block';

       const inputs = resumeForm.querySelectorAll('input');
       inputs.forEach(input => {
           input.disabled = true;  
       });

})
