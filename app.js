let solidDeck
let solidCards
let deckID
const drawnCards = []

const $header = $("header")
const $left = $(".left")
const $main = $("main")
const $footer = $("footer")
const $deck = $(".deck")
let $remaining

// variable for base url
const baseURL = "https://deckofcardsapi.com/"

// function that creates game
function newGame(){
    // constructing url for request
    // THIS URL CREATES DECK WITH NEW deck_id IN data
    const newGameURL = `${baseURL}api/deck/new/shuffle/?deck_count=1`
    
    // make AJAX request 
    $.ajax(newGameURL)
    .then((data) => {
        console.log(data)
        //CAPTURE data.deck_ID AS VARIABLE deckID INSIDE SCOPING
        deckID = data.deck_id
        //deckID ARGUMENT IS SCOPED LOCALLY, PASSED INTO PARAMETER OUTSIDE OF AJAX CALL
        //draw(deckID)
        const cards_remaining = data.remaining
        $header.html(
            `<h1 class="header">Card Table Simulator</h1>
            <h2>${deckID}</h2>
            <h3 class="cards_remaining">${cards_remaining}</h3>`
        )
        $left.html()
        },
        (error) => {
            console.log('bad request', error)
        }
    )
}

// RUN newGame()
newGame()

// CREATES OBJECT FOR DRAWN CARD(S) (count=1) FROM THE DECK
// WITH deck_id PASSED INTO deckID PARAMETER
        $($deck).on("click", function(){
            const drawURL = `${baseURL}api/deck/${deckID}/draw/?count=1`
            $.ajax(drawURL)
            .then((data) => {
                //Saves drawnCard data in an object
                const drawnCard = data.cards[0]
                console.log(drawnCard)
                //Pushes drawnCard object into a globally scoped arrayarray
                drawnCards.push(drawnCard)
                console.log('drawnCards',drawnCards)
                //Same variable as in newGame, but different local scope
                const cards_remaining = data.remaining
                //Update h3 of cards_remaining
                $remaining = $(".cards_remaining")
                $remaining.html(cards_remaining)
                console.log('cards_remaining',cards_remaining)
                },
                (error) => {
                    console.log('bad request', error)
                }
            )
        })

// NOT USING THIS FUNCTION YET, JUST HAVE IT FOR REFERENCE
// shuffle cards remaining in deck
// function shuffle($deck_id){
//     const shuffleURL = `${baseURL}api/deck/${deckID}/shuffle/?remaining=true`
// }