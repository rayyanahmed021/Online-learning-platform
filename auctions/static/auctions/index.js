document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#course').style.animation = "tutti 1s ease"
    document.querySelector('#course').style.animationPlayState = "running"
    document.querySelector('#course').addEventListener('animationend',() =>{
        document.querySelector('#course').style.animation =  null
    })
    allcourses()
    document.querySelector('#create').onclick = () => {
        create()
    }
    var button = document.querySelector('div.form-group').childNodes[8].previousSibling
    button.onclick = () => {
        creaty()
    }
    document.querySelector('#All').onclick = () => {   
        allcourses()
    }
    document.querySelector('#my').onclick = () => {    
        mycourse()
    }
    document.querySelector('#q').onclick = () => {
        query()
    }
})
function create(){
    document.querySelector('div.form-group').style.display = "block"
    document.querySelector('div.form-group').style.animation = "tutti 1s ease"
        document.querySelector('div.form-group').style.animationPlayState = "running"
        document.querySelector('div.form-group').addEventListener('animationend',() => {
            document.querySelector('div.form-group').style.animation = null

        })
    document.querySelector('#course').innerHTML  = ""
        document.querySelector('div#bg').innerHTML  = ""
    document.querySelector('div#bg').style.background = "none"
    document.querySelector('div#bg').style.height = "0%"
    var variable = document.querySelector('div.form-group').childNodes
    console.log(variable)
    console.log(variable[3].childNodes[3].value)
}
function creaty(){
    var variable = document.querySelector('div.form-group').childNodes
    console.log(variable[3].childNodes[3].value)

    fetch("/create",{
        method: 'POST',
        body: JSON.stringify({
            title:`${variable[1].childNodes[2].value}`,
            syllabus: `${variable[3].childNodes[3].value}`,
            image:`${variable[5].childNodes[2].value}`
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        allcourses()
        const animation = document.createElement('div')
            animation.className = "alert alert-success"
            animation.innerHTML = "Successfully Added course"
            document.querySelector('div#preview').prepend(animation)
            animation.style.animationPlayState = "running"
            
        document.querySelector('#course').prepend(animation)
        animation.addEventListener('animationend',() =>{
            animation.remove()
        })
    })
}
function query(){
    fetch("/query")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.querySelector('div.form-group').style.display = "none"

        document.querySelector('#course').innerHTML  = ""
        document.querySelector('#course').style.display = "block"
        document.querySelector('#course').style.animation = "tutti 1s ease"
        document.querySelector('#course').style.animationPlayState = "running"
        document.querySelector('#course').addEventListener('animationend',() => {
            document.querySelector('#course').style.animation = null

        })
        document.querySelector('div#bg').innerHTML  = ""
    document.querySelector('div#bg').style.background = "none"
    document.querySelector('div#bg').style.height = "0%"
    var arrayLength = parseInt(data.length - 1)
    const heading = document.createElement('h2')
    heading.innerHTML = "Questions"
    document.querySelector('#course').append(heading)
    for (var i = 0 ; i<arrayLength ; i++){

        const div = document.createElement('div')
        div.innerHTML = `<div id ="flag"><span id ="name"><strong>${data[i].by}</strong>:
        <i>${data[i].question}</i>
        </span>
        
        <span id = "party"><strong> ${data[i].video}</strong> -${data[i].timestamp}</span>
        
        </div>
        `
        const button = document.createElement('button')
        const submit = document.createElement('button')
        submit.className = "btn btn-primary"
        submit.innerHTML = "Submit"
        submit.dataset.id = data[i].id
        const textarea = document.createElement('textarea')
            textarea.placeholder = "Answer"
            textarea.id = `ans${data[i].id}`
            textarea.className = "form-control"
            div.append(textarea)
            textarea.style.display = "none"
        button.innerHTML = "Answer"
        button.id  = `click${data[i].id}`
        button.className = "btn btn-primary"
        div.id = `flag${data[i].id}`
        div.style.display = "relative"
        div.style.padding = "10px"
        div.style.border = "solid thin lightgrey"
        document.querySelector('#course').append(div)
        const check = document.createElement('i')
            check.className = "fas fa-check"
        div.append(submit)
        if (data[i].answer === null){
            
            button.style.display = "block"
        }
       else{
        button.style.display = "none"
        
            div.prepend(check)
           const element = document.createElement('div')
           element.innerHTML = `<strong>Answer</strong>: <i><u>${data[i].answer}</u></i>`
            div.append(element)
       }
        submit.style.display = "none"
        
        button.onclick = () => {
            
            if(textarea.style.display === "block"){
                button.innerHTML = "Answer"
                textarea.style.display = "none"
                submit.style.display = "none"

            }
            else{
                textarea.style.display = "block"
                button.innerHTML = "Unanswer"
                submit.style.display = "block"
                submit.onclick = () => {    
                        fetch(`answer/${submit.dataset.id}`,{
                            method: 'POST',
                            body : JSON.stringify({
                                ans:textarea.value
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            console.log("byebye")
                        var mu = document.createElement('div')
                        mu.id = "anwery"
                        mu.innerHTML = `<strong>Answer</strong>: <u><i>${textarea.value}</i></u>`
                        textarea.style.display = "none"
                        submit.style.display = "none"
                        div.append(mu)
                        div.prepend(check)
                        button.style.display="none"
                        })
                   
                }

            }
        }
        if(data[data.length -1 ] === true){
            document.querySelector('#course').append(button)
        }
        else{
            button.style.display = "none"
        }
        
    }
    })

}

function enroll(course){
    fetch(`/enrolled/${course}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.querySelector('#number').innerHTML = parseInt(data.length) -1
    })
}
function mycourse(){
    fetch("/mycourse")
    .then(response => response.json())
    .then(data => {
        document.querySelector('div.form-group').style.display = "none"
        document.querySelector('#course').style.display = "flex"
        document.querySelector('#course').style.animation = "tutti 1s ease"
        document.querySelector('#course').style.animationPlayState = "running"
        document.querySelector('#course').addEventListener('animationend',() => {
            document.querySelector('#course').style.animation = null

        })
        document.querySelector('#course').innerHTML  = ""
        document.querySelector('div#bg').innerHTML  = ""
    document.querySelector('div#bg').style.background = "none"
    document.querySelector('div#bg').style.height = "0%"
        console.log("hi")
        loop(data)
    })
}
function allcourses(){
fetch('/allposts')
.then(response => response.json())
.then(course =>{
    document.querySelector('div.form-group').style.display = "none"
    document.querySelector('#course').innerHTML  = ""
    document.querySelector('#course').style.animation = "tutti 1s ease"
        document.querySelector('#course').style.animationPlayState = "running"
        document.querySelector('#course').addEventListener('animationend',() => {
            document.querySelector('#course').style.animation = null

        })
    document.querySelector('#course').style.display = "flex"
    document.querySelector('div#bg').innerHTML  = ""
    document.querySelector('div#bg').style.background = "none"
    document.querySelector('div#bg').style.height = "0%"



    loop(course)
})
}
function view(id){
    document.querySelector('#course').innerHTML = ""
    document.querySelector('#course').style.display = "block"

    document.querySelector('div.form-group').style.display = "none"

    fetch(`/course/${id}`)
    .then(response => response.json())
    .then(course =>{
        console.log(course)
        document.querySelector('#bg').style.backgroundImage = `url(${course[0].image})`
        document.querySelector('#bg').style.backgroundRepeat = "no-repeat"
        document.querySelector('#bg').style.backgroundSize = "cover"
        document.querySelector('#bg').style.height = "40%"
        const element = document.createElement('div')
        var syllabus = course[0].syllabus
        const edit = document.createElement('button')
        edit.innerHTML = "Edit"
        var result = syllabus.replace(/,/g, "<li>");
        element.id = "preview"
        element.innerHTML = `
        <h3 id = "heading" data-name = ${course[0].course} style="text-align:center;padding:10px;">${course[0].course}</h3>
        <button id="edit" class = "btn btn-primary">Edit Syllabus</button><button id = "goto" class = "btn btn-primary" >Lectures</button>
        <div id = "edit"><small id="emailHelp" class="form-text text-muted">Add a comma after every syllabus content</small>

        <textarea class = "form-control" id = "syllabus">${course[0].syllabus}</textarea>

        <button id="Edity" class = "btn btn-primary">Submit</button>
            </div>
        <div>Created by: ${course[0].createdby}</div>
        <strong>Syllabus:</strong>
        <ol><li>${result}</ol>
        
        No. of students that have signed up : <span id="number"></span> <br>
        <button id="add" class = "btn btn-primary"></button><br>
        <button id = "lecture" class = "btn btn-primary">Lecutres</button>
        `
        
        document.querySelector('#course').append(element)
        document.querySelector('div#edit').style.display = "none"

        if (course[1] === course[0].createdby){           
            document.querySelector('button#edit').style.display = "block"
            document.querySelector('button#goto').style.display = "block"

              
            console.log("hi")
        }
        else{
            document.querySelector('button#edit').style.display = "none"
            document.querySelector('button#goto').style.display = "none"


        }
        document.querySelector('button#goto').onclick = () => {
            lecture(course[0].course)

        }

        document.querySelector('button#edit').onclick = () => {
            if(document.querySelector('div#edit').style.display === 'block'){

                document.querySelector('div#edit').style.display = "none"
            }
            else{

                document.querySelector('div#edit').style.display = "block"

            }
        

        }
        document.querySelector('button#Edity').onclick = () =>{
            fetch(`/editsyllabus/${course[0].id}`,{
                method: 'POST',
                body: JSON.stringify({
                    "syllabus":document.querySelector('textarea#syllabus').value
                })
            })
            .then(response => response.json())
            .then(data => {
                document.querySelector('div#edit').style.display = "none"
                var syll = document.querySelector('textarea#syllabus').value
                var result = syll.replace(/,/g, "<li>");
                document.querySelector('ol').innerHTML = ""
                document.querySelector('ol').innerHTML = `<li>${result}`
                console.log(result)
                const animation = document.createElement('div')
            animation.className = "alert alert-success"
            animation.innerHTML = "Successfully Edited Syllabus"
            document.querySelector('div#preview').prepend(animation)
            animation.style.animationPlayState = "running"
            animation.addEventListener('animationend',() =>{
                animation.remove()
            })


            })
        }
        fetch(`/enrolled/${course[0].course}`)
        .then(response => response.json())
        .then(data => {
            var bool = data[data.length - 1]

            if (bool === true){
                document.querySelector('#add').innerHTML = "Unenroll"
                document.querySelector('button#lecture').style.display = "block"
            }
            else{
                document.querySelector('#add').innerHTML = "Enroll"
                document.querySelector('button#lecture').style.display = "none"

            }
        enroll(`${course[0].course}`)
        document.querySelector('button#add').onclick = () =>{
            add(course[0].course)
            console.log("hi")
        }
        document.querySelector('button#lecture').addEventListener('click', () => {
            lecture(course[0].course)
            console.log(course[0].course)
        })
    })}) 
}
function add(name){   
        
        if (document.querySelector('#add').innerHTML === "Enroll"){
           fetch(`/saveenroll/save/${name}`)
           .then(response => response.json())
           .then(data => {
            document.querySelector('#add').innerHTML = "Unenroll"
            document.querySelector('span#number').innerHTML = parseInt(document.querySelector('span#number').innerHTML) + 1
            document.querySelector('button#lecture').style.display = "block"
            const div = document.createElement('div')
            div.className = "alert alert-success"
            div.innerHTML = "Successfully Enrolled"
            
            document.querySelector('div#preview').prepend(div)
            div.style.animationPlayState = "running"
            div.addEventListener('animationend',() =>{
                div.remove()
            })
           }) 
    }
    else{
        fetch(`/saveenroll/delete/${name}`)
           .then(response => response.json())
           .then(data => {
            document.querySelector('#add').innerHTML = "Enroll"
            document.querySelector('span#number').innerHTML = parseInt(document.querySelector('span#number').innerHTML) - 1
            document.querySelector('button#lecture').style.display = "none"
            const div = document.createElement('div')
            div.className = "alert alert-danger"
            div.innerHTML = "Successfully Removed"
            div.style.textAlign = "center"
            
            document.querySelector('div#preview').prepend(div)
            div.style.animationPlayState = "running"
            div.addEventListener('animationend',() =>{
                div.remove()
            })
           })

    }
}
function lecture(name){
   fetch(`/lecturej/${name}`)
   .then(response => response.json())
   .then(data => {
    var arrayLength = data.length - 1;
    console.log(data)
    document.querySelector('#preview').style.display = "none"
    const heading = document.createElement('h3')
    heading.innerHTML = name
    heading.style.textAlign = "center"
    document.querySelector("#course").append(heading)
    
    const edit = document.createElement('button')
    edit.className = "btn btn-primary"
    edit.innerHTML = "Add Lectures"
    edit.dataset.name = `${data[0].course}`
    edit.style.margin= "auto"
    edit.style.display = "grid"
    const testing = document.createElement('div')
    testing.id = "testing"
    document.querySelector('#course').append(edit)
    document.querySelector('#course').append(testing)
console.log("lecture")
    const add = document.createElement('div')
    add.id = "shit"
    add.innerHTML = `
    <label>Heading:</label><input id = "heading" type="text" class = "form-control">
    <label>Link:</label><input id = "link" type = "url" class = "form-control">
    <button id = "addy" class = "btn btn-primary" data-name = ${data[0].course}>Add</button>

    `
    add.style.display = "none"
    if (data[2] === data[0].teacher){
        edit.style.display = "block"
    }
    else if(data[data.length-1] === data[0].teacher){
        edit.style.display = "block"

    }
    else{
        edit.style.display = "none"

    }
    edit.onclick= () =>{
        if (add.style.display === "block"){
            
            add.style.animationPlayState = "running"
            add.style.display = "none"
            
            console.log(add.style.animationName)
        }
        else{
            add.style.display ="block"
            console.log(add.style.animationName)

        }
    }
    document.querySelector('#course').append(add)
    document.querySelector('button#addy').onclick = () => {
        fetch(`addlecture/${edit.dataset.name}`,{
            method: 'POST',
            body : JSON.stringify({
                heading:document.querySelector('input#heading').value,
                url:document.querySelector('input#link').value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            add.style.display = "none"
            const animation = document.createElement('div')
            animation.className = "alert alert-success"
            animation.innerHTML = "Successfully Added Lecture"
            testing.prepend(animation)
            animation.style.animationPlayState = "running"
            animation.addEventListener('animationend',() =>{
                animation.remove()
            })
           
            document.querySelector('#preview').style.display = "none"
            const div= document.createElement('div')
            const icon = document.createElement('i')
            icon.className = "fas fa-chevron-up fa-2x"
            icon.style.top = "20px"
            icon.style.right = "10px"
            icon.style.position = "absolute"
            icon.style.cursor = "pointer"
            div.id = "click"
            div.innerHTML = `<strong>${document.querySelector('input#heading').value}</strong><div><span id ="timestamp">${data[0].timestamp}</span></div>` 
             div.style.textAlign = "center"
             div.style.border = "thin solid lightgray"
             div.style.padding = "15px"
             div.style.position = "relative"
             div.style.width = "70%"
             div.style.margin = "auto"
     
             const video = document.createElement('iframe')
             video.id = "video"
             video.src = document.querySelector('input#link').value
             video.style.width = "60%"
             video.style.position ="relative"
             video.style.right = "10px"
             video.style.left = "10px"
             video.style.marginTop = "10px"
             video.style.margin = "auto"
     
             video.style.height = "500px"
             const textarea  = document.createElement('textarea')
             textarea.id = "text"
             textarea.className= "form-control"
             textarea.style.width = "60%"
             textarea.style.position = "relative"
             textarea.style.margin = "auto"
             textarea.style.right = "10px"
             textarea.style.left = "10px"
             textarea.placeholder = "Submit Query"
             const button = document.createElement('div')
             div.dataset.name = `${data[0].id}`
             button.innerHTML = "<button class = 'btn btn-primary'>Submit Query</button>"
             button.id = "subm"
             button.style.position = "relative"
             button.style.width = "60%"
     
             button.style.margin = "auto"
             button.style.right = "10px"
             button.style.left = "10px"
            div.append(icon)
            
            testing.prepend(div)
            testing.prepend(video)
     
            testing.prepend(textarea)
            testing.prepend(button)
            video.style.display = "none"
            button.style.display = "none"
            textarea.style.display = "none"
            icon.onclick = () => {
                if (video.style.display === "none"){
                    video.style.display = "block"
                    video.style.animationName = "slide" 
                    video.style.animationPlayState = "running"
        
                    video.style.display = "block"
                    icon.className = "fas fa-chevron-down fa-2x"
                    button.style.display = "block"
                    textarea.style.display = "block"
                   
                    
                   }
                   else if(video.style.display !== 'none'){
                    video.style.display = "block"
        
                    video.style.animationName = "unslide"
                    
                    video.style.animationPlayState = "running"
        
        
                    icon.className = "fas fa-chevron-up fa-2x"
                    button.style.display = "none"
                    textarea.style.display = "none"
                    video.addEventListener('animationend',() => {
                        video.style.display = "none"
                    })
                           }
             
     
            }

        })

    }
    if(data[1] === null){
console.log(data[1])    
    }
    else{

    
    for (var i = 0; i < arrayLength; i++) {

       document.querySelector('#preview').style.display = "none"
       
       heading.style.textAlign = "center"
       const div= document.createElement('div')
       const icon = document.createElement('i')
       icon.className = "fas fa-chevron-up fa-2x"
       icon.style.top = "20px"
       icon.style.right = "10px"
       icon.style.position = "absolute"
       icon.style.cursor = "pointer"
       div.id = "click"
       div.innerHTML = `<strong>${data[i].heading}</strong><div><span id ="timestamp">${data[i].timestamp}</span></div>` 
        div.style.textAlign = "center"
        div.style.border = "thin solid lightgray"
        div.style.padding = "15px"
        div.style.position = "relative"
        div.style.width = "70%"
        div.style.margin = "auto"

        const video = document.createElement('iframe')
        video.src = data[i].lecture
        video.style.width = "60%"
        video.style.position ="relative"
        video.style.right = "10px"
        video.style.left = "10px"
        video.style.marginTop = "10px"
        video.style.margin = "auto"
        video.id = "video"
        video.style.height = "500px"
        const textarea  = document.createElement('textarea')
        textarea.id = "text"
        textarea.className= "form-control"
        textarea.style.width = "60%"
        textarea.style.position = "relative"
        textarea.style.margin = "auto"
        textarea.style.right = "10px"
        textarea.style.left = "10px"
        textarea.placeholder = "Submit Query"
        const button = document.createElement('div')
        
        button.innerHTML = "<button id = 'bye' class = 'btn btn-primary'>Submit Query</button>"
        button.id = "subm"
        button.style.position = "relative"
        button.style.width = "60%"
        button.dataset.name = data[i].id
        button.style.margin = "auto"
        button.style.right = "10px"
        button.style.left = "10px"
       div.append(icon)
       document.querySelector('#course').append(div)
       document.querySelector('#course').append(video)

       document.querySelector('#course').append(textarea)
       document.querySelector('#course').append(button)

       video.style.display = "none"
       button.style.display = "none"
       textarea.style.display = "none"
       icon.onclick = () => {
        if (video.style.display === "none"){
            video.style.display = "block"

            video.style.animationName = "slide" 
            video.style.animationPlayState = "running"

            video.style.display = "block"
            icon.className = "fas fa-chevron-down fa-2x"
            button.style.display = "block"
            textarea.style.display = "block"
           
            
           }
           else if(video.style.display !== 'none'){
            video.style.display = "block"

            video.style.animationName = "unslide"
            
            video.style.animationPlayState = "running"


            icon.className = "fas fa-chevron-up fa-2x"
            button.style.display = "none"
            textarea.style.display = "none"
            video.addEventListener('animationend',() => {
                video.style.display = "none"
            })
                   }
        button.onclick=() =>{
            console.log(button.dataset.name)
            fetch(`addquery/${button.dataset.name}`,{
                method: 'POST',
                body : JSON.stringify({
                    question:textarea.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    button.style.display = "none"

                    const animation = document.createElement('div')
            animation.className = "alert alert-success"
            animation.innerHTML = "Successfully Added Query"
            testing.prepend(animation)
            animation.style.animationPlayState = "running"
            animation.addEventListener('animationend',() =>{
                animation.remove()
            })
                    
                })
            

        }

       }
       console.log(data)
   }}})
}
   

function loop(course){
    var arrayLength = course.length ;
    for (var i = 0; i < arrayLength; i++) {
        console.log(course[i].id)

    const element = document.createElement('div')
    element.dataset.id = `${course[i].id}` 
    const a = course[i].course
    const b = course[i].image
    const c = course[i].createdby
    element.id = "elementy"
        element.innerHTML = ` <div id="image">
        <img style = "width : 100%;height:200px; border-top-right-radius:10px; border-top-left-radius: 10px;"src = ${b}>
        </div>
        <div style = "text-align:center; padding-top: 10px; padding-bottom: 10px;" id = "title">
        ${a}
        </div>
         `
    element.style.width = "400px"
    element.style.border = "thin solid gray"
    element.style.borderRadius = "10px"
    element.style.cursor = "pointer"
    element.style.margin = "20px"
    element.style.display = "inline-block"
    document.querySelector('#course').append(element)
    element.addEventListener('click', function()  {
        view(element.dataset.id)
    })
}}
