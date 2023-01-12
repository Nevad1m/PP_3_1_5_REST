//Таблица всех пользователей
const url = 'http://localhost:8080/api/admin';
const renderTable = document.getElementById("allUsersTable");
const addForm = document.getElementById("formNewUser");

const renderPosts = (users) => {
    let temp = '';
    users.forEach((user) => {
        temp += `<tr>
                                <td>${user.id}</td>
                                <td id=${'name' + user.id}>${user.name}</td>
                                <td id=${'last_name' + user.id}>${user.surname}</td>
                                <td id=${'age' + user.id}>${user.age}</td>
                                <td id=${'username' + user.id}>${user.username}</td>
                                <td id=${'role' + user.id}>${user.role.map(role => role.name.substring(5)).join(' ')}</td>
                                <td>
                                <button class="btn btn-info" type="button"
                                data-bs-toggle="modal" data-bs-target="#modalEdit"
                                onclick="editModal(${user.id})">Edit</button></td>
                                <td>
                                <button class="btn btn-danger" type="button"
                                data-bs-toggle="modal" data-bs-target="#modalDelete"
                                onclick="deleteModal(${user.id})">Delete</button></td>
                                </tr>
                                `
    })
    renderTable.innerHTML = temp;
}

function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderPosts(data)
        })
}

getAllUsers()

// Добавление пользователя

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let nameValue = document.getElementById("newUserFirstName").value;
    let surnameValue = document.getElementById("newUserLastName").value;
    let ageValue = document.getElementById("newUserAge").value;
    let emailValue = document.getElementById("newUserEmail").value;
    let passwordValue = document.getElementById("newUserPassword").value;
    let roles = getRoles(Array.from(document.getElementById("addRoles").selectedOptions).map(role => role.value));
    let newUser = {
        name: nameValue,
        surname: surnameValue,
        age: ageValue,
        username: emailValue,
        password: passwordValue,
        role: roles
    }
    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(newUser)
    }).then(data => {
        const dataArr = [];
        dataArr.push(data);
        getAllUsers(data);
    }).then(() => {
        document.getElementById("users-table-tab").click();
    })
})


function getRoles(rols) {
    let roles = [];
    if (rols.indexOf("ADMIN") >= 0) {
        roles.push({"id": 1});
    }
    if (rols.indexOf("USER") >= 0) {
        roles.push({"id": 2});
    }
    return roles;
}


// Delete
function deleteModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(user => {
            document.getElementById('idDeleteUser').value = user.id;
            document.getElementById('deleteUserFirstName').value = user.name;
            document.getElementById('deleteUserSurname').value = user.surname;
            document.getElementById('deleteUserAge').value = user.age;
            document.getElementById('deleteUsername').value = user.username;
            document.getElementById('deleteUserRoles').value = user.role.map(role => role.name);
        })
    });
}

async function deleteUser() {
    console.log(document.getElementById('idDeleteUser').value)
    await fetch(url + '/' + document.getElementById('idDeleteUser').value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(document.getElementById('idDeleteUser').value)
    })

    getAllUsers()
    document.getElementById("deleteFormCloseButton").click();
}

// Edit
function editModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(user => {

            document.getElementById('idEditUser').value = user.id;
            document.getElementById('editUserFirstName').value = user.name;
            document.getElementById('editUserSurname').value = user.surname;
            document.getElementById('editUserAge').value = user.age;
            document.getElementById('editUsername').value = user.username;
            document.getElementById('editUserPassword').value = user.password;
            document.getElementById('editUserRolesUserRoles').value = user.role.map(role => role.name);

        })
    });
}

async function editUser() {
    let idValue = document.getElementById("idEditUser").value;
    let nameValue = document.getElementById("editUserFirstName").value;
    let lastNameValue = document.getElementById("editUserSurname").value;
    let ageValue = document.getElementById("editUserAge").value;
    let emailValue = document.getElementById("editUsername").value;
    let passwordValue = document.getElementById("editUserPassword").value;
    let roles = getRoles(Array.from(document.getElementById("editUserRoles").selectedOptions).map(role => role.value));

    let user = {
        id: idValue,
        name: nameValue,
        surname: lastNameValue,
        age: ageValue,
        username: emailValue,
        password: passwordValue,
        roles: roles

    }

    await fetch(url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    });
    getAllUsers()
    document.getElementById("editFormCloseButton").click(); //???
}

//User
const tableForUser = document.getElementById("admin-panel1");
const urlAuth = 'http://localhost:8080/api/admin/authentication';
const panel = document.getElementById("admin-panel2");

function userAuthInfo() {
    fetch(urlAuth)
        .then((res) => res.json())
        .then((user) => {
            let temp = '';
            temp += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.surname}</td>
            <td>${user.age}</td>
            <td>${user.username}</td>
            <td>${user.role.map(role => role.name.substring(5)).join(' ')}</td>
            </tr>`;
            tableForUser.innerHTML = temp;
        });
}

userAuthInfo()

function userPanel() {
    fetch(urlAuth)
        .then((res) => res.json())
        .then((user) => {
            panel.innerHTML = `<h5>${user.username} with roles: ${user.role.map(role => role.name.substring(5)).join(' ')}</h5>`
        });
}

userPanel()