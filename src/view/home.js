export const home =() => {
    const templateHome=`   
          <h1>Inicio</h1>
          `
    const divElement = document.createElement('div');
    divElement.innerHTML= templateHome;
    return divElement;
  

};