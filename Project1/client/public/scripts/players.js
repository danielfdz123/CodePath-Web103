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
        message.textContent = 'No Gifts Available 😞'
        mainContent.appendChild(message)
    }
}

const renderPlayer = async (id) =>
{
    const requestedID = parseInt(window.location.href.split('/').pop())

    const response = await fetch('/gifts')
    const data = await response.json()

    const playerDetails = document.getElementById('gift-content')
    let details
    
    if (data)
    {
        details = data.find(gift => gift.id === requestedID)
        if(details)
        {
            document.getElementById('image').src = gift.image
            document.getElementById('name').textContent = gift.name
            document.getElementById('submittedBy').textContent = 'Submitted by: ' + gift.submittedBy
            document.getElementById('pricePoint').textContent = 'Price: ' + gift.pricePoint
            document.getElementById('audience').textContent = 'Great For: ' + gift.audience
            document.getElementById('description').textContent = gift.description
            document.title = `UnEarthed - ${gift.name}`
        }
        else
        {
            const message = document.createElement('h2')
            message.textContent = 'No Gifts Available 😞'
            playerDetails.appendChild(message)
        }
    }


}

renderPlayers()
renderGift()