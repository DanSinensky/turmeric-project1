// variable for base url
const baseURL = "https://deckofcardsapi.com/"

const draw = (deckID) => {
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

        const deckID = data.deck_id
        draw(deckID)
        const $cards_remaining = data.remaining
        $left.html()
        $main.html(
            `<h2>${deckID}</h2>
            <h3>${$cards_remaining}</h3>
            <div class="board">
                <div id="deck"></div>
            <button>Draw</button>
            </div>`)
        },
        (error) => {
            console.log('bad request', error)
        }
    )
}

newGame()

const promise1 = new Promise((resolve, reject) => {
    resolve('Success!');
  });
  
  promise1.then((value) => {
    console.log(value);
    // expected output: "Success!"
  });


// shuffle cards remaining in deck
// function shuffle($deck_id){
//     const shuffleURL = `${baseURL}api/deck/${deckID}/shuffle/?remaining=true`
// }

const $button = document.querySelector("button")
$($button).on("click", draw())