
const departmentCollection = document.getElementById('department-collection');
const departmentCount = document.getElementById('department-count');
const userCount = document.getElementById('user-count');




function fetchDepartments(){
  fetch('https://dsd15-log.azurewebsites.net/Departments/getall/?member')
  .then(resp => resp.json())
  .then(renderDepartments)
}

function renderDepartments(departments){
    departmentCount.innerHTML = "";
    departmentCount.innerHTML += departments.length;
    departmentCollection.innerHTML = "";
    departments.forEach(function (department) {
        departmentCollection.innerHTML += `
            <div class="col-4 col-sm-4 col-md-4 col-lg-4">
                <div class="thumbnail">
                    <div class="title-depart">
                    <h4>${department.depart_name}</h4>
                    </div>
                    <div class="caption">
                        <div class ="content-depart">
                            <h5>${department.depart_des}</h5>
                        </div>
                        <p data-id=${department._id}>
                            <a href="listEmployee.html" class="btn btn-info" role="button" value="${department.depart_id}">Xem chi tiết</a>
                            <a class="update-depart btn btn-default" role="button" data-toggle="modal" data-target="#myModalUpdate">Chỉnh sửa</a>
                            <a class="delete-depart btn btn-danger" role="button" data-toggle="modal" data-target="#confirm-delete">Xóa</a>
                        </p>
                    </div>
                </div>
            </div>
        `
        });
}

function fetchCountUsers(){
    fetch('https://dsd05-dot-my-test-project-252009.appspot.com/user/getUserInfos')
    .then(resp => resp.json())
    .then((users) => {
        userCount.innerHTML = "";
        userCount.innerHTML += users.length;
    })
}
const addDepartForm = document.querySelector('.add-depart-form');
addDepartForm.addEventListener('submit', function (event) {
    event.preventDefault();
    fetch(`https://dsd15-log.azurewebsites.net//Departments/?member`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      depart_name: `${event.target.depart_name.value}`,
      depart_des: `${event.target.depart_des.value}`,
    })
  })
    .then(resp => resp.json)
    .then(() => {
        location.reload();
    })
});



departmentCollection.addEventListener('click', function(event){
    let updateDepart = (event.target.className === "update-depart btn btn-default");
    let deleteDepart = (event.target.className === "delete-depart btn btn-danger");
    let id = event.target.parentElement.dataset.id;
    console.log(id);
    if(updateDepart){
        fetch(`https://dsd15-log.azurewebsites.net/Departments/${id}?member`)
        .then(resp => resp.json())
        .then((depart) => {
            document.getElementById('depart_name_update').value = depart.depart_name;
            document.getElementById('depart_des_update').value = depart.depart_des;
            document.getElementById('id-update-depart').value = id;
        });
    }
    if(deleteDepart){
            document.getElementById('id-delete-depart').value = id;
    }
});


const updateDepartForm = document.querySelector('.update-depart-form');
updateDepartForm.addEventListener('submit', function (event) {
    id = event.target.value;
    event.preventDefault();
    fetch(`https://dsd15-log.azurewebsites.net/Departments/update/?id=${id}&member=`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      depart_name: `${event.target.depart_name.value}`,
      depart_des: `${event.target.depart_des.value}`,
    })
  })
    .then(() => {
        location.reload();
    });
});


const deleteDepart = document.getElementById('id-delete-depart');
deleteDepart.addEventListener('click', function(event) {
    id = event.target.value;
    fetch(`https://dsd15-log.azurewebsites.net/Departments/${id}?member=`, {
      method: 'DELETE'
    })
    .then(() => {
        location.reload();
    })
});




fetchDepartments();
fetchCountUsers();



// <h5>Trưởng phòng: Nguyễn Anh Phương</h5>
//                         <h5>Số lượng nhân viên: 100</h5>
//                         <h5>Phần trăm nhân viên</h5>
//                         <div class="progress">
//                             <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
//                             <span class="sr-only">40% Complete (success)</span>
//                              </div>
//                         </div>
