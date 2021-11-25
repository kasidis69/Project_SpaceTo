/*แฮม modal*/
function openPopover(event, popoverID) {
  let element = event.target;
  while (element.nodeName !== "BUTTON") {
    element = element.parentNode;
  }
  var popper = Popper.createPopper(element, document.getElementById(popoverID), {
    placement: 'bottom'
  });
  document.getElementById(popoverID).classList.toggle("hidden");
}




/*หน้า add-workspace_เรียกข้อมูลaddเพิ่ม*/
$(document).ready(function () {
  var max_fields = 10;
  var wrapper = $(".container-eq");
  var add_button = $(".add_form_field");

  var x = 1;
  $(add_button).click(function (e) {
    e.preventDefault();
    if (x < max_fields) {
      x++;
      $(wrapper).append('<div><select name="equipmentname[]" class="form-control mt-3 "><option selected disabled>select equipment name</option><option>Post-it</option><option>Pen</option><option>Flip borad</option><option>Projector</option></select><input type="number" name="amount" class="form-control" placeholder="amount" />&nbsp;&nbsp;<a href="#" class="delete mt-2 ">Delete</a></div>'); //add input box
    } else {
      alert('limit')
    }
  });

  $(wrapper).on("click", ".delete", function (e) {
    e.preventDefault();
    $(this).parent('div').remove();
    x--;
  })
});

/*หน้า add-workspace_ปุ่มเพิ่มลดจำนวน/
$(document).ready(function () {
$('#sub1').click(function () {
    var counter = $('#Number-Box1').val();
    counter--;
    $('#Number-Box1').val(counter);
});
});
$(document).ready(function () {
$('#Add1').click(function () {
    var counter = $('#Number-Box1').val();
    counter++;
    $('#Number-Box1').val(counter);
});
}); */

/*หน้า reserve-ws*/
function setColor(btn, color) {
  var count = 1;
  var property = document.getElementById(btn);
  if (count == 0) {
    property.style.backgroundColor = "#FFFFFF"
    count = 1;
  }
  else {
    property.style.backgroundColor = "#FAEBD7"
    count = 0;
  }

}

function colorchange(id) {

  var background = document.getElementById(id).style.background;

  if (background = "#FFFFFF") {
    document.getElementById(id).style.background = "#FAEBD7";
  }
  if (background == "#FAEBD7") {
    document.getElementById(id).style.background = "#FFFFFF";
  }

}


function myFunction() {
  var myobj = document.getElementById("myworksapce");
  myobj.remove();

}

/*-------------------form--------------------*/


(function ($) {
  "use strict";


  /*==================================================================
  [ Validate after type ]*/
  $('.validate-input .input100').each(function(){
      $(this).on('blur', function(){
          if(validate(this) == false){
              showValidate(this);
          }
          else {
              $(this).parent().addClass('true-validate');
          }
      })    
  })


  /*==================================================================
  [ Validate ]*/
  var input = $('.validate-input .input100');

  $('.validate-form').on('submit',function(){
      var check = true;

      for(var i=0; i<input.length; i++) {
          if(validate(input[i]) == false){
              showValidate(input[i]);
              check=false;
          }
      }

      return check;
  });


  $('.validate-form .input100').each(function(){
      $(this).focus(function(){
         hideValidate(this);
         $(this).parent().removeClass('true-validate');
      });
  });

   function validate (input) {
      if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
          if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
              return false;
          }
      }
      else {
          if($(input).val().trim() == ''){
              return false;
          }   
      }
  }

  function showValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).addClass('alert-validate');

      $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
      $('.btn-hide-validate').each(function(){
          $(this).on('click',function(){
             hideValidate(this);
          });
      });
  }

  function hideValidate(input) {
      var thisAlert = $(input).parent();
      $(thisAlert).removeClass('alert-validate');
      $(thisAlert).find('.btn-hide-validate').remove();
  }
  
  

})(jQuery);           


 