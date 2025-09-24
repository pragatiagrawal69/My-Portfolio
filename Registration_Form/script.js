const heading = document.querySelector('h1')
const name = document.querySelector('.Name')
const button = document.querySelector('.login')
const signup = document.querySelector('.signup')

signup.onclick = ()=>{
    heading.textContent='Signup'
    name.style.display='block'
}
button.onclick = ()=>{
    heading.textContent='Login'
    name.style.display='none'
}