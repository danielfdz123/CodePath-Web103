const header = document.querySelector('header')

const headerContainer = document.createElement('div')
headerContainer.className = 'header-container'

const headerLeft = document.createElement('div')
headerLeft.className = 'header-left'

const headerRight = document.createElement('div')
headerRight.className = 'header-right'

const headerLogo = document.createElement('img')
headerLogo.src = '/logo.png'

const headerTitle = document.createElement('h1')
headerTitle.textContent = 'Soccer Players'

const headerButton = document.createElement('button')
headerButton.textContent = 'Home'


// Append all elements to the DOM
header.appendChild(headerContainer)

headerContainer.appendChild(headerLeft)

headerContainer.appendChild(headerRight)

headerLeft.appendChild(headerLogo)

headerLeft.appendChild(headerTitle)

    
headerButton.addEventListener('click', function handleClick(event) {
  window.location = '/'
})

headerRight.appendChild(headerButton)




