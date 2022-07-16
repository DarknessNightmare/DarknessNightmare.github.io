
const randomColor = () => {
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    return 'rgb(' + r + ',' + g +',' + b + ')'
}

const randomX = () =>{
    // minus balloon width to make sure balloon always within viewport
    let left = Math.floor(Math.random() * $(window).innerWidth() - 100)
    if ( left < 0){
        left = 0
    }
    return `${left}px`
}

// move balloon at random speed
const randomSpeed = () => {
    let speed = Math.floor(Math.random() * 6)    
    if (speed < 3){
        return 3000
    }
    return speed * 1000
}

// when game start, create new balloon every second
const startGame = () => {
    let second = 30
    $("#start").remove()
    let timer = setInterval(function() {
        $("#timer").text(second);;
        if (second === 0){
            clearInterval(timer)
            $("#board").append(`<div id="restart" class="button" onClick="restart()">Play again</div>`)
        } else {
            createBalloon()
            second--
        }
    }, 1000);
};

// remove the balloon element when onclick
// add event listener
$('#container').on('click', '.balloon', function(e) {
    $(e.target).remove()
    // onclick score increased by 1
    $('#score').text(parseInt($('#score').text())+1)
})

// use function to create new balloon
const createBalloon = () => {
    let newBalloon = document.createElement('div')
    $(newBalloon).addClass('balloon')
    $(newBalloon).html(`
        <span class="top-c"></span>
        <span class="left-c"></span>
    `)
    // get the balloon element then move it to the bottom of the page
    // set the starting point, show balloon at random x position
    $(newBalloon).css({bottom: '-130px', left: randomX(), backgroundColor:randomColor()}) // minus the height of balloon
    $(newBalloon).animate({bottom:'110vh'}, randomSpeed())
    $('#container').append(newBalloon)
}

const restart = () => {
    $("#container").html("")
    $("#score").text(0)
    $("#restart").remove()
    startGame()
};