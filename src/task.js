
// Question 4

let newObj = {
    ...person,
    ...student
}

console.log(newObj)


let result = Object.assign({}, person, student)
console.log(result)




// function getGoogleHomePage(finalCallBack){
// request('http://www.google.com', function (error, response, body) {
// console.error('error:', error); // Print the error if one occurred
// finalCallBack(error);
// console.log('statusCode:', response && response.statusCode); 
// console.log('body:', body); 
// finalCallBack(null,body);
// });
// };




// Question 5


const request = require('request');
function getGoogleHomePage(url){
    return new Promise((resolve,reject)=>{
        request(url,function(err,response){
            if(err){
                reject(err)
            }else{
                resolve(response)
            }
        })
    })
}

getGoogleHomePage('http://www.google.com').then((response)=>{
    console.log(response);
}).catch((error)=>{
    console.log(error);
})


// Question 6

let arr = [1,2,3,4,5,7];

let n = arr.length+1
let total = n * (n+1) /2
for(let i=0;i<arr.length;i++){
    total = total - arr[i]
}

console.log(total)
