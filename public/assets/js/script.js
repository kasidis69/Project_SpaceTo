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

/*หน้า add-workspace_ปุ่มเพิ่มลดจำนวน
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






