
// créer un user dans la database // 
function createNewUser() {
    let obj = {
        name: document.querySelector("#registerName").value,
        firstname: document.querySelector("#registerFirstName").value,
        password: document.querySelector("#registerPassword").value

    }
    fetch("http://127.0.0.1:3000/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }
    ).then((response) => {
        response.json().then((data) => {
            if (response.ok) {
                console.log("requette envoyée");
                window.location.href = "./login.html"; // redirect to login.html


            } else {
                console.log("requette non envoyée")
            }
        })
    })


}


function login() {
    const obj = {
      name: document.querySelector("#loginName").value,
      password: document.querySelector("#loginPassword").value
    };
  
    fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(obj)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error during login");
        }
        return response.json();
      })
      .then((data) => {
        if(data.token){
          console.log("connexion réussie")

        }
        console.log("Connexion réussie");
        localStorage.setItem("name", obj.name);
        // window.location.href = "/index.html";
        localStorage.setItem("authToken", data.token);

      })
      .catch((error) => {
        console.error("Error during login:", error);
        console.log("Connexion échouée");
      });
  }

