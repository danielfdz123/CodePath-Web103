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

            topContainer.style.backgroundImage = `url(${player.image})`

            const name = document.createElement('h3')
            name.textContent = player.name
            bottomContainer.appendChild(name)

            const position = document.createElement('p')
            position.textContent = 'Position: ' + player.position
            bottomContainer.appendChild(position)

            const teams = document.createElement('p')
            teams.textContent = 'Teams: ' + player.team.join(', ')
            bottomContainer.appendChild(teams)


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
            document.getElementById('image').src = player.image
            document.getElementById('image').alt = player.name
            document.getElementById('name').textContent = player.name
            document.getElementById('position').textContent = 'Position: ' + player.position
            document.getElementById('team').textContent = 'Current Teams: ' + player.team.join(', ')

            const calledUp = document.getElementById('calledUp')
            if (player.calledUpForWorldCup) 
            {
                calledUp.textContent = '✅ Called up for the FIFA World Cup 2026'
            } 
            else if (player.name === 'Sergio Ramos') 
            {
                calledUp.textContent = '❌ Retired from international football'
            }
            else
            {
                calledUp.textContent = '❌ Country failed to qualify'
            }
            document.title = player.name
        } 
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Players Available 😞'
        mainContent.appendChild(message)
    }
}

if (requestedUrl) 
{
  window.location.href = '../404.html'
}
else 
{
    renderPlayers()
}

renderPlayer()