// `window.matchMedia()` has the same syntax as CSS media queries.
// Source: https://www.sitepoint.com/javascript-media-queries/
// if (matchMedia) {
//   const mq = window.matchMedia("(min-width: 500px)");
//   mq.addListener(WidthChange);
//   WidthChange(mq);
// }
//
// // media query change
// function WidthChange(mq) {
//   if (mq.matches) {
//     // window width is at least 500px
//   } else {
//     // window width is less than 500px
//   }
//
// }
var menuItems = []
var interactiveMenu

interactiveMenu = () => {
  // This script shouldn't need to remember anything about the menu, since all the important information is either in the page DOM already as an element or is in `var menuItems`. If I do want to save any information (like which items are marked), I should preserve it /on/ the elements of the page, such as in class names and HTML attributes.

  var menuInit = () => {
    const menu = document.getElementById("i-menu")
    menu.setAttribute('onswipeleft', '(e) => interactiveMenu().menuNext()')
    menu.setAttribute('onswiperight', '(e) => interactiveMenu().menuNext()')
    // menu.addEventListener('swipeleft', (e) => eval("interactiveMenu().menuNext()"));
    // menu.addEventListener('swiperight', (e) => eval("interactiveMenu().menuPrev()"));
  }
  var menuHelp = () => {
    console.log("Activating the help dialog.")
  }

  var menuRead = () => {
    const menu = document.getElementById("i-menu")
    var focus = menu.getAttribute('aria-activedescendant')
    var currentItem = document.getElementById(focus)

    console.log("Re-rendering.")
    currentItem.innerHTML = currentItem.innerHTML
  }

  var menuNext = () => {
    // Get the menu element and identify the `aria-activedescendant`.
    const menu = document.getElementById("i-menu")
    var oldFocus = menu.getAttribute('aria-activedescendant')
    var newFocus

    if (!oldFocus)
      newFocus = oldFocus = menuItems[0]
    else {
      if (menuItems.indexOf(oldFocus) + 1 < menuItems.length)
        newFocus = menuItems[menuItems.indexOf(oldFocus) + 1]
      else
        newFocus = menuItems[0]
    }

    var oldItem = document.getElementById(oldFocus)
    var newItem = document.getElementById(newFocus)

    // Change `aria-activedescendant` to the next item.
    menu.setAttribute('aria-activedescendant', newFocus)
    oldItem.classList.remove('active-item')
    newItem.classList.add('active-item')

    eval("interactiveMenu().menuRead()")
  }
  var menuPrev = () => {
    // Get the menu element and identify the `aria-activedescendant`.
    const menu = document.getElementById("i-menu")
    var oldFocus = menu.getAttribute('aria-activedescendant')
    var newFocus

    if (!oldFocus)
      newFocus = oldFocus = menuItems[menuItems.length - 1]
    else {
      if (menuItems.indexOf(oldFocus) > 0)
        newFocus = menuItems[menuItems.indexOf(oldFocus) - 1]
      else
        newFocus = menuItems[menuItems.length - 1]
    }

    var oldItem = document.getElementById(oldFocus)
    var newItem = document.getElementById(newFocus)

    // Change `aria-activedescendant` to the next item.
    menu.setAttribute('aria-activedescendant', newFocus)
    oldItem.classList.remove('active-item')
    newItem.classList.add('active-item')

    eval("interactiveMenu().menuRead()")
  }
  var menuBack = () => {
    console.log("Returning to the previous view or exiting the menu.")
  }

  var menuMark = () => {
    console.log("Mark or unmark the current item.")
  }
  var menuView = () => {
    console.log("Toggle to switch between all items and marked items.")
  }

  return {
    menuInit: menuInit,
    menuRead: menuRead,
    menuHelp: menuHelp,
    menuNext: menuNext,
    menuPrev: menuPrev,
    menuBack: menuBack,
    menuMark: menuMark,
    menuView: menuView,
  }
}

export default interactiveMenu
