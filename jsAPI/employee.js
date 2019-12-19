function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

setVisible('.page', false);
setVisible('#loading', true);

//position select
const positionCollection = document.getElementById('select_position');

fetchPositions();

function fetchPositions() {
    $.ajax({
        type: 'GET',
        url: "https://dsd15-log.azurewebsites.net/Positions/",
        success: function (response) {
            console.log(response);
            renderPositions(response);
            load(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function renderPositions(positions) {
    positionCollection.innerHTML = "";
    positions.forEach(function (position) {
        positionCollection.innerHTML += `
             <option value="${position._id}">${position.role_name}</option>
    `
    });
}

//employee Collection
const employeeCollection = document.getElementById('employee-collection');

function load(positions) {
    fetchEmployees(positions);
}

function fetchEmployees(positions) {
    $.ajax({
        type: 'GET',
        url: 'https://dsd15-log.azurewebsites.net/Members/departments/' + sessionStorage.getItem("id_department"),
        success: function (response) {
            console.log(response);
            renderEmployees(response, positions);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function renderEmployees(employees, positions) {
    employeeCollection.innerHTML = "";
    let i = 1;
    employees.forEach(function (employee) {
        var name = "";
        var des = "";
        var pos = "";
        $.ajax({
            type: 'GET',
            url: 'https://dsd05-dot-my-test-project-252009.appspot.com/user/getUserInfo?id=' + employee.user,
            success: function (response) {
                console.log(response);
                name = response.name;
                console.log(name);
                positions.forEach(function (position) {
                    if (position._id === employee.role) {
                        des = position.des;
                        pos = position.role_name;
                    }
                });
                employeeCollection.innerHTML += `
                        <tr>
                            <td>${i}</td>
                            <td>${name}</td>
                            <td>${des}</td>
                            <td>${pos}</td>
                            <td>
                                <p data-id="${employee._id}">
                                 <a href="#" class="btn btn-info" role="button">Công việc</a>
                                 <a href="#" class="btn btn-primary" role="button">Chi tiết</a>
                                 <button class="btn btn-danger"
                                 role="button" data-toggle="modal" data-target="#confirm-delete">Xóa</button>
                             </p>
                    </td>
                        </tr>
            `;
                i++;
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
    setVisible('.page', true);
    setVisible('#loading', false);
}

//user select
const userCollection = document.getElementById('select_user');

fetchNoMembers();

function fetchNoMembers() {
    fetch('https://dsd15-log.azurewebsites.net/Members/nomember/')
        .then(resp => resp.json())
        .then(renderUser)
}

function renderUser(users) {
    userCollection.innerHTML = "";
    users.forEach(function (user) {
        userCollection.innerHTML += `
                <option value="${user.id}">${user.name}</option>
    `
    });
}

$('#button_save').click(function () {
    let request = {
        "depart": sessionStorage.getItem("id_department"),
        "user": $('#select_user').val(),
        "name": $('#select_user option:selected').text(),
        "role": $('#select_position').val(),
    };
    fetch(`https://dsd15-log.azurewebsites.net/Members/?member`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    })
        .then(resp => resp.json)
        .then(() => {
            location.reload();
        });
});

employeeCollection.addEventListener('click', function (event) {
    let taskPosition = (event.target.className === "btn btn-info");
    let detailPosition = (event.target.className === "btn btn-primary");
    let deletePosition = (event.target.className === "btn btn-danger");
    let id = event.target.parentElement.dataset.id;
    if (taskPosition) {
    }
    if (detailPosition) {
    }
    if (deletePosition) {
        document.getElementById('id-delete-position').value = id;
    }
});

// const updatePositionForm = document.querySelector('.update-position-form');
// updatePositionForm.addEventListener('submit', function (event) {
//     id = event.target.value;
//     event.preventDefault();
//     fetch(`https://dsd15-log.azurewebsites.net/Positions/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             role_name: `${event.target.role_name.value}`,
//             des: `${event.target.des.value}`,
//         })
//     }).then(() => {
//         window.location.reload();
//     });
// });


const deletePosition = document.getElementById('id-delete-position');
deletePosition.addEventListener('click', function (event) {
    id = event.target.value;
    fetch("https://dsd15-log.azurewebsites.net/Members/" + id + "?member", {
        method: 'DELETE'
    }).then(res => {
        console.log(res);
        window.location.reload();
    })
});

