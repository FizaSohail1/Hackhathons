const addSkillbtn = document.getElementById("addmoreSkills") as HTMLButtonElement;
const skillsList = document.querySelector(".skills-list") as HTMLDivElement;
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplay = document.getElementById('resumeDisplay') as HTMLDivElement;

let imageUrl: string = '';

addSkillbtn.onclick = function () {
    const newField = document.createElement('input') as HTMLInputElement;
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'skills-list[]');
    newField.setAttribute('placeholder', '');
    skillsList.appendChild(newField);
};

const profileImage = document.getElementById('img') as HTMLInputElement;
const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;
profileImage.addEventListener('change', () => {
    const file = profileImage.files?.[0];
    if (file) {
        imageUrl = URL.createObjectURL(file);
        imagePreview.src = imageUrl;
    }
});

resumeForm.addEventListener('submit', (event: Event) => {
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
        <h1>Resume</h1>
        <div class="card">
          <div class="personalInfo">
           <img src="${imageUrl}" alt="Profile Image" height="250px" width="250px" id="image"/>
           <h2>Personal Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div class="about">
            <h3>About</h3>
            <p>${about}</P>
          </div>
          </div> 
            <div class="secondSection">
                 <div class="experienceDisplay">
                    <h2> Work Experience</h2>
                    <p><strong>Company:</strong> ${company}</p>
                    <p><strong>Position:</strong> ${position}</p>
                    <p><strong>From:</strong> ${startDate}</p>
                    <p><strong>To:</strong> ${endDate}</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <section class="skills-container">
                      <h2>Skills</h2>   
                     <div class="skills-list">
                      ${skills.map(skill => `<li>${skill}</li>`).join('')}  
                     </div>
                    </section>  
                    
                    <h2>Education</h2>
                    <p><strong>Degree:</strong> ${degree}</p>
                    <p><strong>Year:</strong> ${acadamicYear}</p>
                    <p><strong>School/College:</strong> ${school}</p>
                 </div>
            </div> 
        </div> 
    `;

    // Display the resume
    if (resumeDisplay) {
        resumeDisplay.innerHTML = resumeHTML;
    }
});

const generateButton = document.getElementById('generateButton') as HTMLButtonElement;
generateButton.addEventListener('click', function() {
    // doing disable to all input filds in form
    const inputs = resumeForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.disabled = true;
    });
    generateButton.style.display = 'none';
});