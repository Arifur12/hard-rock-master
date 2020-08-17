//event listener
document.getElementById("searchBtn").addEventListener("click", function () {
    const searchSong = document.getElementById("searchSong").value;
    fetch(`https://api.lyrics.ovh/suggest/${searchSong}`)
        .then((res) => res.json())
        .then((data) => {
            displaySong(data);
        })
        .catch((error) => alert(error));
});

//show list
const displaySong = (data) => {
    const simpleResult = document.getElementById("simpleResult");

    for (let i = 0; i < 10; i++) {
        const SongNames = data.data[i].album.title;
        const Singer = data.data[i].artist.name;
        simpleResult.innerHTML += `<p class="author lead"><strong>${SongNames}</strong> Album by <span>${Singer}</span> <button class="btn btn-success" onclick="findLyrics('${Singer}','${SongNames}')" id="lyricsBtn">Get Lyrics</button></p>`;
    }
};

//lyrics
function findLyrics(Singer, SongNames) {
    const searchSongLyrics = document.getElementById("searchSongLyrics");
    fetch(`https://api.lyrics.ovh/v1/${Singer}/${SongNames}`)
        .then((res) => res.json())
        .then((data) => {
            searchSongLyrics.innerHTML += `<button class="btn go-back">&lsaquo;</button>
            <h2 class="text-success mb-4">${SongNames} - ${Singer}</h2>
            <pre class="lyric text-white">${data.lyrics}</pre>`;
            simpleResult.innerHTML = "";
        })
        .catch((error) => alert(error));
    searchSongLyrics.innerHTML = "";
}