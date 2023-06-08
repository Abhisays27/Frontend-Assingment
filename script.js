document.addEventListener("DOMContentLoaded", function() {
    var draggedItem = null;
    var successMessage = document.getElementById("success-message");
    var container2 = document.getElementById("container2");
    var addItemsMessage = document.getElementById("add-items-message");
  
    // Event listeners for draggable items
    var draggableItems = document.querySelectorAll(".draggable-item");
    draggableItems.forEach(function(item) {
      item.addEventListener("dragstart", function(event) {
        draggedItem = event.target;
        event.dataTransfer.setData("text/plain", event.target.id);
        event.target.classList.add("dragging");
      });
    });
  
    // Event listener for dragover
    document.addEventListener("dragover", function(event) {
      event.preventDefault();
    });
  
    // Event listener for drop
    document.addEventListener("drop", function(event) {
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
          setTimeout(function() {
            successMessage.style.opacity = 0;
          }, 1000);
        }
      }
  
      draggedItem.classList.remove("dragging");
    });
  
    // Event listener for reset button
    var resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", function() {
      var container1 = document.getElementById("container1");
      var container2 = document.getElementById("container2");
  
      // Move all items back to container1
      var items = container2.querySelectorAll(".draggable-item");
      items.forEach(function(item) {
        container1.appendChild(item);
      });
  
      // Clear success message
      successMessage.style.opacity = 0;
      addItemsMessage.style.display = "block"; // Show the "Add Items here" message
    });
  });
  