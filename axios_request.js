var data = [];
var online_id = 0;

/////////////////////////////Axios requests for Movies////////////////////////////////////////


function loadMenu() {

    // online id is set to the localStorage ID to get loggedIn user,in the case of its existance 
    if(isNaN(localStorage.user_id))
    {
        online_id =0;        
    }
    else{
        online_id=localStorage.user_id;
     }
    
    li_offline = `<a href="login.html">Login</a>`;
    li_offline2 = `<a href="signUp.html">Cadastro</a>`;

    li_online = `<a href="profile.html">Meu Perfil</a>`;
    li_online2 = `<a  href="#void" onclick="logout()">Logout</a>`;

    
    //changes menu in the case of having an user online. Not working on the mobile version
    if (online_id == 0) {

        document.getElementById('on_off').innerHTML = li_offline;
        document.getElementById('on_off2').innerHTML = li_offline2;
    }
    else {
        document.getElementById('on_off').innerHTML = li_online;
        document.getElementById('on_off2').innerHTML = li_online2;
    }
}

// displays all the movies on the db, we have a better catalog than Netflix, we must say
function Show() {

    // if theres someone online, data_favoirtes saves all favorites movies ID (:
    data_favorites = [];

    // online id is set to the localStorage ID to get loggedIn user
    if(isNaN(localStorage.user_id))
    {
        online_id =0;        
    }
    else{
        online_id=localStorage.user_id;
    }
    

    axios.get('http://localhost/app/api/movies')
        .then(function (response) {

            data = response.data;
            var divs = '';
            var menu = '';
            var button = [];

            //online_id = 0 means theres no one online (so sad), gets all the movies.
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
                //here we  actually get the users favorites, so we show them already in the index pages
                //all the movies he loves!
                axios.get('http://localhost/app/api/favorites?param=' + online_id)
                    .then(function (response) {
                        data_favorites = response.data;
                        
                        //this loop is a brute-force way of seeing wich movies will get a button to add fav
                        // or a message that indicates the movie is a fav
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

//fuction that finds that movie you love by its name
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


function uploadUserAvatar(data_avatar){

    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();
    //https://api.imgbb.com/1/upload?key=987c7d94f69ba7644492a96007e46bd0
    let settings = { headers: { 'content-type': 'multipart/form-data' } }

    
   return  axios.post('https://api.imgbb.com/1/upload?key=987c7d94f69ba7644492a96007e46bd0',data_avatar,settings)
           .then(response => {
                avatar_path = response.data.data.url;        
                    // console.log(response.data.data.url);
                    // console.log("Email",email);    
                console.log("upload image",avatar_path);
                localStorage.setItem('avatar_path', avatar_path);
    });

}

// this fuction is used on the signUp page only
function Verify(email, password) {

    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();

    user_avatar = document.getElementById("user_avatar").files[0];
    
    let data_avatar = new FormData()
    data_avatar.append('image',user_avatar);

    console.log("inside verify data avatar",data_avatar);
    uploadUserAvatar(data_avatar);

    //console.log("avatar path",localStorage.avatar_path);

    avatar_path=localStorage.avatar_path;
    
    // verify if email already exists on the db, no duplicates here honey!
    axios.get('http://localhost/app/api/verify?param=' + email)
        .then(function (response) {
            data = response.data;
            //if data.length is > 0, it means the axios call found a register
            if (data.length > 0) {

                console.log("email já existe (:");
                document.getElementById('under_alert').innerHTML =
                 "Caraca baby shark, esse email já existe! Faça seu login!";
            }
            else {
                //calling SignUp fuction to create new user
                SignUpUser(email, password,avatar_path);
            }
        });
}

function SignUpUser(email, password,avatar_path) {

    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();

    //var constant_path = "user_avatar";
    

    axios.post('http://localhost/app/api/userSignUp',{
        email:email,
        password:password,
        avatar_path: avatar_path
    }
    )
    .then(response => {
        console.log(response);
        window.location.href = "http://localhost:3010/login";
    });
}

function Login(email, password) {

    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();
    
    axios.get('http://localhost/app/api/verify?param=' + email)
        .then(function (response) {

            data = response.data;

            if (data.length > 0) {
                if (password == data[0].password) {

                    // online id is set to the localStorage ID to get loggedIn user                
                    localStorage.setItem('user_id', data[0].id);
                    profile = `${data[0].email}`;                  
                    window.location.href = "http://localhost:3010/index";
                    
                }
                else {
                    console.log("db senha:", data[0].password, "senha_digi", password);
                    document.getElementById('under_alert').innerHTML = "huum, parece que essa senha está errada, tente mais uma vez!";
                }
            }
            else {

                document.getElementById('under_alert').innerHTML =
                 "huum, parece que esse e-mail nao existe em nossa base, limpe os óculos e tente mais uma vez";
            }
        });

}

function logout() {
    localStorage.setItem('user_id', 0);
    localStorage.setItem('avatar_path', 0);
    window.location.href = "http://localhost:3010/index";

}

function profileLoad(){
    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();

    axios.get('http://localhost/app/api/findUser/' + online_id)
    .then(function (response) {

        data = response.data;

        // console.log(data);
        // console.log("email",data[0].email);
        // console.log("avatar Path",data[0].avatar_path);

        div =
            `<figure class="team-image"><img src="${data[0].avatar_path}" alt=""></figure>
                <h2  class="team-name">${data[0].email}</h2>`;

        document.getElementById('userAvatar').innerHTML = div;                
    });
    
    

}


function alterUser(email, password){

    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();

    online_id = localStorage.user_id;

    user_avatar = document.getElementById("user_avatar").files[0];
    
    let data_avatar = new FormData()
    data_avatar.append('image',user_avatar);

    uploadUserAvatar(data_avatar);
    
    avatar_path=localStorage.avatar_path;


    axios.put('http://localhost/app/api/alterUser/'+online_id, {
        email: email,
        password: password,
        user_avatar: avatar_path
    }).then(response => {
        console.log(response);
        localStorage.setItem('user_id', 0);
        window.location.href = "http://localhost:3010/login";
    });
}


function deleteUser(email){

    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();
    online_id = localStorage.user_id;

    axios.delete('http://localhost/app/api/deleteUser/'+online_id,{       
    }).then(response => {
        localStorage.setItem('user_id', 0);
        localStorage.setItem('user_avatar', 0);
        console.log(response);
        window.location.href = "http://localhost:3010/index";
    });


}

function favorites() {

    online_id = localStorage.user_id;

    var divs_off = `<div class="row justify-content-md-center">				
                            
                            <i class=" fas fa-sad-tear fa-7x"></i>                            
                    </div>        
                    <div class="row justify-content-md-center">                            
                            <div class = movie>
                            </br></br>
                            <h2>humm,parece que você ainda não tem favoritos.
                            Faça seu login e escolha seus favoritos</h2>
                            </div>
                    </div>        `;



    if (online_id == 0) {
        console.log(divs_off);
        document.getElementById('movies').innerHTML = divs_off;
    }
    else {
        console.log("Here I am", online_id);
        axios.get('http://localhost/app/api/favorites?param=' + this.online_id)
            .then(function (response) {
                data = response.data;
                var divs = '';

                if(data.length == 0){

                    var divs =
                     `<div class="row justify-content-md-center">				        
                        <i class="fas fa-frown-open fa-7x"></i>
                    </div>        
                    <div class="row justify-content-md-center">                            
                            <div class = movie>
                            </br></br>
                            <h2>Como assim você ainda não tem favoritos?
                            Escolha os seus na página principal</h2>
                            </div>
                    </div>        `;

                }

                else{
                    for (i = 0; i < data.length; i++) {
                        console.log(data);
                        //concatenates all movies divs into one freaking string, the notorious "Gambiarra" 
                        divs = divs +
                            `<div class="movie">
            							        <figure  class="movie-poster"><img src="Http://image.tmdb.org/t/p/w185/${data[i].poster_path}" alt="#"></figure>																
            							        <!--/.Card image-->
            							        <button type="button"  onclick=removeFavorite(${data[i].id},${online_id}) class="btn btn-danger"><a class="btn-floating btn-large red"><i class="fa fa-times"></i></a> remover</button>
                							    </br>
            							        </br>
            							        <div  id="movie-title" class="movie-title"><a href="single.html">${data[i].title}</a></div>
            							        <p>${data[i].tagline}</p>										
            		    				    </div>`;
                    }                
                }
                document.getElementById('movies').innerHTML = divs;
            });

    }


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



