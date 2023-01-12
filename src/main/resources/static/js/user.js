const url = 'http://localhost:8080/api/users/authentication';
const data = document.getElementById("user_page");
const panel = document.getElementById("user-panel1");

function userAuthInfo() {
    fetch(url)
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
            data.innerHTML = temp;
            panel.innerHTML = `<h5>${user.username} with roles: ${user.role.map(role => role.name.substring(5)).join(' ')}</h5>`
        });
}

userAuthInfo()