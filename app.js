// variable for api key
const apiKey = "7d01835818934a4f8af21b99bad948ea"

// variable for base url
const baseURL = "https://newsapi.org/"

// variable for date

const year = new Date().getFullYear()
const month = new Date().getMonth()
const day = new Date().getDate()
const date = `${year}-${month}-${day}`

// function that does movie search
function newsSearch(topic){
    // constructing url for request
    // Basic URL for stories about a topic from the last month
    const url = `${baseURL}v2/everything?q=${topic}&from=${date}&sortby=publishedAt&apikey=${apiKey}`
    // const url = `${baseURL}v2/everything?q=${title}&from=${date}&sortby=${sort}&apikey=${apiKey}`
    
    // All articles mentioning Apple from yesterday, sorted by popular publishers first
    // https://newsapi.org/v2/everything?q=apple&from=2022-10-20&to=2022-10-20&sortBy=popularity&apiKey=API_KEY

    // All articles about Tesla from the last month, sorted by recent first
    // https://newsapi.org/v2/everything?q=tesla&from=2022-09-21&sortBy=publishedAt&apiKey=API_KEY

    // Top business articles in the US right now
    // https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=API_KEY

    // Top articles from TechCrunch right now
    // https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=API_KEY

    // All articles published by the Wall Street Journal in the last 6 months, sorted by recent first
    // https://newsapi.org/v2/everything?domains=wsj.com&apiKey=API_KEY

    $.ajax(url)
    .then((data) => {
        console.log(data)
        news = data
        //render()
        },
        (error) => {
            console.log('bad request', error)
        }
    )    


}

//grab the submit button
$("input[type=submit]").on("click", (event) => {

    // prevent the refresh
    event.preventDefault()

    // grab text from input box
    const inputText = $("input[type=text]").val()
    
    // update the screen
    newsSearch(inputText)
})

newsSearch("Tesla")