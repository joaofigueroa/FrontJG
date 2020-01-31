var data = [];

var User_online = [];

var online_id = 22;

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

            User_online = response.data;

            if (User_online.length > 0) {
                if (password == User_online[0].password) {
                    window.location.href = "http://localhost:3000/index";
                   online_id = User_online[0].id;
                    console.log("id loggedin:", online_id);
                }
                else {
                    console.log("db senha:", User_online[0].password, "senha_digi", password);
                    document.getElementById('under_alert').innerHTML = "huum, parece que sua senha está errada tente de novo!";
                }
            }
            else {

                document.getElementById('under_alert').innerHTML = "huum, parece que esse e-mail nao existe, tente de novo!";
            }
        });

        console.log("id loggedin: 2", online_id);






}

function favorites() {

    console.log("Here I am", online_id);
    axios.get('http://localhost/app/api/favorites?param=' + this.online_id)
        .then(function (response) {
            data = response.data;
            console.log(data);

            var divs = '';

            for (i = 0; i < data.length; i++) {

                console.log(data);
                //concatenates all movies divs into one freaking string, the notorious "Gambiarra" 
                divs = divs +
                    `<div class="movie">
            							<figure  class="movie-poster"><img src="Http://image.tmdb.org/t/p/w185/${data[i].poster_path}" alt="#"></figure>																
            							<!--/.Card image-->
            							<button type="button" class="btn btn-danger"><a class="btn-floating btn-large red"><i class="fa fa-times"></i></a> remover</button>
            							</br>
            							</br>
            							<div  id="movie-title" class="movie-title"><a href="single.html">${data[i].title}</a></div>
            							<p>${data[i].tagline}</p>										
            						</div>`;
            }

            document.getElementById('movies').innerHTML = divs;
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
