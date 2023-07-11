"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// DEBUGGING
const log = console.log;
// SHARED
const BASE_URL = `https://projectnest-dev-server.onrender.com`;
class App {
    /////////////////////////// 
    // READ PROJECT FORM INPUT
    ///////////////////////////
    static readProjectFormInput() {
        // GET VALUES FROM INPUT FIELDS
        const projectName = document.getElementById('project-name').value;
        const assignedTo = document.getElementById('user-name').value;
        const category = document.getElementById('category').value;
        const level = document.getElementById('levels').options.selectedIndex;
        // RETURN FORM INPUT VALUES
        return {
            projectName,
            assignedTo,
            category,
            level
        };
    }
    //////////////////////////////
    // METHOD FOR ADDING PROJECTS
    //////////////////////////////
    static addProject() {
        return __awaiter(this, void 0, void 0, function* () {
            // CREATE NEW PROJECT
            const newProject = App.readProjectFormInput();
            // CREATE POST REQUEST
            yield fetch(`${BASE_URL}/projects`, {
                method: 'POST',
                body: JSON.stringify(newProject),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // RELOAD PAGE
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        });
    }
    ///////////////////////////////////////
    // METHOD TO DISPLAY ALL ADDED PROJECTS
    ///////////////////////////////////////
    static displayAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            // FETCH ALL PROJECTS
            let response = yield fetch(`${BASE_URL}/projects`);
            // CONVERT RESPONSE TO JSON
            let projects = yield response.json();
            //////////////////////////////
            // SETTING PROJECT START TIME 
            // INITIALIZE DATE OBJECT
            //////////////////////////////
            const date = new Date();
            const dd = date.getDay();
            const MM = date.getMonth();
            const yyyy = date.getFullYear();
            const months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
            // GET CURRENT MONTH
            function getMonth() {
                for (let index = 0; index < months.length; index++) {
                    if (index == MM) {
                        let month = months[index];
                        return month;
                    }
                }
            }
            /////////////////////////
            // LOOP THROUGH RESPONSE
            /////////////////////////
            for (let project of projects) {
                // SELECTOR FOR PROJECT CONTAINER | WRAPPER
                const projectWrapper = document.querySelector('.project-wrapper');
                // CREATE VARIABLE TO STORE CATEGORY LEVEL : critical | moderate | normal
                let categoryLevel;
                /////////////////////////////////////////////////////
                // SET PROJECT LEVEL BASED ON VALUE RETURNED FROM DB
                /////////////////////////////////////////////////////
                switch (project.level) {
                    case 1:
                        categoryLevel = 'critical';
                        break;
                    case 2:
                        categoryLevel = 'moderate';
                        break;
                    case 3:
                        categoryLevel = 'normal';
                        break;
                    default:
                        categoryLevel = 'normal';
                        break;
                }
                // PROJECT CARD CONTENT STRUCTURE
                let projectCard = `
        <div class="project-card">
            <div class="action-icons">
                <button class="update" title="Update" onclick=App.updateProject(${project.id})>
                    <ion-icon name="refresh-outline" class="update-icon"></ion-icon>
                </button>

                <button class="delete" title="Delete" onclick=App.deleteProject(${project.id})>
                    <ion-icon name="trash-outline" class="delete-icon"></ion-icon>
                </button>
            </div>

            <div class="project-category ${categoryLevel}">
                <h3>
                    ${project.category}
                </h3>
            </div>

            <div class="project-content">
                <h2 class="project-name">
                    ${project.projectName}
                </h2>

                <ul class="tasks">
                    <li class="task-item">
                        <a href="#" class="task">
                            Software Upgrades
                        </a>
                    </li>
                    <li class="task-item">
                        <a href="#" class="task">
                            Interfaces
                        </a>
                    </li>
                    <li class="task-item">
                        <a href="#" class="task">
                            Antivirus software
                        </a>
                    </li>
                    <li class="task-item">
                        <a href="#" class="task">
                            Upgrades
                        </a>
                    </li>
                </ul>
            </div>

            <div class="timeline">
                <div class="start-date">
                    <ion-icon name="calendar-outline" class="calender-icon"></ion-icon>

                    <h3>
                        Start date:
                    </h3>
                </div>

                <p class="date">
                    ${dd} ${getMonth()}, ${yyyy}
                </p>
            </div>
        </div>
        `;
                // APPEND CARD TO PROJECT WRAPPER | CONTAINER WITH EACH ITERATION
                projectWrapper.innerHTML += projectCard;
            }
        });
    }
    /////////////////////////////
    // METHOD TO GET ALL PROJECTS
    /////////////////////////////
    static getAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            // FETCH ALL PROJETS
            let response = yield fetch(`${BASE_URL}/projects`);
            // CONVERT RESPONSE TO JSON
            let projects = yield response.json();
            for (let project of projects) {
                log(project);
            }
        });
    }
    ///////////////////////////
    // UPDATING PROJECTS
    /////////////////////////
    ////////////////////////
    // READ PROJECT DETAILS
    ///////////////////////
    static readProjectDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/projects/${id}`);
            const project = yield response.json();
            // SET INPUT FIELDS USING DATA RETRIEVED FROM API
            const projectName = document.getElementById('project-name').value = project.projectName;
            const assignedTo = document.getElementById('user-name').value = project.assignedTo;
            const category = document.getElementById('category').value = project.category;
            const projectLevel = document.getElementById('levels').options.selectedIndex = project.level;
            return {
                projectName,
                assignedTo,
                category,
                projectLevel
            };
        });
    }
    static updateProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // FILL FORM INPUTS WITH WITH DATA FETCHED FROM API BASED ON id
            App.readProjectDetails(id);
            // SELECTORS
            const addProjectForm = document.querySelector('.add-project-form');
            const addBtn = document.querySelector('.btn');
            const assignUserField = document.querySelector('.assign-user');
            // APPEND CLASS TO PROJECT FORM
            addProjectForm.classList.toggle('active');
            // CHANGE ASSIGN USER TEXT TO REASSIGN USER
            if (assignUserField.textContent == 'Assign user') {
                assignUserField.textContent = 'Reassign user';
            }
            // CHANGE ADD BUTTON TEXT TO UPDATE AND
            // REMOVE ONCLICK ATTRIBUTE FOR
            // PREVIOUS METHOD
            if (addBtn.value == '+ Add') {
                addBtn.value = '^ Update';
                addBtn.removeAttribute('onclick');
            }
            // ADD CLICK EVENT TO PROJECT FORM BUTTON
            addBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                yield fetch(`${BASE_URL}/projects/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(App.readProjectFormInput()),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // RELOAD PAGE
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }));
        });
    }
    ////////////////////////////////
    // METHOD FOR DELETING PROJECTS
    ////////////////////////////////
    static deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${BASE_URL}/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // RELOAD PAGE
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        });
    }
}
// DISPLAY ALL PRODUCTS
App.displayAllProjects();
//# sourceMappingURL=App.js.map