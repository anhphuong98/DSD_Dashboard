const positionCollection = document.getElementById('position-collection');
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
             <tr data-id="${position.id}">
                <td>${i}</td>
                <td>${position.role_name}</td>
                <td>${position.des}</td>
                <td>
                    <p>
                        <a href="#" class="btn btn-info" role="button" data-toggle="modal" data-target="#myModal">Sửa</a>
                        <a href="#" class="btn btn-danger" role="button" data-toggle="modal" data-target="#confirm-delete">Xóa</a>
                    </p>
                </td>
            </tr>
    `
    i++;
  });
}

fetchPositions();

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
    .then(resp => resp.json())
    .then(() => {
        location.reload();
    })
});


const deletePosition = document.getElementById('delete-postion');
deletePosition.addEventListener('click', function(event) {
    let id = event.target.parentElement.dataset.id
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(fetchToys)
});
