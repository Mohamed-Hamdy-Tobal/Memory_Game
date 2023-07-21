// The Time Count Down
let time = document.querySelector(".info-container .time span")
let myTime = time.innerHTML,
    stopTime = 0

// Make the prompt for user when start the game
document.querySelector(".control-buttons span").onclick = function () {
    document.querySelector(".control-buttons .input").style.transform = "translateX(-50%) translateY(0)";

    // Get the name entered by the user
    let username = document.querySelector(".control-buttons .input .save input");
    let button = document.querySelector(".control-buttons .input .save button");

    button.onclick = function () {
        console.log(username.value);
        if (username.value.length < 1) {
            document.querySelector(".name span").innerHTML = "Unknown"
        } else {
            document.querySelector(".name span").innerHTML = username.value
        }
        // Make Rotation Ot The Background
        document.querySelector(".control-buttons").style.cssText = "transform: scale(0) rotate(360deg);"

        // After Effect, delete it from the page
        setTimeout(() => {
            document.querySelector(".control-buttons").remove()
        }, 2000)

        function countDown() {
            myTime -= 1
            let formNumber = (myTime < 10 ? "0":"") + myTime
            time.innerHTML = formNumber
            if (stopTime > 0) {
                formNumber = stopTime
            }
            if (formNumber == "00" | stopTime > 0) {
                clearInterval(counter)

                endGame()
                document.querySelector(".control-end").style.cssText = "transform: translate(-50%, -50%);"
                // To Game Over 
                if (formNumber == "00") {
                    document.getElementById("game_over").play()
                } else if (stopTime > 0) {
                    document.getElementById("win").play()
                    document.querySelector(".control-end > span").innerHTML = "Congratulation"
                }
            }


        }
        let counter = setInterval(countDown, 1000)
    };
};


// ----------------------------

// The Duration Of Flipped Card
let duration = 1000;

// The Main Block Container
let blocksContainer = document.querySelector(".memory-game-blocks")

// Array Of Children Blocks
let blocks = Array.from(blocksContainer.children)

// The Range Of Cards From The Keys
let orderRange = [...Array(blocks.length).keys()]

// console.log(orderRange)
shuffle(orderRange)
// console.log(orderRange)



// Add Order Css Property To Game Blocks, The Main Loop
blocks.forEach((block, index) => {

    // Add Css Order Property
    block.style.order = orderRange[index]

    block.addEventListener("click", function() {
        flipBlock(block)
    })

    if (block.classList.contains("has-matched")) {
        console.log("Mohamed")
    }
});



// The Flipped Function
function flipBlock(selectedBlock) {

    // Add Class => is-flipped
    selectedBlock.classList.add("is-flipped")

    // Collect All Flipped Blocks
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    if (allFlippedBlocks.length == 2) {
        console.log("Two Flipped Cards")

        // Stop Clicking Funcions
        stopClicking();

        // Check Matched Block
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
    }
}

// To Stop Click To Other Cards
function stopClicking() {

    // Add Class no-clicking 
    blocksContainer.classList.add("no-clicking")

    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking")
    },duration)
}

// Function Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {

    // The Tries Of The Game
    let triesElements = document.querySelector(".tries span")

    // Check if two cards are the same
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        // Make Two Cards are matched, by remove the flipped class to add it to another
        // but add a new class that ensure they are flipped
        firstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")

        // To Make Two Card Still Matched
        firstBlock.classList.add("has-matched")
        secondBlock.classList.add("has-matched")

        // To Make A Sound When We Win
        document.getElementById("success").play();


    } else {
        // increase tries by 1
        triesElements.innerHTML = parseInt(triesElements.innerHTML) + 1


        setTimeout(() => {
            firstBlock.classList.remove("is-flipped")
            secondBlock.classList.remove("is-flipped")
        }, duration)

        // To Make A Sound When We lose
        document.getElementById("fail").play()
    }

    const allBlocksHaveMatchedClass = blocks.every((myblock) => myblock.classList.contains("has-matched"));

    if (allBlocksHaveMatchedClass) {
        console.log("true");
        stopTime = myTime
        console.log(stopTime)
    } else {
        console.log("false");
    }


}


// Shuffle Function
function shuffle(array) {
    
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current)

        // Decrease The Length By 1
        current--;

        // [1] Save Current Element in the stash
        temp = array[current]

        // [2] Current ELement = Random Element
        array[current] = array[random]

        // [3] Random ELement = Get Element From Stash
        array[random] = temp
    }
    return array
}


// -------------------------------


function endGame() {



    // Create button try
    let tryAgain = document.querySelector(".end-o .try")
    
    tryAgain.addEventListener("click", function() {
        setTimeout(function() {
            location.reload()
        }, 2000)
    })


    // Create button cancel
    let cancel = document.querySelector(".end-o .cancel")
        
    cancel.addEventListener("click", function() {
        setTimeout(function() {
            window.close()
        }, 2000)
    })
}