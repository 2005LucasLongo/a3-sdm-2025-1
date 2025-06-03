var modal = document.getElementById("myModal");

var btn1 = document.getElementById("C1");
var btn2 = document.getElementById("C2");
var btn3 = document.getElementById("C3");
var btn4 = document.getElementById("C4");


var span = document.getElementsByClassName("close")[0];

btn1.onclick = function() {
  modal.style.display = "block";
}
btn2.onclick = function() {
  modal.style.display = "block";
}
btn3.onclick = function() {
  modal.style.display = "block";
}
btn4.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function submitForm(){
    var modal = document.getElementById("myModal");

    modal.style.display = "none";

    var modal1 = document.getElementById("myModal1");


    var span = document.getElementsByClassName("close")[0];

    modal1.style.display = "block";
    

    span.onclick = function() {
        modal1.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal1) {
            modal1.style.display = "none";
        }
    }
}

function sucesso(){
    var modal1 = document.getElementById("myModal");

    modal1.style.display = "none";

    var modal2 = document.getElementById("myModal2");



    var span = document.getElementsByClassName("close")[0];

    modal2.style.display = "block";
    


    span.onclick = function() {
        modal2.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal1) {
            modal2.style.display = "none";
        }
    }
}
