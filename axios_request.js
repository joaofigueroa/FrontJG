var data = [];
var online_id = localStorage.user_id;

/////////////////////////////Axios requests for Movies////////////////////////////////////////


function loadMenu(){

    li_offline = `<a href="login.html">Login</a>`;
    li_offline2 = `<a href="signUp.html">Cadastro</a>`;
    
    li_online = `<a href="profile.html">Meu Perfil</a>`;
    li_online2 = `<a  href="#void" onclick="logout()">Logout</a>`;
    
    if(online_id== 0){

        document.getElementById('on_off').innerHTML = li_offline;
        document.getElementById('on_off2').innerHTML = li_offline2;
    }
    else{
        document.getElementById('on_off').innerHTML = li_online;
        document.getElementById('on_off2').innerHTML = li_online2;
    }
}

// displays all the movies on the db
function Show() {

    data_favorites = [];

    axios.get('http://localhost/app/api/movies')
        .then(function (response) {

            data = response.data;
            var divs = '';
            var menu = '';
            var button = [];

            //online_id = 0 means theres no one online, gets all the movies.
            if (online_id == 0) {
                console.log('log', online_id);
                for (i = 0; i < data.length; i++) {

                    //concatenates all movies divs into one freaking string, the notorious "Gambiarra" 
                    divs = divs +
                        `<div class="movie">
                                    <figure  class="movie-poster"><img src="Http://image.tmdb.org/t/p/w185/${data[i].poster_path}" alt="#"></figure>																
                                    <!--/.Card image-->                                   
                                    </br>
                                    </br>                                        
                                    <div  id="movie-title" class="movie-title"><a href="single.html">${data[i].title}</a></div>
                                    <div style= "display: none" id="movie-id">${data[i].id}</div>
                                    <p>${data[i].tagline}</p>										
                                </div>`;
                }

            }

            else {
                axios.get('http://localhost/app/api/favorites?param=' + online_id)
                    .then(function (response) {
                        data_favorites = response.data;
                        // console.log(data_favorites);


                        for (i = 0; i < data.length; i++) {
                            if (data_favorites.length == 0) {
                                button[i] = `<button  onclick= "newFavorite(${data[i].id}, online_id )" type="button" class="btn btn-primary"><a class="btn-floating btn-large red"><i class="far fa-heart"></i></a> preferidos</button>`;
                            }
                            else {
                                for (j = 0; j < data_favorites.length; j++) {
                                    if (data[i].id == data_favorites[j].id) {
                                        button[i] = `<button  onclick= "" type="button" class="btn btn-sucess"><a class="btn-floating btn-large red"><i class="fas fa-heart"></i></a> Já é preferido</button>`;
                                        break;
                                    }
                                    else {
                                        button[i] = `<button  onclick= "newFavorite(${data[i].id}, online_id )" type="button" class="btn btn-primary"><a class="btn-floating btn-large red"><i class="far fa-heart"></i></a> preferidos</button>`;
                                    }
                                }
                            }
                        }

                        for (i = 0; i < data.length; i++) {
                            //console.log(data);
                            //concatenates all movies divs into one freaking string, the notorious "Gambiarra" 
                            divs = divs +
                                `<div class="movie">
										<figure  class="movie-poster"><img src="Http://image.tmdb.org/t/p/w185/${data[i].poster_path}" alt="#"></figure>																
    									<!--/.Card image-->
    									${button[i]}
										</br>
                                        </br>                                        
                                        <div  id="movie-title" class="movie-title"><a href="single.html">${data[i].title}</a></div>
                                        <div style= "display: none" id="movie-id">${data[i].id}</div>
										<p>${data[i].tagline}</p>										
									</div>`;
                        }

                        document.getElementById('movies').innerHTML = divs;

                    });
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



/////////////////////////////Axios requests for Users////////////////////////////////////////

function Verify(email, password) {

    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();

    // verify if email already exists on the db, no duplicates here honey!
    axios.get('http://localhost/app/api/verify?param=' + email)
        .then(function (response) {
            data = response.data;

            //if data.length is > 0, it means the axios call found a register
            if (data.length > 0) {

                console.log("email já existe (:");
            }
            else {
                //calling SignUp fuction to create new user
                SignUpUser(email, password);
            }
        });
}


function Login(email, password) {

    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();
    var self = this;

    axios.get('http://localhost/app/api/verify?param=' + email)
        .then(function (response) {

            data = response.data;

            if (data.length > 0) {
                if (password == data[0].password) {
                    console.log("id loggedin:", data[0].id);
                    online_id = data[0].id;
                    localStorage.setItem('user_id', data[0].id);
                    window.location.href = "http://localhost:3010/index";


                }
                else {
                    console.log("db senha:", data[0].password, "senha_digi", password);
                    document.getElementById('under_alert').innerHTML = "huum, parece que sua senha está errada tente de novo!";
                }
            }
            else {

                document.getElementById('under_alert').innerHTML = "huum, parece que esse e-mail nao existe em nossa base, tente de novo!";
            }

        });


}

function logout(){
    localStorage.setItem('user_id',0);
    window.location.href = "http://localhost:3010/index";

}

function favorites() {
    

    console.log("Here I am", online_id);
    axios.get('http://localhost/app/api/favorites?param=' + this.online_id)
        .then(function (response) {
            data = response.data;
            var divs = '';

            

            if(localStorage.user_id == 0){                          
                document.getElementById('movies').innerHTML = div_off;
            }
            else{
                for (i=0; i < data.length; i++) {
                    console.log(data);
                    //concatenates all movies divs into one freaking string, the notorious "Gambiarra" 
                    divs = divs +
                        `<div class="movie">
            							    <figure  class="movie-poster"><img src="Http://image.tmdb.org/t/p/w185/${data[i].poster_path}" alt="#"></figure>																
            							    <!--/.Card image-->
            							    <button type="button"  onclick=removeFavorite(${data[i].id},online_id) class="btn btn-danger"><a class="btn-floating btn-large red"><i class="fa fa-times"></i></a> remover</button>
            							    </br>
            							    </br>
            							    <div  id="movie-title" class="movie-title"><a href="single.html">${data[i].title}</a></div>
            							    <p>${data[i].tagline}</p>										
            						    </div>`;
                }

                document.getElementById('movies').innerHTML = divs;
            }
        });

}

//add a new favorite to our list
function newFavorite(movie_id, user_id) {
    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();

    axios.post('http://localhost/app/api/addFavorite', {
        movie_id: movie_id,
        user_id: user_id
    }).then(response => {
        console.log(response);
        window.location.href = "http://localhost:3010/index";
    });
}

//remove favorite from our list
function removeFavorite(movie_id, user_id) {
    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();
    axios.post('http://localhost/app/api/removeFavorite', {
        movie_id: movie_id,
        user_id: user_id
    }).then(response => {
        console.log(response);
        window.location.href = "http://localhost:3010/favorites";
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
        window.location.href = "http://localhost:3010/login";
    });
}
