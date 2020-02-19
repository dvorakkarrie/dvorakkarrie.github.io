// Project #1: Build a Game with HTML, CSS and JavaScript
// Requirements:
//  - Render in the browser
//  - Include separate HTML / CSS / JavaScript files
//  - Use Javascript for DOM manipulation
//  - Be deployed online, using Github Project pages and/or to a custom domain.
//  - Use semantic markup for HTML and CSS (adhere to best practices)
//  - Show a good commit history with frequent commits
//  - Additionally, your project should stick with KISS (Keep It Stupid Simple) and DRY (Don't Repeat Yourself) principles.

(function(window){
    // Defined variables for the Instructions pop up window.
    const instructions = document.querySelector('.instructions')
    const instructionPopUp = document.querySelector('#instructionPopUp')
    const close = document.querySelector('.close')
    const closeError = document.querySelector('.closeError')
    

    // Defined variables for the Error pop up window.
    const errorPopUp = document.querySelector('#errorPopUp')
    const popUpListError = document.querySelector('.popUpListError')
    const errorLargerDisk = 'A larger disk can not be placed on a smaller disk.'
    const errorDiskNotSelected = 'A disk needs to be selected before selecting a tower.'

    // Defined variables for the user to select the desired number of disks.
    const levelDiv = document.querySelector('.level')
    const dropdownButton = document.querySelector('.dropdownButton')

    // Defined variables to count the moves and time it takes for the player to complete the game.
    const moveCounter = document.querySelector('#moves-counter')
    let timeCounter = document.querySelector('#time-counter')
    let minutes = 0
    let seconds = 0
    let timeString
    let timeVariable

    // Defined variables for the three towers that will be used when moving the disks.
    let towerContainer = document.querySelector('.towerContainer')
    let source = document.querySelector('#source')
    let auxiliary = document.querySelector('#auxiliary')
    let destination = document.querySelector('#destination')
    let selectedDisk
    let diskArray = ['disk1','disk2','disk3','disk4','disk5','disk6','disk7','disk8']

    // Defined a variable for the user to restart the game.
    const restart = document.querySelector('.restart')

    // Created a function to restart the game.
    function restartGame() {
        location.reload();
    }
    restart.addEventListener('click', restartGame)

    // Created functions and event listeners for the Instructions pop up window.
    function openPopUp() {
        instructionPopUp.style.display = 'block'
    }
    instructions.addEventListener('click', openPopUp)

    function closePopUp() {
        instructionPopUp.style.display = "none"
    }
    close.addEventListener('click', closePopUp)

    // Created functions and event listeners for the Error pop up window.
    function openErrorPopUp(errorMessage) {
        popUpListError.innerText = errorMessage
        errorPopUp.style.display = 'block'
    }

    function closeErrorPopUp() {
        errorPopUp.style.display = "none"
    }
    closeError.addEventListener('click', closeErrorPopUp)

    // Created a function to alert the user they won the game.
    function win() {
        if (destination.childElementCount === parseInt(this.level)) {
            let message = document.querySelector('.message')
            message.style.display = "block"
            restartMessage.style.display = "block"
            clearInterval(timeVariable)
            instructions.removeEventListener('click', openPopUp)
            dropdownButton.removeEventListener('click',getSelectedLevel)
            towerContainer.removeEventListener('click',moveDisk)
        }
    }

    // Created a function to move disks to the selected tower.
    function moveToTower(selectedDisk) {
        if (selectedTower.lastElementChild != null && selectedTower.lastElementChild.id > selectedDisk.id) {
            openErrorPopUp(errorLargerDisk)
        } else {
            selectedTower.append(selectedDisk)
            selectedDisk.style.border = "3px black solid"
            moveCounter.textContent++, 
            win()
        }
    }

    // Created a function to identify the disk or tower that was selected before moving the disk.
    function moveDisk(event) {
        if (event.target === source.lastElementChild || event.target === auxiliary.lastElementChild || 
            event.target === destination.lastElementChild) {
            selectedDisk = event.target
            selectedDisk.style.border = "3px black dashed"
        } else {
            selectedTower = event.target
            if (selectedDisk && (selectedTower === source || selectedTower === auxiliary || selectedTower === destination)) {
                moveToTower(selectedDisk)
            } else {
                openErrorPopUp(errorDiskNotSelected)
            }
        }
    }    
    
    // Created a function to count the time.
    function countTime() {
        ++seconds
        if (seconds < 10) {
            timeString = "0" + seconds
        } else if (seconds >=10 && seconds <= 59) {
            timeString = seconds + ""
        } else if (seconds >= 60) {
            seconds = 0
            minutes++
            timeString = seconds + ""
        }
        timeCounter.textContent = `${minutes}:${timeString}`
    }

    function addNewDisk(i) {
        j = i + 1
        diskArray[i] = document.createElement('div')
        diskArray[i].classList.add('disk')
        diskArray[i].classList.add('disk' + j)
        diskArray[i].innerText = "Disk"
        diskArray[i].setAttribute('id',j)
        source.appendChild(diskArray[i])
    }

    // Created a function to set up the level, number of disks and timer. 
    function getSelectedLevel() {
        level = document.querySelector('.dropdown').value

        for (let i = 0; i < level; i ++) {
            addNewDisk(i)
        }

        levelDiv.style.display = "none"
        towerContainer.style.display = "flex"
        towerContainer.addEventListener('click',moveDisk)
        timeVariable = setInterval(countTime,1000)
    }
    dropdownButton.addEventListener('click', getSelectedLevel)

})(window);