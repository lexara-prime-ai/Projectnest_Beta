"use strict";
/////////////////////////////////
// PROJECT FORM POP UP ANIMATION
////////////////////////////////
// ADD PROJECT BUTTONS
const addProjectBtn = document.getElementById('add-projects');
const profileAddBtn = document.getElementById('quick-add');
// ADD PROJECT FORM
const addProjectForm = document.querySelector('.add-project-form');
// EVENT LISTENERS
addProjectBtn.addEventListener('click', displayAddProjectForm);
profileAddBtn.addEventListener('click', displayAddProjectForm);
// DISPLAY FORM TO ADD PROJECT
function displayAddProjectForm(event) {
    event.preventDefault();
    // CHANGE ADD BUTTON TEXT TO ADD IF TEXT IS EQUAL TO UPDATE
    const addBtn = document.querySelector('.btn');
    if (addBtn.value == '^ Update') {
        addBtn.value = '+ Add';
    }
    addProjectForm.classList.toggle('active');
    addProjectBtn.classList.toggle('is-active');
}
/////////////////////////////////
// PROFILE CARD POP UP ANIMATION
/////////////////////////////////
// PROFILE ICON
const profileIcon = document.querySelector('.profile');
// PROFILE CARD
const profileCard = document.querySelector('.profile-card');
// EVENT LISTENER
profileIcon.addEventListener('click', displayProfileCard);
// DISPLAY PROFILE CARD
function displayProfileCard(event) {
    event.preventDefault();
    profileCard.classList.toggle('active');
}
//# sourceMappingURL=Animate.js.map