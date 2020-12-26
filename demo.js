console.log('Script start');
setTimeout(() => {
    console.log('setTimeout 1');
}, 0);
setTimeout(() => {
    console.log('setTimeout 2');
}, 0);
new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('Promise 1 resolved');
    },3000); 
    }).then(res => console.log(res))
    .catch(err => console.log(err));
new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('Promise 2 resolved');
    },1000);
       
    }).then(res => console.log(res))
    .catch(err => console.log(err));
console.log('Script End');