let solidDeck
let solidCards

// variable for base url
const baseURL = "https://deckofcardsapi.com/"

// CREATES OBJECT FOR DRAWN CARD(S) (count=1) FROM THE DECK
// WITH deck_id PASSED INTO deckID PARAMETER
function draw(deckID){
    const drawURL = `${baseURL}api/deck/${deckID}/draw/?count=1`
    $.ajax(drawURL)
    .then((data) => {
        const drawn = data.cards
        console.log(drawn)
        },
        (error) => {
            console.log('bad request', error)
        }
    )
}




// function that creates game
function newGame(){
    // constructing url for request
    // THIS URL CREATES DECK WITH NEW deck_id IN data
    const newGameURL = `${baseURL}api/deck/new/shuffle/?deck_count=1`
    
    // make AJAX request 
    $.ajax(newGameURL)
    .then((data) => {
        console.log(data)
        const $header = $("header")
        const $left = $(".left")
        const $main = $("main")
        const $footer = $("footer")
        const $deck = $(".deck")
        //CAPTURE data.deck_ID AS VARIABLE deckID INSIDE SCOPING
        const deckID = data.deck_id
        //deckID ARGUMENT IS SCOPED LOCALLY, PASSED INTO PARAMETER OUTSIDE OF AJAX CALL
        draw(deckID)
        const $cards_remaining = data.remaining
        $header.html(
            `<h1 class="header">Card Table Simulator</h1>
            <h2>${deckID}</h2>
            <h3>${$cards_remaining}</h3>`
        )
        $left.html()
        // CALLS WITHOUT BEING CLICKED
        $($deck).on("click", draw(deckID))
        },
        (error) => {
            console.log('bad request', error)
        }
    )
}

// RUN newGame()
newGame()

// DECK CLICK DOES NOT WORK (Uncaught ReferenceError: deckID is not defined)
//         CAN'T GET SCOPING OF deckID TO TRACK HERE
        const $button = document.querySelector("button")
        $($button).on("click", draw(deckID))


// NOT USING THIS FUNCTION YET, JUST HAVE IT FOR REFERENCE
// shuffle cards remaining in deck
// function shuffle($deck_id){
//     const shuffleURL = `${baseURL}api/deck/${deckID}/shuffle/?remaining=true`
// }