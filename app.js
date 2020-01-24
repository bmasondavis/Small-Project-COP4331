const allButtons = document.getElementById("button-grp");

allButtons.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }

  console.dir(event.target.id);

})

updateCon(){

}
