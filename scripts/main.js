function loadCards()
{
    let cards = [];
    let elm_card_container = document.getElementById("card_display");

    for (let i = 0; i < 54; i++)
    {
        cards.push( document.createElement("div") );
        cards[i].setAttribute("class", "card");
        elm_card_container.appendChild(cards[i]);

        let text;
        fig = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "V", "Q", "K"];

        if ( i / 13 < 1)
            text = document.createTextNode("CO " + fig[i%13] );
        else if ( i / 13 < 2)
            text = document.createTextNode("PI " + fig[i%13] );
        else if ( i / 13 < 3)
            text = document.createTextNode("TR " + fig[i%13] );
        else if ( i / 13 < 4)
            text = document.createTextNode("CA " + fig[i%13] );
        else
            text = document.createTextNode("JO " + fig[i%13] );

        cards[i].appendChild(text);
    }
}