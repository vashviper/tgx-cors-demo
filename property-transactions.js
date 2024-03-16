//1. get token
//2. store token into local storage
//3. get ura inputs using token

//const axios = require('axios');
const cors_proxy = "https://tgx-cors-demo-pito.onrender.com/";
const accessTokenURL = "https://www.ura.gov.sg/uraDataService/insertNewToken.action";
const accessKey = "e60d2cf5-8a2e-4be8-8a77-b292cbed12b5";
//getToken();


getToken();

async function getURA() {
    //let token = localStorage.getItem("token");
    let token = await getToken();
}

async function getToken() {

    let token = localStorage.getItem("token"); // in the browser localstorage inspect>Application>Local Storage

    //@TODO check whether token to use.. 


    if (token === null) { //if no token
        console.log("getting token from URA");
        token = await getAccessToken(); // wait for getAccessToken to be fullfilled 
    }

    //process token
    await getUraInputs(token);

}

async function getAccessToken() {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${cors_proxy}${accessTokenURL}`,
        headers: {
            'AccessKey': accessKey,
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
 
    axios.request(config)
        .then((response) => {
            const data = response.data;
            //const data = JSON.stringify(response.data);
            //store token into local storage
            const token = data.Result;
            localStorage.setItem("token", token);
            console.log(token);
           // document.getElementById("token").innerHTML = token;
            return token;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });


    /*
 try {
     const data = await axios.request(config);
     console.log("data coming back from URA" + data  + " " + data.Result)
     const token = data.Result;
     localStorage.setItem("token", token);
     console.log(token);
     return token;
 } catch (error) {
     console.error('There was an error!', error);
     return false;
 }*/
}

async function getUraInputs(token) {
    //const token = localStorage.getItem("token");
    console.log('from URA Inputs' + token);
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${cors_proxy}https://www.ura.gov.sg/uraDataService/invokeUraDS?service=PMI_Resi_Transaction&batch=1`,
        headers: {
            'AccessKey': accessKey,
            'Token': token,
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    try {
        const response = await axios.request(config);
        console.log("gettign data");
        console.log(response);
        //@TODO output to HTML
        
    } catch (error) {
        console.error('There was an error!', error);
    }
    /*
    await axios.request()
    .then((response) => {
        const data = response.data;
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
    */
}