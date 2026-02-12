// const button = document.getElementById('#button1');
// const para = document.getElementById('#text');

// function display() {
//     alert('Button Clicked');
//     if(para.style.display === "none"){
//         para.style.display = "block";
//     }
//     else{
//         para.style.display = "none";
//     }

// };
// button.addEventListener('click', display);

const btn = document.getElementById("button2");
const box = document.getElementById("box1");
let i = 0;
btn.addEventListener("click",  () => {
    let color = document.getElementById("col");
    const colorlist = ["red", "blue", "green", "yellow", "orange"];        
    box.style.backgroundColor = colorlist[color.value - 1];
   color.value = "";
});



