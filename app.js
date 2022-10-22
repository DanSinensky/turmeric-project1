// variable for base url
const baseURL = "https://deckofcardsapi.com/"

// function that creates game
function newGame(){
    // constructing url for request
    // Basic URL for stories about a topic from the last month
    const newGameUrl = `${baseURL}api/deck/new/shuffle/?deck_count=1`
    
    $.ajax(newGameUrl)
    .then((data) => {
        console.log(data)
        cards = data
        render()
        },
        (error) => {
            console.log('bad request', error)
        }
    )    
    function render() {

        // render the data
        const $main = $("main")
        const $footer = $("footer")

        const $deck_id = cards.deck_id
        const $cards_remaining = cards.remaining

        $main.html(
            `<h2>${$deck_id}</h2>
            <h3>${$cards_remaining}`)
    }

}


//grab the submit button
// $("input[type=submit]").on("click", (event) => {

//     // prevent the refresh
//     event.preventDefault()

//     // grab text from input box
//     const inputText = $("input[type=text]").val()
//     const $textInput = $("input[type=text]")
    
//     // update the screen
//     saveGave(inputText)
//     $textInput.val("")     
//})

newGame()