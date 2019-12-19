const positionCollection = document.getElementById('position-collection');

fetchPositions();

function fetchPositions(){
  fetch('https://dsd15-log.azurewebsites.net/Positions/')
  .then(resp => resp.json())
  .then(renderPositions)
}
function renderPositions(positions) {
    positionCollection.innerHTML = "";
    var i = 1;
    positions.forEach(function (position) {
        positionCollection.innerHTML += `
             <tr>
                <td>${i}</td>
                <td>${position.role_name}</td>
                <td>${position.des}</td>
                <td>
                    <p data-id=${position._id}>
                        <a href="#" class="update-position btn btn-info" role="button" data-toggle="modal" data-target="#myModalUpdate">Sửa</a>
                        <a href="#" class="delete-position btn btn-danger" role="button" data-toggle="modal" data-target="#confirm-delete">Xóa</a>
                    </p>
                </td>
            </tr>
    `
    i++;
  });
}

const addPositionForm = document.querySelector('.add-position-form');
addPositionForm.addEventListener('submit', function (event) {
    event.preventDefault();
    fetch(`https://dsd15-log.azurewebsites.net/Positions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role_name: `${event.target.role_name.value}`,
      des: `${event.target.des.value}`,
    })
  })
    .then(() => {
        location.reload();
    })
});






positionCollection.addEventListener('click', function(event){
    let updatePosition = (event.target.className === "update-position btn btn-info");
    let deletePosition = (event.target.className === "delete-position btn btn-danger");
    let id = event.target.parentElement.dataset.id;
    if(updatePosition){
        fetch(`https://dsd15-log.azurewebsites.net/Positions/${id}`)
        .then(resp => resp.json())
        .then((position) => {
            document.getElementById('role_name_update').value = position.role_name;
            document.getElementById('des_update').value = position.des;
            document.getElementById('id-update-position').value = id;
        });
    }
    if(deletePosition){
            document.getElementById('id-delete-position').value = id;
    }
});

const updatePositionForm = document.querySelector('.update-position-form');
updatePositionForm.addEventListener('submit', function (event) {
    id = event.target.value;
    event.preventDefault();
    fetch(`https://dsd15-log.azurewebsites.net/Positions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role_name: `${event.target.role_name.value}`,
      des: `${event.target.des.value}`,
    })
  })
    .then(() => {
        location.reload();
    });
});



const deletePosition = document.getElementById('id-delete-position');
deletePosition.addEventListener('click', function(event) {
    id = event.target.value;
    fetch(`https://dsd15-log.azurewebsites.net/Positions/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
        location.reload();
    })
});

