// Subtasks Listed Item Hover and show Edit/Delete Icon effect
document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < 2; i++) {
        const hoverListedItem = document.querySelector(`.subtaskListedItem${i}`)
        const hoverListedItemImage = document.querySelector(`.subtaskListedImage${i}`)
        hoverListedItemImage.style.display = "none";
    hoverListedItem.addEventListener("mouseenter", function () {
        hoverListedItem.style.backgroundColor = "#D1D1D1"; // gray
        hoverListedItemImage.style.display = "block";
    });
    hoverListedItem.addEventListener("mouseleave", function () {
        hoverListedItem.style.backgroundColor = "#FFFFFF"; // Change back to original color
        hoverListedItemImage.style.display = "none";
    })
};});

function setPriority(priority) {
    let priorities = {
      urgent: document.getElementById("urgent"),
      medium: document.getElementById("medium"),
      low: document.getElementById("low"),
    };
  
    for (let key in priorities) {
      priorities[key].style.backgroundColor =
        key === priority ? getColor(priority) : "";
    }
  }
  
  function getColor(priority) {
    switch (priority) {
      case "urgent":
        return "#FF3D00";
      case "medium":
        return "#FFA800";
      case "low":
        return "#7AE229";
      default:
        return "";
    }
  }
  
  function setBgImg(priority) {
    let images = {
      urgent: document.getElementById("activeUrg"),
      medium: document.getElementById("activeMed"),
      low: document.getElementById("activeLow"),
    };
  
    for (let key in images) {
      images[key].src =
        key === priority ? getActiveImg(priority) : getInactiveImg(key);
    }
  }
  
  function getActiveImg(priority) {
    switch (priority) {
      case "urgent":
        return "/img/userStoryEdit/urgent-prio-icon-active.svg";
      case "medium":
        return "/img/userStoryEdit/prio_medium_active.svg";
      case "low":
        return "/img/userStoryEdit/low-prio-icon-active.png";
      default:
        return "";
    }
  }
  
  function getInactiveImg(priority) {
    switch (priority) {
      case "urgent":
        return "/img/userStoryEdit/urgent-prio-icon-inactive.svg";
      case "medium":
        return "/img/userStoryEdit/prio_medium_inactive.svg";
      case "low":
        return "/img/userStoryEdit/low-prio-icon-inactive.png";
      default:
        return "";
    }
  }
  
  function addUrgent() {
    setPriority("urgent");
    setBgImg("urgent");
  }
  
  function addMedium() {
    setPriority("medium");
    setBgImg("medium");
  }
  
  function addLow() {
    setPriority("low");
    setBgImg("low");
  }