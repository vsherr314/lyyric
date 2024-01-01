document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    var lyricsInput = document.getElementById('lyrics-input');
    var lyricsTable = document.getElementById('lyrics-table');
    var lyricCells = document.querySelectorAll('#lyrics-table td');

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
        var missionCompleteMessage = document.createElement('div');
        missionCompleteMessage.textContent = 'Mission Complete';
        missionCompleteMessage.style.fontWeight = 'bold';
        missionCompleteMessage.style.marginTop = '20px';
        missionCompleteMessage.style.marginBottom = '20px';
        lyricsTable.parentElement.insertBefore(missionCompleteMessage, lyricsTable);
    }
});