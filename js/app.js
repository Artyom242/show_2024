let playerName = '';
let clickSuccess = 0;
let battery = 30;
let isPaused = false;
let modalClose = $(".modal-lose"); 

// Start

function checkInput() {
    const username = $("#username").val();
    const startButton = $("#start");   
    startButton.attr('disabled', !username.trim() ); 
    return username.trim() ? true : false;
}

function startGame(e) {
    e.preventDefault();

    if (checkInput()) {
        hideModal( $("#startForm")); 
        playerName = $("#username").val();
        
        $('#name_pole').text(playerName);
        $("#time_pole").text(battery);

        showSnowflake();
        gameInterval = setInterval(updateBattery, 1000);
    }
}

// ------ Game

function updateBattery(){
    battery--;
    $("#time_pole").text(battery);

    if(battery == 0){
        endGame();
    }
}

function getRandomPosition(element) {
    var containerWidth = $(".container").width();
    var containerHeight = $(".container").height();
    var elementWidth = element.width();
    var elementHeight = element.height();    
    
    var left = Math.floor(Math.random() * (containerWidth - elementWidth));
    var top = Math.floor(Math.random() * (containerHeight - elementHeight));
    
    return { left: left, top: top };
}

function showSnowflake() {
    var snowflake = $('#player');
    var newPosition = getRandomPosition(snowflake);
    
    snowflake.animate({ opacity: 0 }, 100, function() {
        snowflake.css({ top: newPosition.top + 'px', left: newPosition.left + 'px' });
        snowflake.animate({ opacity: 1 }, 100);
    });
}

$('#player').on('click', function() {
    clickSuccess++;
    showSnowflake();
});

// ------- End / Restart

function endGame(){
    clearInterval(gameInterval)
    showModal(modalClose);
        $(".modal-lose").css("display", "flex");
        $(".modal-lose .final-time").text(`${playerName}, ты собрал ${clickSuccess} снежинок!`);
}

function restartGame() {
    hideModal(modalClose);

    setTimeout(() => {
    clickSuccess = 0;
    battery = 31;
    $(".modal-lose").css("display", "none");

    gameInterval = setInterval(updateBattery, 1000);
    },500);
}

// -----Modal

function hideModal(modal) {
    modal.css("transition", "all 0.5s ease");
    modal.css("opacity", 0);
    modal.css('transform', "scale(0.9)");
    modal.css('display', "none");
}

function showModal(modal){
    modal.css("display", "block");
    modal.css("opacity", "0"); 
    modal.css("transform", "scale(0.9)"); 

    requestAnimationFrame(() => {
        modal.css("transition", "all 0.5s ease");
        modal.css("opacity", 1); 
        modal.css("transform", "scale(1)" ); 
    });
}