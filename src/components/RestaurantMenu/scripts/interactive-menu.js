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

  // TODO: As of right now, `menuInit()` runs on load, but the whole page gets read after it. Maybe I can solve it by starting off polite and turning rude. No dice. I have to find out how to stop the reader when I want it to stop.

  var menuInit = () => {
    const menu = document.getElementById("i-menu")
    const contents = document.getElementById("i-menu_contents")
    console.log("Binding actions.")
    menu.setAttribute('onswipeleft', '(e) => interactiveMenu().menuNext()')
    menu.setAttribute('onswiperight', '(e) => interactiveMenu().menuNext()')
    // menu.addEventListener('swipeleft', (e) => eval("interactiveMenu().menuNext()"));
    // menu.addEventListener('swiperight', (e) => eval("interactiveMenu().menuPrev()"));

    // Reset active status on all categories and items.
    var cats = document.getElementsByClassName('category')
    for (var cat of cats) {
      cat.classList.remove('active-item')
    }
    var items = document.getElementsByClassName('item')
    for (var item of items) {
      item.classList.remove('active-item')
    }

    // Activate the help element and ensure that the menu makes noise.
    menu.setAttribute('aria-activedescendant', 'i-menu_help')

    // I think I need to write a `MutationObserver` so that I can cue the reading off of the `aria-live` value changing.
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

    // var observer = new MutationObserver( (records, observer) => {
    //   for (let record of records) {
    //     console.log("Logging mutation record.")
    //     console.log(record.attributeName)
    //     console.log(record.target)
    //     console.log(record.target.getAttribute('aria-live'))
    //     if (record.attributeName == "aria-live" &&
    //         record.target.getAttribute('aria-live') == 'assertive') {
    //       eval("interactiveMenu().menuRead()")
    //     }
    //   }
    // })

    // That's kind of a crude observer, but I feel like I can refactor it later once how I know how everything should work.

    // Even with the observer, I'm having difficulties getting the help text to queue up behind the page content. Maybe a different tactic is called for. Perhaps I should have the help text be outside the `aria-hidden="true"` element and remove it when the menu is activated.

    // observer.observe(menu, {attributes: true})

    // menu.setAttribute('aria-live', 'assertive')
    // menu.setAttribute('aria-live', 'rude')

    // Activate navigation buttons. To be removed?
    document.getElementById("btn-menuInit")
      .setAttribute('onclick', 'interactiveMenu().menuInit()')
    document.getElementById("btn-menuRead")
      .setAttribute('onclick', 'interactiveMenu().menuRead()')
    document.getElementById("btn-menuPrev")
      .setAttribute('onclick', 'interactiveMenu().menuPrev()')
    document.getElementById("btn-menuNext")
      .setAttribute('onclick', 'interactiveMenu().menuNext()')
  }
  var menuHelp = () => {
    console.log("Activating the help dialog.")
  }

  var menuRead = () => {
    const menu = document.getElementById("i-menu")
    var focus = menu.getAttribute('aria-activedescendant')
    var currentItem = document.getElementById(focus)
    
    // Force the menu to be assertive.
    const contents = document.getElementById("i-menu_contents")
    contents.setAttribute('aria-live', 'rude')
    contents.setAttribute('aria-hidden', 'false')

    console.log(currentItem)
    currentItem.innerHTML = currentItem.innerHTML
  }
  var menuNact = (evt) => {
    // When an item is clicked on, it will be made active and read. If the item is already active, its marked status should be toggled.
    const menu = document.getElementById("i-menu")
    var oldFocus = menu.getAttribute('aria-activedescendant')
    var newFocus = evt.target.id

    var oldItem = document.getElementById(oldFocus)
    var newItem = document.getElementById(newFocus)

    // Change `aria-activedescendant` to the next item.
    menu.setAttribute('aria-activedescendant', newFocus)
    oldItem.classList.remove('active-item')
    newItem.classList.add('active-item')

    // TODO: Toggle marked status if the item was already active.

    eval("interactiveMenu().menuRead()")
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

    // Force the menu to be assertive.
    const contents = document.getElementById("i-menu_contents")
    contents.setAttribute('aria-live', 'rude')

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

    // Force the menu to be assertive.
    const contents = document.getElementById("i-menu_contents")
    contents.setAttribute('aria-live', 'rude')

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
