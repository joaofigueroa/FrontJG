var data = [];

function Verify(email, password) {

    //necessary to prevent javascript of creating event that cancels POST require
    event.preventDefault();

    // verify if email already exists on the db, no duplicates here honey!
    axios.get('http://localhost/app/api/verify?param=' + email)
        .then(function (response) {
            data = response.data;


            if (data.length > 0) {

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
