async function searchSong() {
    const query = document.getElementById('search').value;
    if (!query) {
        alert('Please enter a song title');
        return;
    }

    const response = await fetch(`https://www.songsterr.com/api/songs.json?pattern=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.length > 0) {
        const song = data[0];
        const songId = song.id;
        const songTitle = song.title;
        const artistName = song.artist.name;

        // Display song information
        document.getElementById('results').innerHTML = `<h2>${songTitle} by ${artistName}</h2>`;

        // Fetch and display chords
        const chordsResponse = await fetch(`https://www.songsterr.com/a/ra/songs/${songId}.json`);
        const chordsData = await chordsResponse.json();

        if (chordsData.chords) {
            const lyricsWithChords = formatChords(chordsData.chords);
            document.getElementById('results').innerHTML += `<pre id='lyrics'>${lyricsWithChords}</pre>`;
        } else {
            document.getElementById('results').innerHTML += 'Chords not found';
        }
    } else {
        document.getElementById('results').innerHTML = 'Song not found';
    }
}

function formatChords(chords) {
    // Implement formatting logic to display chords above lyrics
    // This will depend on the structure of the chords data from the API
    // For simplicity, let's assume chords is a string with chords in square brackets
    return chords.replace(/\[([^\]]+)\]/g, '<span class="chord">$1</span>');
}
