const addskillbtn = document.getElementById("addmoreSkills") as HTMLButtonElement;
const SkillsList = document.querySelector(".skills-list") as HTMLDivElement;
const ResumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const ResumeDisplay = document.getElementById('resumeDisplay') as HTMLDivElement;

let ImageUrl: string = '';

addskillbtn.onclick = function () {
    const newField = document.createElement('input') as HTMLInputElement;
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'skills-list[]');
    newField.setAttribute('placeholder', '');
    SkillsList.appendChild(newField);
};

const ProfileImage = document.getElementById('img') as HTMLInputElement;
const ImagePreview = document.getElementById('imagePreview') as HTMLImageElement;
ProfileImage.addEventListener('change', () => {
    const file = ProfileImage.files?.[0];
    if (file) {
        ImageUrl = URL.createObjectURL(file);
        ImagePreview.src = ImageUrl;
    }
});

ResumeForm.addEventListener('submit', (event: Event) => {
    event.preventDefault(); 

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const about = (document.getElementById('about') as HTMLTextAreaElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const acadamicYear = (document.getElementById('academicYear') as HTMLInputElement).value;
    const school = (document.getElementById('school') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const position = (document.getElementById('position') as HTMLInputElement).value;
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
    const description = (document.getElementById('experienceDescription') as HTMLTextAreaElement).value;
    const skillInputs = document.querySelectorAll('.skills-list input') as NodeListOf<HTMLInputElement>;
    const skills = Array.from(skillInputs).map(skillInput => skillInput.value).filter(skill => skill.trim() !== '');

    const resumeHTML = `
        <div class="card">
          <div class="personalInfo">
           <img src="${ImageUrl}" alt="Profile Image" height="250px" width="250px" id="image" contenteditable="true"/>
           <h2>Personal Information</h2>
            <p><strong>Name:</strong><span contenteditable="true"> ${name}</span></p>
            <p><strong>Contact:</strong><span contenteditable="true"> ${contact}</span></p>
            <p><strong>Email:</strong><span contenteditable="true"> ${email}</span></p>
            <div class="about">
            <h3>About</h3>
            <p contenteditable = "true">${about}</P>
          </div>
          </div> 
            <div class="secondSection">
                 <div class="experienceDisplay">
                    <h2> Work Experience</h2>
                    <p><strong>Company:</strong><span contenteditable="true"> ${company}</span></p>
                    <p><strong>Position:</strong><span contenteditable="true"> ${position}</span></p>
                    <p><strong>From:</strong><span contenteditable="true"> ${startDate}</span></p>
                    <p><strong>To:</strong><span contenteditable="true"> ${endDate}</span></p>
                    <p><strong>Description:</strong><span contenteditable="true"> ${description}</span></p>
                    <section class="skills-container">
                      <h2>Skills</h2>   
                     <div class="skills-list">
                      ${skills.map(skill => `<li>${skill}</li>`).join('')}  
                     </div>
                    </section>  
                    
                    <h2>Education</h2>
                    <p"><strong>Degree:</strong><span contenteditable="true"> ${degree}</span></p>
                    <p><strong>Year:</strong><span contenteditable="true"> ${acadamicYear}</span></p>
                    <p><strong>School/College:</strong><span contenteditable="true"> ${school}</span></p>
                 </div>
            </div> 
        </div> 
    `;

    // Display the resume
    if (ResumeDisplay) {
        ResumeDisplay.innerHTML = resumeHTML;
    }
});

const GenerateButton = document.getElementById('generateButton') as HTMLButtonElement;
const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
let generated = false
GenerateButton.addEventListener('click', function() {
    if (!generated) {
        GenerateButton.textContent = "Edit Resume";
        saveButton.style.display = 'inline-block';
        generated = true; 
    }

});
saveButton.addEventListener('click',function() {

GenerateButton.style.display ='none';
 saveButton.style.display = 'none';
 ResumeForm.style.display = 'none';

 alert('Resume Saved Successfully')
});