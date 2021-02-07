# Trailer watcher app with netflix design

This app is cloning the design of Netflix, but basically it is a trailer watcher app with not only netflix movies or serieses. <br /><br />
If the user is not signed in then the landing page of Netflix is visible:

<img src="./images-for-readme/landing-page.gif" alt="Gif about landing page" />

I have implemented the Sign up and sign in functionality in this page, the email subscription part is not implemented.

<img src="./images-for-readme/login-page.png" alt="Sign in page screenshot" />
<br />
The authentication is handled by Firebase Authentication. I have implemented the Facebook login as well, but in production it is not working for some reason.
<br />
After login the user can select the proper registered account.

<img src="./images-for-readme/select-account.png" alt="Select account page screenshot" />

When the user selects the account, the movies will appear grouped by categories. If the API works correctly then the banner image is random, but if there are problems with it, it will be a default one.
<br />
<br />
I have used the TheMovieDB API for fetching the film or series informations, pictures.
<br />
<br />

Due to the huge amount of pictures in this page, I have implemented Lazy loading both vertical and horizontal scrolling. But it is still not perfect, the page is quiet slow.
Infinite horizontal scrolling was implemented, so if we reach the last loaded movie in a category, then the app will fetch 20 more films or serieses from that category.
<br />
<br />
In this page if the user moves the mouse on a movie, then some part of the movie description will visible on the image. If the user clicks on a movie image a Collapse info will appear with an other image from the movie poster and the full description about the movie.
<br />
The last element here is a Play button, which will try to find the trailer of the movie in youtube. If the algorythm find the trailer then it will be played automatically otherwise there will be an errormessage.
<br />
<br />

<img src="./images-for-readme/main-page.gif" alt="Demo of the movies page" />
<br />
My computer was quiet overwhelmed with screen recording, that is why it was quiet slow. But the main features were visible. There is a searchfunctionality. At the moment it search for movies in the movies stored React context. The design is not updated for that functionality.
<br />
<br />
There is a language selection option with Hungarian, Germany, English language options. I haven't implemented full language support on this page. With this language selection, the movies will be fetched again with the proper language description and title. 
<br />
<br />
2 main category can be selected on this page: Series and films.

