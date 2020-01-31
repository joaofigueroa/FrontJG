var data = [];

// displays all the movies on the db
function Show() {
    axios.get('http://localhost/app/api/movies')
        .then(function (response) {
            data = response.data;

            var divs = '';

            for (i = 0; i < data.length; i++) {

                console.log(data);
                //concatenates all movies divs into one freaking string, the notorious "Gambiarra" 
                divs = divs +
                    `<div class="movie">
										<figure  class="movie-poster"><img src="Http://image.tmdb.org/t/p/w185/${data[i].poster_path}" alt="#"></figure>																
    									<!--/.Card image-->
    									<button type="button" class="btn btn-primary"><a class="btn-floating btn-large red"><i class="fa fa-plus"></i></a> preferidos</button>
										</br>
										</br>
										<div  id="movie-title" class="movie-title"><a href="single.html">${data[i].title}</a></div>
										<p>${data[i].tagline}</p>										
									</div>`;
            }

            document.getElementById('movies').innerHTML = divs;
        });
}

//Search for movies titles
function Search(input) {

    axios.get('http://localhost/app/api/search?param=' + input)
        .then(function (response) {
            data = response.data;

            var divs = '';

            for (i = 0; i < data.length; i++) {

                console.log(data);
                //concatenates all movies searched divs into one freaking string, the notorious "Gambiarra" 
                divs = divs +
                    `<div class="movie">
											<figure  class="movie-poster"><img src="Http://image.tmdb.org/t/p/w185/${data[i].poster_path}" alt="#"></figure>																
    										<!--/.Card image-->
    										<button type="button" class="btn btn-primary"><a class="btn-floating btn-large red"><i class="fa fa-plus"></i></a> preferidos</button>
											</br>
											</br>
											<div  id="movie-title" class="movie-title"><a href="single.html">${data[i].title}</a></div>
											<p>${data[i].tagline}</p>										
										</div>`;
            }

            document.getElementById('movies').innerHTML = divs;
        });

}


function Verify(email, password) {

    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();

    // verify if email already exists on the db, no duplicates here honey!
    axios.get('http://localhost/app/api/verify?param=' + email)
        .then(function (response) {
            data = response.data;


            if (typeof data.length > 0) {

                console.log("email já existe (:");
            }
            else {
                //calling SignUp fuction to create new user
                SignUpUser(email, password);
            }
        });
}

function SignUpUser(email, password) {

    // lines commented bellow to upload image

    // let settings = { headers: { 'content-type': 'multipart/form-data' } }

    // let avatar_path = document.getElementById("user_avatar").files[0]

    // let data = new FormData()
    // data.append('avatar_path', '/avatar_path')
    // data.append('email', this.email)
    // data.append('password', this.password)

    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();

    var constant_path = "avatar_path";

    axios.post('http://localhost/app/api/user-sign-up', {
        email: email,
        password: password,
        avatar_path: "constant_path"
    }).then(response => {
        console.log(response);
        window.location.href = "http://localhost:3000/login";
    });
}
