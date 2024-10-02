// Function to fetch a joke from a public API
document.getElementById('getJokeBtn').addEventListener('click', function() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            const jokeContainer = document.getElementById('jokeContainer');
            jokeContainer.innerHTML = `<p><strong>${data.setup}</strong></p><p>${data.punchline}</p>`;
        })
        .catch(error => console.error('Error fetching the joke:', error));
});