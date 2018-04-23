//Listen to form submission
document.getElementById('myForm').addEventListener('submit', saveBookmarks);

//function to save the bookmark
function saveBookmarks(e){
    var event = document.getElementById('eventName').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;

    var alertArea = document.getElementById('alerts');
    alertArea.innerHTML = '';

    if (!event || !date || !time) {
        alertArea.innerHTML = '<div class="alert alert-dismissible alert-danger" style="width: 100%">' +
        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
        '<h4 class="alert-heading">Warning!</h4>' +
        '<p class="mb-0">Fields should not be empty!</p>' +
        '</div>';
        
        
    }else{
        var bookmark = {
            eventName: event,
            eventDate: date,
            eventTime: time
        }

        if(localStorage.getItem('bookmarks') === null){
            //an array to store all the bookmarks
            var bookmarks = [];
            bookmarks.push(bookmark);
            //store in local storage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }else{
            //get bookmarks from the local storage
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
            bookmarks.push(bookmark);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        }
        //refresh the view
        fetchBookmarks();
    }    
    //prevent the default action
    e.preventDefault();
}
//delete bookmark
function deleteItem(nameEvent){
    //get bookmarks from the local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].eventName == nameEvent){
            //remove the elemnt from the array
            bookmarks.splice(i, 1);
        }
    }
    //resettig the local storage after deleeting
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //refresh the view
    fetchBookmarks();
}

function fetchBookmarks(){
    //get bookmarks from the local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarkList = document.getElementById('bookmarkResults');

    //Display the bookmark
    bookmarkList.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var eventName = bookmarks[i].eventName;
        var eventDate = bookmarks[i].eventDate;
        var eventTime = bookmarks[i].eventTime;

        bookmarkList.innerHTML += '<div class="card text-white bg-dark mb-3 col-md-4" style="max-width: 20rem; margin:2%">'+
                                  '<div class="card-header">EVENT #' + (i+1) + 
                                  '<button type="button" class="close" data-dismiss="alert" onClick="deleteItem(\''+ eventName +'\')">&times;</button>' + 
                                  '</div>'+
                                  '<div class="card-body">' + 
                                    '<h4 class="card-title">' + eventName + '</h4>'+
                                  '<p class="card-text">Date: ' + eventDate + '</p>'+
                                  '<p class="card-text">Time: ' + eventTime + '</p>'+
                                  '</div>'+
                                  '</div>';
    }

}