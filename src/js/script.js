const templates = {
  booksList: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

class Book{
  constructor(){
    console.log('siema');
    this.generateBooks();
    this.initActions();
  }

  generateBooks(){
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
  initActions(){
    this.filters = [];
    this.favoriteBooks = [];
    const thisBook = this;

    const books = document.querySelector('.books-list');
    
    books.addEventListener('dblclick', function(event){
      const clickedBook = event.target;
      const changedClickedBook = clickedBook.closest('A');
      if(clickedBook.tagName == 'IMG'){
        changedClickedBook.classList.toggle('favorite');
        const idBook = changedClickedBook.getAttribute('data-id');
        if(!thisBook.favoriteBooks.includes(idBook)){
          thisBook.favoriteBooks.push(idBook);
        } else {
          const index = thisBook.favoriteBooks.indexOf(idBook);
          thisBook.favoriteBooks.splice(index, 1);
        }
      }
      console.log('favorite', thisBook.favoriteBooks);
    });

    const filtersDOM = document.querySelector('.filters');
    filtersDOM.addEventListener('click', function(event){
      const clickedFilter = event.target;
      if(clickedFilter.tagName == 'INPUT' && clickedFilter.type == 'checkbox' && clickedFilter.name == 'filter'){
        console.log('abcd', clickedFilter.checked);
        if(clickedFilter.checked){
          thisBook.filters.push(clickedFilter.value);
        } else {
          thisBook.filters.splice(clickedFilter.value, 1);
        }
        console.log('filtres', thisBook.filters);
      }
      thisBook.bookHidden();

    });
  }

  bookHidden(){
    const books = dataSource.books;
    for(let book in books){
      const equalId = document.querySelector('[data-id="' + books[book].id + '"]');
      if(this.filters.includes('adults') && books[book].details.adults == true || this.filters.includes('nonFiction') && books[book].details.nonFiction == true){
        equalId.classList.remove('hidden');
      } else {
        equalId.classList.add('hidden');
      }
    }
  }
}















const app = {
  initBook: function(){
    new Book();
  },

  initApp: function(){
    this.initBook();
  },
};

app.initApp();