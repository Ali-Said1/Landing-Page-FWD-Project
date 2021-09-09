/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const sections = document.querySelectorAll('section');
const navUl = document.getElementById('navbar__list');
let navbarListItems = [];
const headerElem = document.getElementsByClassName('page__header')[0];
let fragment = document.createDocumentFragment();
let dataAttrVal;
const goUp = document.getElementsByClassName('arrowUp')[0];
let hideNavbar;
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */


    function removeActiveFormSections(){
        sections.forEach(function(element){
            element.classList.remove('your-active-class')
        });
    };
    function removeActiveFromListItems(){
        navbarListItems.forEach(function(liElem){
            liElem.classList.remove('active')
        });
    };

    
    /**
     * End Helper Functions
     * Begin Main Functions
     * 
     */


// build the nav
sections.forEach(function(section){
    const li = document.createElement("li");
    dataAttrVal = section.getAttribute('data-nav');
    li.innerHTML = dataAttrVal;
    li.classList.add(dataAttrVal.split(" ")[0].toLowerCase()+dataAttrVal.split(" ")[1]);
    li.classList.add('menu__link');
    fragment.appendChild(li);
    fragment.firstElementChild.classList.add('active');
    navbarListItems.push(li);
})

navUl.appendChild(fragment)
// Add class 'active' to section when near top of viewport
function addActiveClassToSections(){
    sections.forEach(function(elem){
        if(elem.getBoundingClientRect().top <= elem.getBoundingClientRect().height / 2 && elem.getBoundingClientRect().bottom > elem.getBoundingClientRect().height / 2){
            removeActiveFormSections();
            elem.classList.add('your-active-class');
        }
    })}


    // Add class 'active' to corresponding navbar item when section near top of viewport
    function addActiveClassToNavbar(){
        navbarListItems.forEach(function(liElem){
            sections.forEach(function(section){
                // checks if the navber list item class list contains the section id
                if(liElem.classList.contains(section.getAttribute('id')) && section.classList.contains('your-active-class')){
                    removeActiveFromListItems();
                    liElem.classList.add('active');
                };
                });
        });
    };

// Scroll to anchor ID using scrollTO event
scrollToSection();

// Hide fixed navigation bar while not scrolling 

document.addEventListener('scroll', function(){
    clearTimeout(hideNavbar)
    hideNavbar = setTimeout(function(){
        headerElem.style.top = "-100px";
    }, 5000);
    if(headerElem.style.top = "-100px"){
        headerElem.style.top = "0";
    }
});

// scroll To Top
function scrollToTop(){
    if(scrollY >= 400){
        goUp.style.right = '20px';
    }else{
        goUp.style.right = '-100px';
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
function scrollToSection(){
    navUl.addEventListener('click', function(e){
        sections.forEach(function(section){
            if(e.target.classList.contains(section.getAttribute('id'))){
                scrollTo({left: 0, top: section.offsetTop, behavior :'smooth'});
            }
        })
    })
}
// Set sections as active
document.addEventListener('scroll', addActiveClassToSections);

// Set navbar list items as active
document.addEventListener('scroll', addActiveClassToNavbar)
//scroll to top
document.addEventListener('scroll', scrollToTop)

goUp.addEventListener('click', function(){
    scrollTo({left: 0, top: 0, behavior: 'smooth'})
})