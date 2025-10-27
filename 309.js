console.log("morning folks!");


const student={
name:'sudhanshu',
rollno:1,
marks:100
};

console.log(student['name']);
console.log(student.rollno);
console.log(student.marks);
console.log(student['marks']);

console.log(student['rollno']=student['rollno']+1);


let n=prompt('enter a no');
if (n%5==0){
    console.log('divisible by 5');
}
else{
    console.log('not divisible by 5');
}