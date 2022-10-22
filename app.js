// variable for base url
const baseURL = "https://deckofcardsapi.com/"

function draw(deck) {
    $.ajax(`${baseURL}api/deck/${deck}/draw/?count=1`)
    .then((data) => {
        console.log(data.cards)
    })
}
draw($deck_id)
 
// function that creates game
function newGame(){
    // constructing url for request
    const newGameURL = `${baseURL}api/deck/new/shuffle/?deck_count=1`

    
    $.ajax(newGameURL)

    const request = fetch(newGameURL)
    
    request.then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        deck = data
        render()
        },
        (error) => {
            console.log('bad request', error)
        }
    )    
    function render() {

        // render the data
        const $header = $("header")
        const $main = $("main")
        const $footer = $("footer")
        const $deck = $(".deck")

        const $deck_id = deck.deck_id
        const $cards_remaining = deck.remaining

        $main.html(
            `<h2>${$deck_id}</h2>
            <h3>${$cards_remaining}`)
}
}

newGame()