let html2pdf: any;

const skillbtn = document.getElementById("addmoreSkills") as HTMLButtonElement;
const SkillsList = document.querySelector(".skills-list") as HTMLDivElement;
const ResumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const ResumeDisplay = document.getElementById('resumeDisplay') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareContainer') as HTMLDivElement;
const shareLink = document.getElementById('shareLink') as HTMLAnchorElement;
const downloadPDF = document.getElementById('downloadPDF') as HTMLButtonElement;
const mainHeading = document.getElementById('mainHeading') as HTMLHeadingElement;
const shareHeading = document.getElementById('shareHeading') as HTMLHeadingElement;

skillbtn.onclick = function () {
    const newField = document.createElement('input') as HTMLInputElement;
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'skills-list[]');
    SkillsList.appendChild(newField);
};


let ImageUrl:string = '';
const ProfileImage = document.getElementById('img') as HTMLInputElement;
const ImagePreview = document.getElementById('image') as HTMLImageElement

ProfileImage.addEventListener('change',() =>{
const PImage = ProfileImage.files?.[0];
if(PImage){
  const reader = new FileReader();
  reader.onloadend = () => {
    ImageUrl = reader.result as string
  }
  reader.readAsDataURL(PImage)
}
})
ResumeForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const username = (document.getElementById('userName') as HTMLInputElement).value.trim();
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const about = (document.getElementById('about') as HTMLTextAreaElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const academicYear = (document.getElementById('academicYear') as HTMLInputElement).value;
    const school = (document.getElementById('school') as HTMLInputElement).value
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const position = (document.getElementById('position') as HTMLInputElement).value;
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value
    const description = (document.getElementById('experienceDescription') as HTMLTextAreaElement).value.trim();
    const skillInputs = document.querySelectorAll('.skills-list input') as NodeListOf<HTMLInputElement>;
    const skills = Array.from(skillInputs).map(skillInput => skillInput.value.trim()).filter(skill => skill !== '');

    const resumeHTML = `
        <div class="card">
          <div class="personalInfo">
            <img src="${ImageUrl}" alt="Profile Image" height="200px" width="200px" id="image"/>
            <h2>Personal Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div class="about">
              <h3>About</h3>
              <p>${about}</p>
            </div>
          </div> 
          <div class="secondSection">
            <div class="experienceDisplay">
              <h2>Work Experience</h2>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Position:</strong> ${position}</p>
              <p><strong>From:</strong> ${startDate}</p>
              <p><strong>To:</strong> ${endDate}</p>
              <p><strong>Description:</strong> ${description}</p>
            </div>
            <section class="skills-container">
              <h2>Skills</h2>
              <ul class="skills-list">
                ${skills.map(skill => `<li>${skill}</li>`).join('')}  
              </ul>
            </section>
            <h2>Education</h2>
            <p><strong>Degree:</strong> ${degree}</p>
            <p><strong>Year:</strong> ${academicYear}</p>
            <p><strong>School/College:</strong> ${school}</p>
          </div>
        </div>
    `;  
    const resumeData = {
      name,
      email,
      contact,
      about,
      company,
      position,
      startDate,
      endDate,
      description,
      degree,
      academicYear,
      school,
      skills,
      ImageUrl 
  };
  localStorage.setItem(username, JSON.stringify(resumeData));

    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`
    shareLink.href = shareableURL;
    shareableLinkContainer.style.display = 'block';
    shareLink.textContent = shareableURL;

    if (ResumeDisplay) {
      ResumeDisplay.innerHTML = resumeHTML;
  }
});

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        ResumeForm.style.display = 'none';
        mainHeading.style.display = 'none';

        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);

            const resumeHTML = `
                <div class="card">
                  <div class="personalInfo">
                    <img src="${resumeData.ImageUrl}" alt="Profile Image" height="200px" width="200px" id="image"/>
                    <h2>Personal Information</h2>
                    <p><strong>Name:</strong> ${resumeData.name}</p>
                    <p><strong>Contact:</strong> ${resumeData.contact}</p>
                    <p><strong>Email:</strong> ${resumeData.email}</p>
                    <div class="about">
                      <h3>About</h3>
                      <p>${resumeData.about}</p>
                    </div>
                  </div>
                  <div class="secondSection">
                    <div class="experienceDisplay">
                      <h2>Work Experience</h2>
                      <p><strong>Company:</strong> ${resumeData.company}</p>
                      <p><strong>Position:</strong> ${resumeData.position}</p>
                      <p><strong>From:</strong> ${resumeData.startDate}</p>
                      <p><strong>To:</strong> ${resumeData.endDate}</p>
                      <p><strong>Description:</strong> ${resumeData.description}</p>
                    </div>
                    <section class="skills-container">
                      <h2>Skills</h2>
                      <ul class="skills-list">
                        ${resumeData.skills.map((skill: string) => `<li>${skill}</li>`).join('')}  
                      </ul>
                    </section>
                    <h2>Education</h2>
                    <p><strong>Degree:</strong> ${resumeData.degree}</p>
                    <p><strong>Year:</strong> ${resumeData.academicYear}</p>
                    <p><strong>School/College:</strong> ${resumeData.school}</p>
                  </div>
                </div>
            `;

            ResumeDisplay.innerHTML = resumeHTML;
        }
    }
});

const GenerateButton = document.getElementById('generateButton') as HTMLButtonElement;
const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
let generated = false;
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
        const opt = {
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(ResumeDisplay).set(opt).save();
    }
});
