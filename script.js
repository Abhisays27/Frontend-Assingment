document.addEventListener("DOMContentLoaded", function () {
  var draggedItem = null;
  var successMessage = document.getElementById("success-message");
  var container2 = document.getElementById("container2");
  var addItemsMessage = document.getElementById("add-items-message");

  // Event listeners for draggable items
  var draggableItems = document.querySelectorAll(".draggable-item");
  draggableItems.forEach(function (item) {
    item.addEventListener("dragstart", function (event) {
      draggedItem = event.target;
      event.dataTransfer.setData("text/plain", event.target.id);
      event.target.classList.add("dragging");
    });

    // Touch event listeners for mobile drag
    item.addEventListener("touchstart", function (event) {
      draggedItem = event.target;
      event.target.classList.add("dragging");
    });

    item.addEventListener("touchmove", function (event) {
      event.preventDefault();
      var touch = event.touches[0];
      draggedItem.style.position = "fixed";
      draggedItem.style.left =
        touch.clientX - draggedItem.offsetWidth / 2 + "px";
      draggedItem.style.top =
        touch.clientY - draggedItem.offsetHeight / 2 + "px";
    });

    item.addEventListener("touchend", function (event) {
      draggedItem.style.position = "static";
    });
  });

  // Event listener for drop
  document.addEventListener("drop", function (event) {
    event.preventDefault();
    var dropTarget = event.target;

    // Find the closest container element if the target is inside another element
    while (dropTarget !== container2 && dropTarget.parentNode) {
      dropTarget = dropTarget.parentNode;
    }

    if (dropTarget === container2) {
      var data = event.dataTransfer.getData("text/plain");
      var draggedElement = document.getElementById(data);
      if (draggedElement.tagName === "IMG" || draggedElement.tagName === "P") {
        event.target.appendChild(draggedElement);
        successMessage.textContent = "Item Dragged Successfully!";
        successMessage.style.opacity = 1;
        addItemsMessage.style.display = "none"; // Hide the "Add Items here" message
        setTimeout(function () {
          successMessage.style.opacity = 0;
        }, 1000);
      }
    }

    draggedItem.classList.remove("dragging");
  });

  // Touch event listeners for mobile drop
  container2.addEventListener("touchmove", function (event) {
    event.preventDefault();
  });

  container2.addEventListener("touchend", function (event) {
    var dropTarget = document.elementFromPoint(
      event.changedTouches[0].clientX,
      event.changedTouches[0].clientY
    );

    // Find the closest container element if the target is inside another element
    while (dropTarget !== container2 && dropTarget.parentNode) {
      dropTarget = dropTarget.parentNode;
    }

    if (dropTarget === container2) {
      var data = draggedItem.id;
      if (draggedItem.tagName === "IMG" || draggedItem.tagName === "P") {
        dropTarget.appendChild(draggedItem);
        successMessage.textContent = "Item Dragged Successfully!";
        successMessage.style.opacity = 1;
        addItemsMessage.style.display = "none"; // Hide the "Add Items here" message
        setTimeout(function () {
          successMessage.style.opacity = 0;
        }, 1000);
      }
    }

    draggedItem.classList.remove("dragging");
  });

  // Event listener for reset button
  var resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", function () {
    var container1 = document.getElementById("container1");
    var container2 = document.getElementById("container2");

    // Move all items back to container1
    var items = container2.querySelectorAll(".draggable-item");
    items.forEach(function (item) {
      container1.appendChild(item);
    });

    // Clear success message
    successMessage.style.opacity = 0;
    addItemsMessage.style.display = "block"; // Show the "Add Items here" message
  });
});
