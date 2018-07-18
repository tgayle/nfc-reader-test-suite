let socket = io.connect('http://localhost:3000');

const pageElements = {
  id: $('#id'),
  atqa: $('#atqa'),
  ats: $('#ats'),
  sak: $('#sak'),
};

socket.on('card id', function(card) {
  console.log('oof');
  pageElements.id.text(card.id);
  pageElements.atqa.text(card.atqa);
  pageElements.ats.text(card.ats);
  pageElements.sak.text(card.sak);
});
