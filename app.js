// variable for base url
const baseURL = "https://deckofcardsapi.com/"

// 
// function that creates game
function newGame(){
    // constructing url for request
    const newGameURL = `${baseURL}api/deck/crsk1qux59kc/shuffle/?deck_count=1`
    
    // make AJAX request
    $.ajax(newGameURL)

    const request = fetch(newGameURL)
    
    request.then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        deck = data
        render(deck)
        },
        (error) => {
            console.log('bad request', error)
        }

    )
    
    function render(deck) {

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

        
//Working draw on start
            // function draw(deck) {
            //     $.ajax(`${baseURL}api/deck/${deck}/draw/?count=1`)
            //     .then((data) => {
            //         console.log(data.cards)
            //     })
            // draw a card
            return $deck_id
            }

}



newGame()

function draw($deck_id){
    const drawURL = `${baseURL}api/deck/${$deck_id}/draw/count=1`
    $.ajax(drawURL)
    const request = fetch(drawURL)
    
    request.then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        cards = data
        console.log(cards.cards)
        },
        (error) => {
            console.log('bad request', error)
        }
    )
}
draw($deck_id)
// shuffle cards remaining in deck
// function shuffle($deck_id){
//     const shuffleURL = `${baseURL}api/deck/${$deck_id}/shuffle/?remaining=true`
// }

const $button = document.querySelector("button")
$($button).on("click", draw($deck_id))