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
const headerElem = document.getElementsByClassName('page__header')[0];
let fragment = document.createDocumentFragment();
let dataAttrVal;
const goUp = document.getElementsByClassName('arrowUp')[0];
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */


    function removeActive(){
        sections.forEach(function(element){
            element.classList.remove('your-active-class')
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
    li.setAttribute('id', dataAttrVal.split(" ")[0].toLowerCase()+dataAttrVal.split(" ")[1]);
    li.classList.add('menu__link');
    fragment.appendChild(li);
})

navUl.appendChild(fragment)
// Add class 'active' to section when near top of viewport
function ActiveClass(){
    sections.forEach(function(elem){
        if(elem.getBoundingClientRect().top <= elem.getBoundingClientRect().height / 2 && elem.getBoundingClientRect().bottom > elem.getBoundingClientRect().height / 2){
            removeActive();
            elem.classList.add('your-active-class');
        }
    })}

// Scroll to anchor ID using scrollTO event
scrollToSection();

// Hide fixed navigation bar while not scrolling 
let hideNavbar;

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
            if(section.getAttribute('id') === e.target.getAttribute("id")){
                scrollTo({left: 0, top: section.offsetTop, behavior :'smooth'});
            }
        })
    })
}
// Set sections as active
document.addEventListener('scroll', ActiveClass);
//scroll to top
document.addEventListener('scroll', scrollToTop)

goUp.addEventListener('click', function(){
    scrollTo({left: 0, top: 0, behavior: 'smooth'})
})