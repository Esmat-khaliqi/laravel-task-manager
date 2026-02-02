let moon = document.getElementById('icon_moon');
let sun = document.getElementById('icon_sun');
let body = document.body;


moon.addEventListener('click',()=>{
    moon.classList.remove('show');
    sun.classList.add('show');
    body.classList.add('dark');

})
sun.addEventListener('click',()=>{
    moon.classList.add('show')
    sun.classList.remove('show')
    body.classList.remove('dark');
})


const tabBtns = document.querySelectorAll('.tab-btn')
const content = document.querySelectorAll('.todo-list')
tabBtns.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        tabBtns.forEach(t=>t.classList.remove('todo-list-show'))
        content.forEach(c=>c.classList.remove('todo-list-show'))

        btn.classList.add('todo-list-show')
        document.getElementById(btn.dataset.target).classList.add('todo-list-show')
    })
})

document.addEventListener('click',(e)=>{
    const todoItemTask = e.target.closest('.task-header')
    if(todoItemTask){
        const directParent = todoItemTask.parentElement
        const arrowdown = todoItemTask.querySelector('.arrow')
        const details = todoItemTask.nextElementSibling;
        if(arrowdown){
            arrowdown.classList.toggle('arrow-change')
        }
        details.classList.toggle('task-content-show')
        directParent.classList.toggle('radius-none')
    }
})