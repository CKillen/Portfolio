const UP_ARROW_ID = 'up-arrow';
const DOWN_ARROW_ID = 'down-arrow';
const SELECTED_CLASS = 'selected';
const ARROW_CLASS = 'arrow';

let allProjects = document.querySelectorAll(".project");


document.addEventListener('click', (clickEvent) => {
  if(clickEvent.target.classList.contains(ARROW_CLASS)) {
    arrowClickHandler(clickEvent.target);
  }
});

function arrowClickHandler(clickedArrow) {
  if(clickedArrow.id === UP_ARROW_ID) {
    changeSelectedProject(-1)
  } else {
    changeSelectedProject(1)
  }
}

function changeSelectedProject(amountChanged) {

  for(let i = 0; i < allProjects.length; i++) {
    if(allProjects[i].classList.contains(SELECTED_CLASS)) {
      if(i + amountChanged < allProjects.length && i + amountChanged >= 0) {
        projectSelectedChangeHandler(allProjects[i], allProjects[i + amountChanged], i + amountChanged)
        break;
      }
    }
  }
}

function projectSelectedChangeHandler(selectedProject, nextSelectedProject, nextSelectedProjectIndex) {
  selectedProject.classList.remove(SELECTED_CLASS);
  nextSelectedProject.classList.add(SELECTED_CLASS);
  determineArrowVisibility(nextSelectedProjectIndex);
}

function determineArrowVisibility(projectIndex) {
  if(projectIndex === 0) {
    document.querySelector(`#${UP_ARROW_ID}`).classList.add('hidden');
  } else if(projectIndex === allProjects.length - 1) {
    document.querySelector(`#${DOWN_ARROW_ID}`).classList.add('hidden');
  } else {
    document.querySelector(`#${DOWN_ARROW_ID}`).classList.remove('hidden');
    document.querySelector(`#${UP_ARROW_ID}`).classList.remove('hidden');
  }
}