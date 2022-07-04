/* Date picker */ 
var tagValue = ''
var tagId = ''
jQuery(document).ready(function () {
    jQuery('#datepicker').datepicker({
        format: 'dd-mm-yyyy',
        startDate: '+1d'
    });
});
/* Date picker end */


/* priority Tag selection */

$('.add-task-flag').on('click', () => {
   $('.priority-check-box').css('display','block')
})
$('.close').on('click', () => {
    $('.priority-check-box').css('display','none')
})
$('#high-pri, #low-pri, #med-pri').on('click', function () {

        $('.showTag').remove()
        tagId = $(this).attr('id')
        tagValue = $(this).attr('value')
        $('.pri-tag').append(`<span class="showTag" id="${tagId}">${tagValue}</span>`)
        $('.priority-check-box').css('display','none')
    
 })
/* priority Tag selection End */

/* Add Task */
$('.add-task-btn').on('click', () => {
    if ($('#datepicker').attr('value') !== null && $('.add-task-input').attr('value') !== null && $('.showTag').length > 0 ) {
        let taskDate = $('#datepicker').val()
        updateLocalStorage(taskDate)
        updateTaskList(taskDate)
        $('#datepicker').val('')
        $('.showTag').remove()
        $('.add-task-input').val('')
    }
    else {
        alert('Please fill all related fields')
    }
})

function updateLocalStorage (_taskDate) {
    let listText = $('.add-task-input').val()
    let tagText = tagValue
    let pastList = localStorage.getItem('todo_list');
    let myList = [[_taskDate, [tagText, 'Active', listText]]]
    let listDetails = [tagText, 'Active', listText]
    let list =[_taskDate, [tagText, 'Active', listText]]
    let status =''
   if(pastList) {
    console.log('local storage exist')
    let myListData = JSON.parse(localStorage['todo_list'])
    myListData.forEach(key => {
       if (key[0] === _taskDate) {
        key.push(listDetails)
        console.log(myListData)
        window.localStorage.setItem('todo_list', JSON.stringify(myListData))
        status=0
        console.log('status value :' + status)
       }
    })
    if (status === 0) {
     console.log('date is same')
     
    }else {
     console.log('date is not same')
     myListData.push(list)
     console.log(myListData)
     window.localStorage.setItem('todo_list', JSON.stringify(myListData))
    }
    
    }
   else {
     console.log(myList)
     window.localStorage.setItem('todo_list', JSON.stringify(myList))
     
    
}
}

function updateTaskList (date) {
    $('.list-item-box').remove()
    $('#list-task-show-date').html(`Date: ${date}`)
    let pastList = localStorage.getItem('todo_list');
   if(pastList) {
      let todoList = JSON.parse(localStorage['todo_list'])
      console.log(todoList)
      let result = todoList.filter(key => {
        return key[0] === date
      })
      
      console.log(result)
      let count = result[0].length

      for(i=1; i<count; i++) {
        console.log('chala')
        let listText = result[0][i][2]
        let listTag = result[0][i][0]
        let listStatus = result[0][i][1]
        $('.list-task').css('display','block')
        $('.list-box').append(`<div class='list-item-box'>
                                 <div class="row">
                                   <input type="checkbox" class="list-checkbox" disabled>
                                   <p class="list-text">${listText}</p>
                                   <p class="list-status">${listStatus}</p>
                                   <p class="list-priority">${listTag}</p>
                                 </div>
                               </div>
                            `) 
      }
    }
   else {
     console.log('There is nothing in local storage')
    
}
}
$('body').on('click', '.list-text', function () {
    $('.list-text').css('color','green')
    $('.list-status').css('display','none')
    $('.list-priority').css('display','none')
    $('.list-checkbox').replaceWith('<i class="fa fa-check"></i>')
    
})


 

 







