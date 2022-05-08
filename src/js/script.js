const templates = {
  booksList: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

const filters = [];
const favoriteBooks = [];

function generateBooks(){
  for(let book of dataSource.books){
    console.log('book', book);
    if(book.rating < 6){
      book.color = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      book.width = book.rating * 10 + '%';
    } else if(book.rating > 6 && book.rating <= 8){
      book.color = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      book.width = book.rating * 10 + '%';
    } else if(book.rating > 8 && book.rating <= 9){
      book.color = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      book.width = book.rating * 10 + '%';
    } else if(book.rating > 9){
      book.color = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      book.width = book.rating * 10 + '%';
    }
    const generatedHtml = templates.booksList(book);
    const wrapper = document.querySelector('.books-list');
    const generatedDom = utils.createDOMFromHTML(generatedHtml);    
    wrapper.appendChild(generatedDom);
  }
}

function initActions(){
  const books = document.querySelector('.books-list');
  
  books.addEventListener('dblclick', function(event){
    const clickedBook = event.target;
    const changedClickedBook = clickedBook.closest('A');
    if(clickedBook.tagName == 'IMG'){
      changedClickedBook.classList.toggle('favorite');
      const idBook = changedClickedBook.getAttribute('data-id');
      if(!favoriteBooks.includes(idBook)){
        favoriteBooks.push(idBook);
      } else {
        const index = favoriteBooks.indexOf(idBook);
        favoriteBooks.splice(index, 1);
      }
    }
    console.log('favorite', favoriteBooks);
  });

  const filtersDOM = document.querySelector('.filters');
  filtersDOM.addEventListener('click', function(event){
    const clickedFilter = event.target;
    if(clickedFilter.tagName == 'INPUT' && clickedFilter.type == 'checkbox' && clickedFilter.name == 'filter'){
      console.log('abcd', clickedFilter.checked);
      if(clickedFilter.checked){
        filters.push(clickedFilter.value);
      } else {
        filters.splice(clickedFilter.value, 1);
      }
      console.log('filtres', filters);
    }
    bookHidden();

  });
  
}

function bookHidden(){
  const books = dataSource.books;
  for(let book in books){
    const equalId = document.querySelector('[data-id="' + books[book].id + '"]');
    if(filters.includes('adults') && books[book].details.adults == true || filters.includes('nonFiction') && books[book].details.nonFiction == true){
      equalId.classList.remove('hidden');
    } else {
      equalId.classList.add('hidden');
    }
  }
}



generateBooks();
initActions();


