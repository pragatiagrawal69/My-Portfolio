const checkboxList = document.querySelectorAll('.checkbox')
const errorMsg = document.querySelector('.error');
const inputFields = document.querySelectorAll('.goal-input')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')

const allGoals = JSON.parse(localStorage.getItem('allgoals')) ||{
 
}

checkboxList.forEach((checkbox1) =>{
    checkbox1.addEventListener('click', (e) => {
        const allGoalAdded = [...inputFields].every(function (input){
            
            return input.value
        })
    

        if (allGoalAdded){
        checkbox1.parentElement.classList.toggle('completed')
        progressValue.style.width = '33.33%';
        }
        else{
            progressBar.classList.add('show-error')
        }
    })
   
})

inputFields.forEach((input) => {
    input.value = allGoals[input.id].name

if(allGoals[input.id].completed) {
    input.parentElement.classList.add('completed')
}

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })
     input.addEventListener('input', (e) => {
        allGoals[input.id] = {
            name: input.value,
            completed: false
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})

