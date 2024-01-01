document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    var lyricsInput = document.getElementById('lyrics-input');
    var lyricsTable = document.getElementById('lyrics-table');
    var lyricCells = document.querySelectorAll('#lyrics-table td');
    var completeDisplay = document.getElementById('complete');
    var failDisplay = document.getElementById('failure');
    var timerDisplay = document.getElementById('timer');
    var revealAnswersLink = document.getElementById('revealAnswers');
    var tryAgainButton = document.getElementById('try-again');

    var startTime;
    var timerInterval;

    startTimer();

    // Add input event listener to the lyrics input
    lyricsInput.addEventListener('input', function () {
        checkAnswer();
    });

    // Add key press event listener to the input for Enter key
    lyricsInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            checkAnswer();
        }
    });

    // Add click event listener to the "Reveal Answers" link
    revealAnswersLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the link from navigating
        revealAnswers();
        timerDisplay.style.display = 'none';
        failDisplay.style.display = 'block';
    });

    // Function to reveal all answers
    function revealAnswers() {
        for (var i = 0; i < lyricCells.length; i++) {
            var wordCell = lyricCells[i];
            if (!wordCell.classList.contains('active')) {
                wordCell.classList.add('active');
                wordCell.textContent = wordCell.dataset.word.toLowerCase();
            }
        }
    }

    // Function to start the timer
    function startTimer() {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 1000); // Update timer every second
    }

    // Function to stop the timer
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Function to update the timer display
    function updateTimer() {
        var currentTime = new Date().getTime();
        var elapsedTime = currentTime - startTime;
        var seconds = Math.floor(elapsedTime / 1000);
        timerDisplay.textContent = formatTime(seconds);
    }

    // Function to format time as MM:SS
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return (
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds
        );
    }

    // Add click event listener to the "Try Again?" button
    tryAgainButton.addEventListener('click', function (event) {
        event.preventDefault();
        location.reload();
    });

    // Function to check the user's input against the correct lyrics
    function checkAnswer() {
        var userInput = lyricsInput.value.toLowerCase().trim();

        for (var i = 0; i < lyricCells.length; i++) {
            var wordCell = lyricCells[i];
            var word = wordCell.dataset.word.toLowerCase();

            // Check if the word is already active
            if (wordCell.classList.contains('active')) {
                continue; // Skip to the next word
            }

            if (word === userInput) {
                // Correct answer
                wordCell.classList.add('active');
                wordCell.textContent = word; // Show the word
                lyricsInput.value = ''; // Clear the input for the next attempt
            }
        }

        // Check if all words are active
        var allWordsActive = Array.from(lyricCells).every(cell => cell.classList.contains('active'));
        if (allWordsActive) {
            displayMissionComplete();
        }
    }

    // Function to display "Mission Complete" message
    function displayMissionComplete() {
        stopTimer();
        var elapsedTime = timerDisplay.textContent;
        completeDisplay.textContent = 'Mission Complete! Time: ' + elapsedTime;
        completeDisplay.style.display = 'block';
        timerDisplay.style.display = 'none';
        revealAnswersLink.style.display = 'none';
    }
});