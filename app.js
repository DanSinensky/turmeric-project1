let deckID
let playerCount
const drawnCards = []
const menuButtons = ["Flip", "Select number of players", "Discard"]
const playerHands = []

class CardObject {
    constructor(code, image, value, suit, number, facedown){
        this.code = code;
        this.image = image;
        this.value = value;
        this.suit = suit
        this.number = number
        this.facedown = facedown;
    }
}

class playerHand {
    constructor(number, name, button){
        this.number = number;
        this.name = name;
        this.button = button;
    }
}

const $header = $("header")
const $left = $(".left")
const $players = $(".players")
const $main = $("main")
const $board = $(".board")
const $footer = $("footer")
const $deck = $(".deck")
const $menu = $(".button")
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
        console.log('newGame data',data)
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
        },
        (error) => {
            console.log('bad request', error)
        }
    )
}

// RUN newGame()
newGame()

$($players).on("submit", function(event){
    event.preventDefault()
    playerCount = playerCounter.selectedIndex
    menuButtons.splice(1,1)
    for (let i = 1; i < playerCount+1; i += 1){
        const player = new playerHand(i, `Player ${i}`, `To Player ${i} Hand`)
        playerHands.push(player)
        menuButtons.splice(i,0,player.button)
    }
    console.log(playerHands)
    $left.html(
        `<form class="card-back">
        <input type="text" placeholder="Paste link here"></br>
        <input type="submit" value="Save">
    </form>
    <form class="save-game">
        <input type="text" placeholder="Name game"></br>
        <input type="submit" value="Save">
    </form>`    
    )
})

// CREATES OBJECT FOR DRAWN CARD(S) (count=1) FROM THE DECK
// WITH deck_id PASSED INTO deckID PARAMETER
        $($deck).on("click", function(){
            const drawURL = `${baseURL}api/deck/${deckID}/draw/?count=1`
            $.ajax(drawURL)
            .then((data) => {
                //Saves drawnCard data in an object
                const drawnCard = new CardObject(data.cards[0].code, data.cards[0].image,
                    data.cards[0].value, data.cards[0].suit, drawnCards.length, false)
                console.log('drawnCard',drawnCard)
                //Pushes drawnCard object into a globally scoped arrayarray
                drawnCards.push(drawnCard)
                console.log('drawnCard',drawnCards[drawnCards.length-1])
                console.log('drawnCards',drawnCards)
                //Same variable as in newGame, but different local scope
                const cards_remaining = data.remaining
                //Update h3 of cards_remaining
                $remaining = $(".cards_remaining")
                $remaining.html(cards_remaining)
                console.log('cards_remaining',cards_remaining)

                const $card = $("<img>").addClass(`card`)
                $card.attr("id", data.cards[0].code)
                $card.attr("src", data.cards[0].image)
                $board.append($card)

                
                const $cardmenu = $("<ul>").addClass("button menu")
                $($card).on('click', function(){
                    $(".button").remove()
                    //$(this).toggleClass("menu")
                    var classes = ($(this).attr('class') === "card")
                        ? "card menu"
                        : "card";
                    $(this).attr('class', classes);

                        $cardmenu.attr("id", `${data.cards[0].code} button menu`)
                        for (let menuButton of menuButtons) {
                            const $button = $("<li>").addClass("button")
                            $button.attr('id', `${menuButton}`)
                            $button.text(menuButton)
                            console.log($button)
                            $cardmenu.append($button);
                            $button.on("click", function(event){
                                // console.log(event)
                                if (event.target.innerText === "Flip"){
                                    console.log("Flip")
                                    var src = ($card.attr('src') === `${data.cards[0].image}`)
                                        ? 'images/CardBack.jpg'
                                        : `${data.cards[0].image}`;
                                    $card.attr('src', src);
                                    $(".button").remove()
                                } else if (event.target.innerText.charAt(0) === "T"){
                                    console.log("To Player")
                                    $(".button").remove()
                                    $(".card").remove()
                                }
                                
                            })
                          }
                        $cardmenu.insertAfter($card)
                }
            );
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