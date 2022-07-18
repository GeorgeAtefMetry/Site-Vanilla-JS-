// Check if ther's ;oca; Storage Color Option
let mainColors = localStorage.getItem('color_option')
let mainColorsBG = localStorage.getItem('color_optionBG')

    if(mainColors !== null){

        document.documentElement.style.setProperty('--main--color', mainColors)

        // Remove Active class from all Children
        document.querySelectorAll('.colors-list li').forEach(element => {
                    
            element.classList.remove('active')
            
            if(element.dataset.color === mainColors){

                element.classList.add('active')
            } 

        })
        
}

    if(mainColorsBG !== null){

        document.documentElement.style.setProperty('--main--colorBG', mainColorsBG)

        // Remove Active class from all Children
        document.querySelectorAll('.colors-listBG li').forEach(element => {
                    
            element.classList.remove('active')
            
            if(element.dataset.color === mainColors){

                element.classList.add('active')
            } 

        })
        
}


// Random Background Option
    let backgroundOption = true

// Variable to Control the Background Interval
    let backgroundInterval;

// Check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option")

// Check if Random Background local Storage is not EMPTY
if(backgroundLocalItem !== null) {
    
    if(backgroundLocalItem === 'true'){
        
        backgroundOption = true
    
    }else {
        
        backgroundOption = false
    }
    
    // Remove Active class from all span
    document.querySelectorAll('.random-background').forEach(element => {
        
        element.classList.remove("active")
    })

    if(backgroundLocalItem === 'true'){

        document.querySelector('.random-background .yes').classList.add('active')

    }else{

        document.querySelector('.random-background .no').classList.add('active')
    }
}


// Toggle Spin Class on ICON
document.querySelector('.fa-gear').onclick = function() {
    this.classList.toggle('fa-spin')
    document.querySelector('.setting-box').classList.toggle('open')
}



// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li")
    
    colorsLi.forEach(li => {
        
        li.addEventListener('click', (e) => {
            
            document.documentElement.style.setProperty('--main--color', e.target.dataset.color)
            
            localStorage.setItem('color_option', e.target.dataset.color)

            handleActive(e)
        })
    })


// Switch Colors
const colorsLiBG = document.querySelectorAll(".colors-listBG li")
    
    colorsLiBG.forEach(li => {
        
        li.addEventListener('click', (e) => {
            
            document.documentElement.style.setProperty('--main--colorBG',e.target.dataset.color)
            
            localStorage.setItem('color_optionBG', e.target.dataset.color)

            // Remove Active class from all Children
            e.target.parentElement.querySelectorAll('.active').forEach(element => {
                    
                element.classList.remove('active')
            })
                        e.target.classList.add('active')
        })
    })



// Switch Random Backgrounds Option
const randomBackgrounds = document.querySelectorAll(".random-background span")
    
    // Loop On All Spans
    randomBackgrounds.forEach(span => {
        
        // Click on Every Span
        span.addEventListener('click', (e) => {

            // Remove Active class from all Children
            handleActive(e);

                if(e.target.dataset.background === 'yes'){
                    
                    backgroundOption = true
                    randomizeImgs()
                    localStorage.setItem("background-option", true)
                } else {
                    
                    backgroundOption = false
                    clearInterval(backgroundInterval)
                    localStorage.setItem("background-option", false)

                }
        })
    })



// Selecting Page Elements
let  landingPage = document.querySelector('.landing-page')

// Get Array of IMGs
let imgsArray = 
    ['landing-page-1.jpg','landing-page-2.jpg','landing-page-3.jpg','landing-page-4.jpg','landing-page-5.jpg']


// Variable To Control The Interval
    function randomizeImgs() {
        
        if(backgroundOption === true){
            
            backgroundInterval = setInterval(() => {
                
                let RandomNumber = Math.floor(Math.random() * imgsArray.length)
                
                landingPage.style.backgroundImage = 'url("img/' +imgsArray[RandomNumber]+'")'
            }, 3000);
        }
    }
    randomizeImgs()





// Select Skills Selector 
let ourSkills = document.querySelector('.skills')

// on Scroll
window.onscroll = function (){

    // Skills offset Top

    let skillsOffsetTop = ourSkills.offsetTop;


    // Outer Height

    let  skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height

    let windowHeight = this.innerHeight;

    // Window ScrollTop 

    let windowScrollTop = this.pageYOffset;
    console.log(windowScrollTop)
    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span')

        allSkills.forEach(skill => {
            
            skill.style.width = skill.dataset.progress
        })
    }
}



// Create Poput wuth Image
let ourGallery = document.querySelectorAll('.gallery img')

// For ach Image
ourGallery.forEach(img => {
    
    img.addEventListener('click', (e) => {

        let overlay = document.createElement('div')

        overlay.className = 'popup-overlay'
        
        document.body.appendChild(overlay)


        // Create The Popup
        let popupBox = document.createElement('div')

        // Create class for the popup 
        popupBox.className= 'popup-box'


        // Create Heading (ALT) at the top of the image 
        if(img.alt !== null){

            let imgHeading = document.createElement('h2')

            let imgtext = document.createTextNode(img.alt)

            imgHeading.appendChild(imgtext)

            popupBox.appendChild(imgHeading)
        }


        // Create The Image 
        let popupImage = document.createElement('img')

        // Set Image Source 
        popupImage.src = img.src

        // Add img to the popup box
        popupBox.appendChild(popupImage)

        //Append popup box to the body
        document.body.appendChild(popupBox)


        // Create the Close Span
        let closeButton = document.createElement('span')

        // Create the close Button Text
        let closeButtonText = document.createTextNode('X')

        // Append Text to Close Button
        closeButton.appendChild(closeButtonText)

        // Add class to close button
        closeButton.className = 'close-button'

        // Add close button to the popup box
        popupBox.appendChild(closeButton)

    })
})

// Close Popup
document.addEventListener('click', function(e){
    if(e.target.className === 'close-button'){
        e.target.parentNode.remove();
        document.querySelector('.popup-overlay').remove()
    }
})


// Select All Liks
const allLinks = document.querySelectorAll('.links a')
const bullets = document.querySelectorAll('.nav-bullets .bullet')

function scrollToSomething(elements){

    elements.forEach(ele => {
        
        ele.addEventListener('click',(e) => {
            
            e.preventDefault()
            
            document.querySelector(e.target.dataset.section).scrollIntoView({
            
                behavior : 'smooth'
            
            })
        })
    });
}

scrollToSomething(allLinks)
scrollToSomething(bullets)

// Handle Active State
function handleActive(ev){
    ev.target.parentElement.querySelectorAll('.active').forEach(element => {
                    
        element.classList.remove('active')
    })
                ev.target.classList.add('active')
}

// Reset Button
document.querySelector(".reset-option").onclick = function() {

    localStorage.removeItem('color_option')
    localStorage.removeItem('background_option')
    window.location.reload()
}

// Toggle menu
let toggleBtn = document.querySelector('.toggle-menu')
let tLinks = document.querySelector('.links')

toggleBtn.onclick = function(){
    //Stop Propagation
    this.classList.toggle('menu-active');

    tLinks.classList.toggle('open')
    
    // e.stopPropagation()
}


//  Click Anywhere Outside Menu and Toggle Btn
document.addEventListener('click', (e) => {

    if(e.target != toggleBtn ){

        // Check If Menu Is Open
        if(tLinks.classList.contains('open')){

        toggleBtn.classList.toggle('menu-active');

        tLinks.classList.toggle('open')
        // }
        }
    }
}
)

// Stop Propagation On Menu
    // tLinks.onclick = function(){
    //     e.stopPropagation()
    // }