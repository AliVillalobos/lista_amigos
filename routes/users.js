const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
    res.send(JSON.stringify({users}, null, 4));
});

// Funcio para convertir  la fecha de string en formato dd-mm-yyyy a date object
function getDateFromString(strDate){
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm + "/" + dd); 
}

//Sorting for DOB all users
router.get("/sort",(req,res)=>{
    //Ordenar clasificar el array por DOB en orden acendente
    let sorted_users = users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });
    //Mandar el resultado
    res.send(sorted_users);
})

// GET request: Retrives a user with LAST NAME
router.get("/lastName/:lastName",(req,res)=>{
    // Establecer como parametro el lastName
    const lastName = req.params.lastName;
    // Buscar el array que coicida con el mismo parametro de lastName
    let filtered_user = users.filter((user) => user.lastName === lastName);
    // Mandar el array con los datos del usuario que coiciden 
    res.send(filtered_user);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    // Establecer el parametro email con el email que nos dan 
    const email = req.params.email;
    // Buscar en la lista el email que coinsida con el parametro email
    let filtered_user = users.filter((user) => user.email === email);
    //Enviar la respuesta a consola
    res.send(filtered_user);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
    // Agregar los datos que corresponden a cada campo al array
    users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "DOB": req.query.DOB,
        "email": req.query.email
    })
    // Mandar el messaje que se ha actualizado la lista
    res.send("The user "  + req.query.firstName + " has added!");

});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    // Establecer el email que buscamos
    const email = req.params.email;
    // Buscar el email que conicida con el parametro dado 
    let filtered_users = users.filter((user) => user.email === email);

    if (filtered_users.length > 0){
        // Selecciona la primera conicidencia que allá para actualizar los campos
        let filtered_user = filtered_users[0];

        // Actualizar los datos de cada campo
        let DOB = req.query.DOB;
        if(DOB){
            filtered_user.DOB = DOB;
        }

        let firstName =  req.query.firstName;
        if(firstName){
            filtered_user.firstName = firstName;
        }

        let lastName = req.query.lastName;
        if(lastName){
            filtered_user.lastName = lastName;
        }

        let email2 = req.query.email;
        if(email2){
            filtered_user.email = email2;
        }

        // Remplaza el usuario viejo con la nueva entrada actualizada
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);

        // Mandar la respuesta de confirmación
        res.send(`The user with email ${email} updated!`);
    }else{
        res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    // Extraer el email como parametro
    const email = req.params.email;
    // Filtra del array el que coicida con el parametro email
    users = users.filter((user) => user.email != email);
    // Mandar mensaje de que ha sido eliminado 
    res.send(`The user with ${email} has been deleted`);

});

module.exports=router;
