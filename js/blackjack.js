var pakli = [];
function keveres() {
    let array1 = ["2-C", "2-D", "2-H", "2-S", "3-C", "3-D", "3-H", "3-S", "4-C", "4-D", "4-H", "4-S", "5-C", "5-D", "5-H", "5-S", "6-C", "6-D", "6-H", "6-S", "7-C", "7-D", "7-H", "7-S", "8-C", "8-D", "8-H", "8-S", "9-C", "9-D", "9-H", "9-S", "10-C", "10-D", "10-H", "10-S", "J-C", "J-D", "J-H", "J-S", "Q-C", "Q-D", "Q-H", "Q-S", "K-C", "K-D", "K-H", "K-S", "A-C", "A-D", "A-H", "A-S"];
    let array2 = [];

    for (let i = 0; i < 52; i++) {
        let szam = Math.floor(Math.random() * (52 - i));
        array2[i] = array1[szam];
        array1.splice(szam, 1);
    }

    pakli = array2;

}


var jatekos_lapok = [];
//var jatekos_pont = 0;
var oszto_lapok = [];
//var oszto_pont = 0;
let korszam = 1;

function play() {
    jatekos_lapok = [pakli[0], pakli[2]];
    document.getElementById("jatekoskartyak").innerHTML += `<img src="images/${pakli[0]}.png" class="kartya" alt="card" >`; //id="${okartya0}" ??????????
    document.getElementById("jatekoskartyak").innerHTML += `<img src="images/${pakli[2]}.png" class="kartya k" alt="card">`;
    document.getElementById("jpont").innerHTML = pontszamit(jatekos_lapok);
    oszto_lapok = [pakli[1], pakli[3]];
    document.getElementById("osztokartyak").innerHTML += `<img src="images/${pakli[1]}.png" class="kartya" alt="card">`;
    document.getElementById("osztokartyak").innerHTML += `<img src="images/BACK.png" id="hattal" class="kartya k" alt="card">`;
    document.getElementById("opont").innerHTML = kartyaazonosit(oszto_lapok[0]) + " + ?";
}



function vaneBlackjack() {
    if (pontszamit(jatekos_lapok) === 21 && pontszamit(oszto_lapok) === 21) {
        let kep = document.getElementById("hattal");
        kep.src = `images/${pakli[3]}.png`;
        Swal.fire({
            title: 'Döntetlen BLACKJACK!!!',
            html: `DÖNTETLEN!`,
            icon: 'info',
            confirmButtonText: 'Új játék'
          }).then(() => {ujjatek()});
        document.getElementById("stand").disabled = true;
        document.getElementById("hit").disabled = true;
    }
    else if (pontszamit(jatekos_lapok) === 21) {
        let kep = document.getElementById("hattal");
        kep.src = `images/${pakli[3]}.png`;
        Swal.fire({
            title: ':) BLACKJACK! :)',
            html: `<h5>Nyertél BlackJack-kel!</h5>
                    <p class="pontir">Osztó pontszáma: ${pontszamit(oszto_lapok)}</p>`,
            icon: 'success',
            confirmButtonText: 'Új játék'
          }).then(() => {ujjatek()});
        document.getElementById("stand").disabled = true;
        document.getElementById("hit").disabled = true;
    }
}

function vane21() {
    if (pontszamit(jatekos_lapok) === 21 && jatekos_lapok.length > 2) {
        Swal.fire({
            title: 'Nyertél!',
            html:`<h5>21-ed lett.</h5>
                  <p>Osztó pontszáma: ${pontszamit(oszto_lapok)}</p>`,
            icon: 'success',
            confirmButtonText: 'Új játék'
          }).then(() => {ujjatek()});
        document.getElementById("stand").disabled = true;
        document.getElementById("hit").disabled = true;
        let kep = document.getElementById("hattal");
        kep.src = `images/${pakli[3]}.png`;
    }

}

function vaneBust() {
    if (pontszamit(jatekos_lapok) > 21) {
        Swal.fire({
            title:'Hoppá... besokaltál!',
            html:`
                  <p class="pontir">Osztó pontszáma: ${pontszamit(oszto_lapok)}</p>
                  <p class="pontir">Pontszámod: ${pontszamit(jatekos_lapok)}</p>`,
            icon: 'error',
            confirmButtonText: 'Új játék'
          }).then(() => {ujjatek()});
        
        document.getElementById("stand").disabled = true;
        document.getElementById("hit").disabled = true;

        let kep = document.getElementById("hattal");
        kep.src = `images/${pakli[3]}.png`;
    }
}

function hit() {
    jatekos_lapok.push(pakli[3 + korszam]);
    document.getElementById("jatekoskartyak").innerHTML += `<img src="images/${pakli[3 + korszam]}.png" class="kartya k" alt="card">`;
    korszam++;
    document.getElementById("jpont").innerHTML = pontszamit(jatekos_lapok);
}

function keses(ms) { // Kesleltetes
    return new Promise(resolve => { 
        setTimeout(() => {
            resolve('');
        }, ms); 
    }) 
} 

async function stand() { //async
    document.getElementById("stand").disabled = true;
    document.getElementById("hit").disabled = true;
    document.getElementById("opont").innerHTML = pontszamit(oszto_lapok);
    
    let kep = document.getElementById("hattal");
    kep.src = `images/${pakli[3]}.png`;

    
    while(pontszamit(oszto_lapok) < 17)
    {
        await keses(700);
        oszto_lapok.push(pakli[3+korszam]);
        document.getElementById("osztokartyak").innerHTML += `<img src="images/${pakli[3+korszam]}.png" class="kartya k" alt="card">`;
        korszam++;
        document.getElementById("opont").innerHTML = pontszamit(oszto_lapok);
    }

    if (pontszamit(oszto_lapok) > 21) {
        Swal.fire({
            title: 'Nyertél!',
            html:`<h5>Az osztó besokallt.</h5>
                  <p class="pontir">Osztó pontszáma: ${pontszamit(oszto_lapok)}</p>
                  <p class="pontir">Pontszámod: ${pontszamit(jatekos_lapok)}</p>`,
            icon: 'success',
            confirmButtonText: 'Új játék'
          }).then(() => {ujjatek()});
    }

    else if(pontszamit(oszto_lapok) === 21 && oszto_lapok.length == 2 && pontszamit(jatekos_lapok) < 21)
    {
        Swal.fire({
            title: ':( BLACKJACK! :(',
            html:`<h5>Sajnos Blackjack-je lett az osztónak!</h5>
                  <p class="pontir">Pontszámod: ${pontszamit(jatekos_lapok)}</p>`,
            icon: 'error',
            confirmButtonText: 'Új játék'
          }).then(() => {ujjatek()});
    }

    else if (pontszamit(oszto_lapok) === 21) {
        Swal.fire({
            title: 'Vesztettél!',
            html:`<h5>Az osztónak 21-e lett.</h5>
                  <p class="pontir">Pontszámod: ${pontszamit(jatekos_lapok)}</p>`,
            icon: 'error',
            confirmButtonText: 'Új játék'
          }).then(() => {ujjatek()});
    }
    else if (pontszamit(oszto_lapok) > pontszamit(jatekos_lapok)) {
        Swal.fire({
            title: 'Vesztettél!',
            html:`<h5>Az osztó közelebb volt a 21-hez!</h5>
                  <p class="pontir">Osztó pontszáma: ${pontszamit(oszto_lapok)}</p>
                  <p class="pontir">Pontszámod: ${pontszamit(jatekos_lapok)}</p>`,
            icon: 'error',
            confirmButtonText: 'Új játék'
          }).then(() => {ujjatek()});
    }
    else if (pontszamit(oszto_lapok) < pontszamit(jatekos_lapok)) {
        Swal.fire({
            title: 'Nyertél!',
            html:`<h5>Közelebb voltál a 21-hez!</h5>
                  <p class="pontir">Osztó pontszáma: ${pontszamit(oszto_lapok)}</p>
                  <p class="pontir">Pontszámod: ${pontszamit(jatekos_lapok)}</p>`,
            icon: 'success',
            confirmButtonText: 'Új játék'
          }).then(() => {ujjatek()});
    }
    else if (pontszamit(oszto_lapok) === pontszamit(jatekos_lapok)) {
        Swal.fire({
            title: 'Döntetlen!',
            html:`<h5>Azonos a pontszámod az osztóval.</h5>
                  <p class="pontir">Pontszámotok: ${pontszamit(jatekos_lapok)}</p>`,
            icon: 'info',
            confirmButtonText: 'Új játék'
          }).then(() => {ujjatek()});
    }
}

function kartyaazonosit(temp)
{
    let ertek = temp.split("-");
    if(ertek[0] === "J" || ertek[0] === "Q" || ertek[0] === "K")
    {
        ertek = 10;
    }
    else if(ertek[0] === "A")
    {
        ertek = 11;
    }
    else
    {
        ertek = parseInt(ertek[0]);
    }
    return ertek;
}

function pontszamit(osztott_lapok){
    //Játékos pont
    let pont = 0;
    for(let i = 0; i < osztott_lapok.length; i++)
    {
        let ertek = osztott_lapok[i].split("-");
        if(ertek[0] === "J" || ertek[0] === "Q" || ertek[0] === "K")
        {
            pont += 10;
        }
        else if(ertek[0] === "A")
        {
            pont += 11;
        }
        else
        {
            pont += parseInt(ertek[0]);
        }
    }

    //Ász pontszámítás
    if((osztott_lapok.includes("A-C") || osztott_lapok.includes("A-D") || osztott_lapok.includes("A-H") || osztott_lapok.includes("A-S")) && pont > 21)
    {
        let asz = 0;
        for(let i = 0; i < osztott_lapok.length; i++)
        {
            if(osztott_lapok[i] == "A-C" || osztott_lapok[i] == "A-D" || osztott_lapok[i] == "A-H" || osztott_lapok[i] == "A-S")
            {
                asz++;
            }
        }
        if(asz == 1)
        {
            pont -= 10;
        } else if(asz == 2)
        {
            pont -= 10;
            if (pont > 21)
            {
                pont -= 10;
            }
        } else if (asz == 3 )
        {
            pont -= 20;
            if (pont > 21)
            {
                pont -= 10;
            }
        } else if (asz == 4)
        {
            pont -= 30;
            if (pont > 21)
            {
                pont -= 10;
            }
        }
    }
    return pont;
}

function ujjatek()
{
    location.reload();
}

document.getElementById("stand").addEventListener('click', function() {
    stand();
});
document.getElementById("hit").addEventListener('click', function() {
    hit();
    vane21();
    vaneBust();
});

keveres();
play();
vaneBlackjack();