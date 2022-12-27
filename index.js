

let store = Redux.createStore(reducer);

let counter = store.getState();

const h1 = document.querySelector('h1');
const inc = document.querySelector('.inc');
const dec = document.querySelector('.dec');
const reset = document.querySelector('.reset');
const step = document.querySelectorAll('.step');
const max = document.querySelectorAll('.max');

h1.innerText = counter;

let stepValue;
for (let i = 0; i < step.length; i++) {
    step[i].addEventListener('click', (event) => {
        stepValue = Number(event.target.value);
    });
}

let maxValue;
for (let i = 0; i < max.length; i++) {
    max[i].addEventListener('click', (event) => {
        maxValue = Number(event.target.value);
    });
}


// Dispatching action
inc.addEventListener('click', () => {
    store.dispatch({
        type: 'inc',
        step: stepValue || 1,
        max: maxValue || Infinity,
    })
});
dec.addEventListener('click', () => {
    store.dispatch({
        type: 'dec',
        step: stepValue || 1,
        max: maxValue || Infinity,
    })
});
reset.addEventListener('click', () => {
    store.dispatch({ type: 'reset' })
});

// Subscribing state
store.subscribe(() => {
    counter = store.getState();
    h1.innerText = counter;
})


// Reducer function
function reducer(state = 0, action) {
    switch (action.type) {
        case 'inc':
            return state + (action.max > counter ? (action.step) : 0);
        case 'dec':
            return state - (action.max > counter ? (action.step) : 0);
        case 'reset':
            return 0;
        default:
            return state;
    }
}