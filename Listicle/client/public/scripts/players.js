const renderPlayers = async () => 
{
    const response = await fetch('/players')
    const data = await response.json()
    const mainContent = document.getElementById('main-content')

    if (data) 
    {
        data.map(player => {
            const card = document.createElement('div')
            card.classList.add('card')

            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')

            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')

            // On each card, we will see the players image, name, age and current teams
            topContainer.style.backgroundImage = `url(${player.image})`

            const name = document.createElement('h3')
            name.textContent = player.name
            bottomContainer.appendChild(name)

            const age = document.createElement('p')
            age.textContent = 'Age: ' + player.age
            bottomContainer.appendChild(age)

            const teams = document.createElement('p')
            teams.textContent = player.team.join(', ')
            bottomContainer.appendChild(teams)

            // Read more link so we can learn more about said player
            const link = document.createElement('a')
            link.textContent = 'Read More >'
            link.setAttribute('role', 'button')
            link.href = `/players/${player.id}`
            bottomContainer.appendChild(link)

            card.appendChild(topContainer)
            card.appendChild(bottomContainer)

            mainContent.appendChild(card)


        })
    }
    else 
    {
        const message = document.createElement('h2')
        message.textContent = 'No Players Available 😞'
        mainContent.appendChild(message)
    }
}

const renderPlayer = async () =>
{
    const requestedID = parseInt(window.location.href.split('/').pop())
    const response = await fetch('/players')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')

    let player

    if (data) 
    {
        player = data.find(player => player.id === requestedID)
        if (player) 
        {
            // Image, name, and description are all rendered onto the card
            document.getElementById('image').src = player.image
            document.getElementById('image').alt = player.name
            document.getElementById('name').textContent = player.name
            document.getElementById('description').textContent = player.description

            const calledUp = document.getElementById('calledUp')
            if (player.calledUpForWorldCup) 
            {
                calledUp.textContent = 'Will make an appearance at the 2026 FIFA World Cup'
            } 
            else if (player.name === 'Sergio Ramos') 
            {
                calledUp.textContent = 'Will miss the FIFA World Cup 2026 since he is currently retired from international football'
            }
            else
            {
                calledUp.textContent = 'Will miss the FIFA World Cup 2026 since their country failed to qualify'
            }
            document.title = player.name
        }
        else
        {
            // valid URL shape, but no player with that id -> 404
            window.location.href = '/404.html'
        }
    }
    else
    {
        const message = document.createElement('h2')
        message.textContent = 'No Players Available 😞'
        mainContent.appendChild(message)
    }
}

// Pick which render function to run based on the URL.
// Detail pages look like /players/3 ; the homepage is / .
if (/^\/players\/\d+$/.test(window.location.pathname))
{
    renderPlayer()
}
else
{
    renderPlayers()
}