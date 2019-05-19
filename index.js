const UP_ARROW_ID = 'up-arrow';
const DOWN_ARROW_ID = 'down-arrow';
const SELECTED_CLASS = 'selected';
const ARROW_CLASS = 'arrow';
const CONTACT_CLASS = 'contact';

let allProjectsArray = Array.prototype.slice.call(document.querySelectorAll('.project'));


document.addEventListener('click', (clickEvent) => {
  if(clickEvent.target.classList.contains(ARROW_CLASS)) {
    arrowClickHandler(clickEvent.target);
  }
  
  if(clickEvent.target.classList.contains('pic-click')) {
    if(window.innerWidth > 1200) {
      window.open('https://christopherkillen.blog/index.php/2019/01/29/about-blog-and-me/');
    }
  }

  if(clickEvent.target.classList.contains('project-touch')) {
    console.log(clickEvent.target)
    let selectedCard = document.querySelector('.selected');
    selectedCard.classList.toggle('flip');
  }

});

document.addEventListener('touchstart', (touchEvent) => {
  if(touchEvent.target.classList.contains(ARROW_CLASS)) {
    arrowClickHandler(touchEvent.target);
  }

  if(touchEvent.target.classList.contains('pic-click')) {
    if(window.innerWidth > 1200) {
      window.open('https://christopherkillen.blog/index.php/2019/01/29/about-blog-and-me/');
    }
  }

  if(touchEvent.target.classList.contains('project-touch')) {
    console.log(touchEvent.target)
    let selectedCard = document.querySelector('.selected');
    if(selectedCard.classList.contains('back-flip')) {
      selectedCard.classList.remove('back-flip');
    } else {
      selectedCard.classList.add('back-flip');
    }
  }
});


function arrowClickHandler(clickedArrow) {
  if(clickedArrow.id === UP_ARROW_ID) {
    const changedProjects = determineChangesSelectedProjects(-1);
    selectionChangedProjectsHandler(changedProjects);
  } else {
    const changedProjects = determineChangesSelectedProjects(1);
    selectionChangedProjectsHandler(changedProjects);
  }
}

function determineChangesSelectedProjects(amountChanged) {
  for(let i = 0; i < allProjectsArray.length; i++) {
    if(allProjectsArray[i].classList.contains(SELECTED_CLASS)) {
      if(i + amountChanged < allProjectsArray.length && i + amountChanged >= 0) {
        return {
          previousProject: allProjectsArray[i],
          selectedProject: allProjectsArray[i + amountChanged],
          direction: amountChanged,
          change: true,
        }  
      }
    }
  }

  return { 
    previousProject: null,
    selectedProject: null,
    direction: null,
    change: false,
  }
}

function selectionChangedProjectsHandler(changedProjectsObject) {

    let { previousProject, selectedProject, direction, change } = changedProjectsObject;

    if(change != false) {
    //handle selected project
    //remove all classes but project! add last-selected
    previousProject.classList = 'project';
    previousProject.classList.add('last-selected');
    //handle next selected project
    //remove all classes but project! Add either top-selected or bottom-selected
    selectedProject.classList = 'project';
    selectedProject.classList.add('selected');
    if(direction === 1) {
      selectedProject.classList.add('top-selected');
    } else {
      selectedProject.classList.add('bottom-selected');
    }
    
    //handle other stuff such as checking arrow visibility
    determineArrowVisibility(selectedProject);
  }
}

function determineArrowVisibility(selectedProject) {
  const selectedProjectIndex = allProjectsArray.indexOf(selectedProject);

  if(selectedProjectIndex === 0) {
    document.querySelector(`#${UP_ARROW_ID}`).classList.add('hidden');
  } else if(selectedProjectIndex === allProjectsArray.length - 1) {
    document.querySelector(`#${DOWN_ARROW_ID}`).classList.add('hidden');
  } else {
    document.querySelector(`#${DOWN_ARROW_ID}`).classList.remove('hidden');
    document.querySelector(`#${UP_ARROW_ID}`).classList.remove('hidden');
  }
}