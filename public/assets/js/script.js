
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

