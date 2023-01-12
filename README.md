## MyMusic - Spotify-based Music Library App

MyMusic allows you to create your own music library using the Spotify API to pull music data.

[Trello](https://trello.com/b/0njPDHwv/music-app-unit-3-project)
[Deployed Application](https://aa-mymusic.herokuapp.com/)

## Login Page

The Login page utilizes a Billboard.com API that displays the top 100 albums from a random day between the years of 2000 and 2022 for the background. Each time the page is refreshed, a new top 100 albums from a random day will appear.

![login page](https://i.imgur.com/kqZPs8W.png)

## User Library

The user's library displays a collection of albums the users added to their database (MongoDB) from the Spotify API on the Explore page. Users can delete albums from their library, view the album information page, and add an album to their favorites.

![user library](https://i.imgur.com/NeAiOXq.png)

## Album Information Page

The album information page makes a call to the Spotify API to pull data about a specific album. Users can add individual songs to their "Liked Tracks" page from here.

![album page](https://i.imgur.com/7HALyVJ.png)

## Liked Tracks Page

Users can see their liked tracks on this page. To added new "liked" tracks, visit an album page and like tracks from the tracklist that shows.

![liked page](https://i.imgur.com/nQMs7Oj.png)

## Favorites Page

Users can add albums they've added to their Library to their favorites to keep track of which albums they love the most.

![favorite albums](https://i.imgur.com/HZPOoiV.png)

## Explore Page

Search for and add albums to your Library from the Search page. This makes a call to the Spotify API so show album results.
![Explore Page](https://i.imgur.com/o5NUsft.png)

## Artist Page

The artist page calls the Spotify API to show an individual artist's popular releases, albums, singles & EPs, and top tracks.
![artists](https://i.imgur.com/UAZnnk9.png)

## Favorite Part of My App

Because most of the data showing in this app is being pulled from the Spotify API, I had to find a way to determine if an album is already in my MongoDB. I used the some() method to check the musicIds of my posts and compare them to Spotify API's spotify Ids. If they match, that means the album is already in my library.

```
{
	albumLibrary.some(
		(album) =>
		album.albumId === id && album.musicType === "album"
	) ?
		"This album is in your library." :
		"This album is not in your library."
}
```

## Resources

[Billboard API](https://rapidapi.com/apimaker/api/billboard2/) || [Spotify Scraper API](https://rapidapi.com/DataFanatic/api/spotify-scraper/) || [Spotify API](https://rapidapi.com/Glavier/api/spotify23/)

## Things to Add

I plan on improving this app for my capstone in the following ways:

- Add an Artists page that shows all of the artists in your library.
- Add “this artist is in your library” on artist page
- Be able to delete an album or remove from favorites from album and track pages (need to figure out how to iterate through DB and pull post ID by comparing Spotify id)
- Add a "Recently Played" page that shows a user's most recently played songs from their Spotify profile.
- Ability to create new playlists and add tracks to them.
- Add a Playlists page that will display the playlists the user creates.
- Add the ability for the user to update their name, profile photo, and certain styling on the page.
- Dark mode option the user can turn on.
- Add a Charts page that shows the top tracks and albums from Spotify.
- Attach the user posts to the user model.
