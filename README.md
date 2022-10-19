# The Daily Yeezus

Live Code: [The Daily Yeezus](https://yeezus-gbertkim.vercel.app/).

## Reason

I am a fan of Kanye and thought this project would be fun.

### How it works:

We fetch the Lapd Api and get a random bible verse. Then we use the bible verse and convert it through the Uberduck API. I drew the Kanye through on Figma, exported the SVG, and animated it through the data from Web Audio Api. The mouth is handled by the volume of the audio and the eyebrow animation is triggered by a volume threshold by the audio volume.

### Difficulties:

UX - There is a long loading period while the audio is being created, which is not a pleasant user experience. I plan to build a backend server to speed things up. There is a slight delay before Kanye actually starts speaking after he is clicked on mobile. The audio element on mobile has some built in delay when you load, pause, and play. To give the user response that their click was processed, I had Kanye start with his eyes closed and open them on the click. That way even if their is a slight delay for when the audio starts, it will let the user know that the click was processed.

![Kanye App start](https://github.com/gbertkim/TheDailyYeezus/blob/main/kanye-1.png?raw=true)

![Kanye App audio loaded](https://github.com/gbertkim/TheDailyYeezus/blob/main/kanye-2.png?raw=true)

![Kanye App audio playing](https://github.com/gbertkim/TheDailyYeezus/blob/main/kanye-3.png?raw=true)
