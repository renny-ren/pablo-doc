function select_text(obj){
  text = document.getElementById(obj.innerHTML.toLowerCase());
  if(obj.className == 'text-toggle-selected'){
    obj.className = "text-toggle";
    text.style.display = "none";
  }
  else{
    obj.className = "text-toggle-selected"; 
    text.style.display = "block";
  }  
}

// function select_all(){
//   document.getElementsByClassName('text-toggle').className = "text-toggle-selected"
// }