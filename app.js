// variable for base url
const baseURL = "https://deckofcardsapi.com/"


// draw a card
function draw(deck_id){
    const drawURL = `${baseURL}api/deck/${deck_id}/draw/count=1`
}

// shuffle cards remaining in deck
function shuffle(deck_id){
    const shuffleURL = `${baseURL}api/deck/${deck_id}/shuffle/?remaining=true`
}

// 
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
        const $deck_id = deck.deck_id
        const $cards_remaining = deck.remaining
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

        $main.html(
            `<h2>${$deck_id}</h2>
            <h3>${$cards_remaining}`)

        
//Working draw on start
            // function draw(deck) {
            //     $.ajax(`${baseURL}api/deck/${deck}/draw/?count=1`)
            //     .then((data) => {
            //         console.log(data.cards)
            //     })
                
            }
}



newGame()

const $button = document.querySelector("button")
$($button).on("click", draw($deck_id))

// $("input[type=submit]").on("click", (event) => {

//     // prevent the refresh
//     event.preventDefault()

//     // grab text from input box
//     const $inputText = $("input[type=text]").val()
//     const $textInput = $("input[type=text]")
//     // update the screen
//     weatherSearch($inputText)
//     $textInput.val("")
// })