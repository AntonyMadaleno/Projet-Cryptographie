let cards = [];
let card_states = [];
let card_deck = new Array(54);
let char = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let indeck = 0;

function genFlux()
{
    //ETAPE 1
    let j0_pos = card_states[52];

    if (j0_pos < 53)
        card_states[52] = card_states[52] + 1;
    else
        card_states[52] = 1;


    let tmp = -1; let it = 0;
    while (tmp === -1 && it < 54)
    {
        if (card_states[it] === card_states[52] && it != 52)
        {
            card_states[it] = j0_pos;
            tmp = it;
        }
        it++;
    }

    //ETAPE 2
    let j1_pos = card_states[53];

    for (let x = 0; x < 2; x++)
    {
        if (j1_pos < 53)
            card_states[53] = card_states[53] + 1;
        else
            card_states[53] = 1;
    }

    tmp = -1; it = 0;
    while (tmp === -1 && it < 54)
    {
        if (card_states[it] === card_states[53] && it != 53)
        {
            card_states[it] = j1_pos;
            tmp = it;
        }
        it++;
    }

    //ETAPE 3
    for (let j = 0; j < 54; j++)
        card_deck[j] = card_states.indexOf(j, 0);

    j0_pos = card_states[52];
    j1_pos = card_states[53];

    let f0 = Math.min(j0_pos, j1_pos);
    let f1 = Math.max(j0_pos, j1_pos);

    let d0 = card_deck.slice(0, f0);
    let d1 = card_deck.slice(f0, f1+1);
    let d2 = card_deck.slice(f1 + 1);

    card_deck = d2.concat(d1);
    card_deck = card_deck.concat(d0);

    //ETAPE 4
    f0 = Math.min(card_deck[53] + 1, 53 );

    d0 = card_deck.slice(0, f0);
    d1 = card_deck.slice(f0, 53);
    d2 = card_deck.slice(53);  
    
    card_deck = d1.concat(d0);
    card_deck = card_deck.concat(d2);

    for (let j = 0; j < 54; j++)
        card_states[j] =  card_deck.indexOf(j, 0);

    for (let c = 0; c < 54; c++)
        cards[c].innerHTML = card_states[c];

    //ETAPE 5
    if ( card_deck[ card_deck[0] + 1 ] < 52 )
        return card_deck[ card_deck[0] + 1 ]%26;
    else
        return genFlux();

}

function encode(word)
{
    let encoded = "";

    for (let i = 0; i < word.length; i++)
    {
        let k = genFlux();
        let p = char.indexOf(word[i], 0);
        if (p >= 0)
            encoded += char[ (k + p) % 26 ];
        else
            encoded += word[i];
    }

    return encoded;
}

function decode(word)
{
    let decoded = "";

    for (let i = 0; i < word.length; i++)
    {
        let k = genFlux();
        let p = char.indexOf(word[i], 0);
        if (p >= 0)
            decoded += char[ (-k + p + 26) % 26 ];
        else
            decoded += word[i];
    }

    return decoded;
}

function genRandom()
{
    while (indeck < 54)
    {
        let i = Math.floor(Math.random() * 54);

        if (card_states[i] === -1)
        {
            card_states[i] = indeck;
            indeck++;
            cards[i].innerHTML = card_states[i];
        }
    }
}

function empty()
{
    for (let i = 0; i < 54; i++)
    {
        card_states[i] = -1;
        cards[i].innerHTML = "";
    }
    indeck = 0;
}

function card_click()
{
    let i = 0
    while (this != cards[i])
    {
        i++;
    }

    if (card_states[i] === -1)
    {
        card_states[i] = indeck;
        indeck++;
        this.innerHTML = card_states[i];
    }
    else
    {
        this.innerHTML = "";
        for (let a = 0; a < 54; a++)
        {
            if ( card_states[a] > card_states[i] )
            {
                card_states[a]--;
                cards[a].innerHTML = card_states[a];
            }
        }
        card_states[i] = -1;
        indeck--;
    }

}

function loadCards()
{
    let elm_card_container = document.getElementById("card_display");

    for (let i = 0; i < 54; i++)
    {
        cards.push( document.createElement("div") );
        card_states.push(-1);
        cards[i].setAttribute("class", "card");
        cards[i].style.backgroundImage = "url('" + "nope.jpg" + "')";
        elm_card_container.appendChild(cards[i]);

        cards[i].addEventListener("click", card_click );

    }
}

function load()
{
    loadCards();
}