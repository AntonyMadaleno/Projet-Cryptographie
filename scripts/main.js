function loadCards()
{
    let cards = [];
    let elm_card_container = document.getElementById("card_display");

    for (let i = 0; i < 54; i++)
    {
        cards.push( document.createElement("div") );
        cards[i].setAttribute("class", "card");
        elm_card_container.appendChild(cards[i]);
    }
}