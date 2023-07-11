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
const debug = console.log;
// SHARED
const BASE_URL_ = `http://localhost:8000`;
class Users {
    ////////////////////////////////
    // METHOD FOR GETTING ALL USERS 
    ////////////////////////////////
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL_}/users`);
            const users = yield response.json();
            // SELECTORS
            const userContainer = document.querySelector('.user-container');
            // LOOP THROUGH RESPONSE
            for (let user of users) {
                userContainer.innerHTML += `
            <div class="user-card selected">
            <div class="user">
                <a href="#" class="user-icon">
                    <ion-icon name="person-outline" class="user-icon"></ion-icon>
                </a>
    
                <h2 class="user-name">
                    ${user.userName}
                </h2>
            </div>

            <div class="user-status">
                <h3 class="status active">
                    active
                </h3>
            </div>

            <a href="#" class="trash-icon" onclick=Users.deleteUser(${user.id})>
                <ion-icon name="trash-outline" class="delete-icon"></ion-icon>
            </a>
        </div>
            `;
            }
        });
    }
    ////////////////////////////
    // METHOD FOR DELETING USER
    ////////////////////////////
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            fetch(`${BASE_URL_}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('User deleted!');
            // RELOAD PAGE
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        });
    }
}
Users.getUsers();
//# sourceMappingURL=Users.js.map