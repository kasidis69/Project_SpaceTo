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

/*หน้า add(กรอกข้อมูลสถานที่) 
function show_location_other()
{

    if (document.getElementById('location').value == "Other" ){
	document.getElementById('location_other').style.display = 'block';}
    else {document.getElementById('location_other').style.display = 'none';}

}
*/


