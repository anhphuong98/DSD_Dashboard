
const departmentCollection = document.getElementById('department-collection');
const departmentCount = document.getElementById('department-count');
const userCount = document.getElementById('user-count');

async function fetchDepartments(){
  fetch('https://dsd15-log.azurewebsites.net/Departments/getall/?member')
  .then(resp => resp.json())
  .then((departments) => {
    departmentCount.innerHTML = "";
    departmentCount.innerHTML += departments.length;
    departmentCollection.innerHTML = "";
    departments.forEach(function (department) {
        // console.log(count_user);
        departmentCollection.innerHTML += `
            <div class="col-4 col-sm-4 col-md-4 col-lg-4">
                <div class="thumbnail">
                    <div class="title-depart">
                    <h4>${department.depart_name}</h4>
                    </div>
                    <div class="caption">
                        <h5>Trưởng phòng: Nguyễn Anh Phương</h5>
                        <h5>Số lượng nhân viên: 100</h5>
                        <h5>Phần trăm nhân viên</h5>
                        <div class="progress">
                            <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                            <span class="sr-only">40% Complete (success)</span>
                             </div>
                        </div>
                        <p>
                            <a href="listEmployee.html" class="btn btn-info" role="button">Xem chi tiết</a>
                            <a href="#" class="btn btn-default" role="button" data-toggle="modal" data-target="#myModal">Chỉnh sửa</a>
                        </p>
                    </div>
                </div>
            </div>
        `
        });
    });
}

async function fetchCountUsers(){
    fetch('https://dsd05-dot-my-test-project-252009.appspot.com/user/getUserInfos')
    .then(resp => resp.json())
    .then((users) => {
        userCount.innerHTML = "";
        userCount.innerHTML += users.length;
    })
}

fetchDepartments();
fetchCountUsers();
