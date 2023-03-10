/*Selects the DOM elements needed */
const container = document.querySelector('.container')
const column1= document.querySelector('.column1')
const column2= document.querySelector('.column2')
const size32= document.getElementById('size32')
const size16= document.getElementById('size16')
const sizeSlider = document.getElementById('sizeSlider')
const colorSelector = document.getElementById('colorGrid')
const displaySize = document.getElementById('sizeSliderDisplay')
const buttonErase = document.getElementById('Erase')
const buttonRainbow = document.getElementById('Rainbow')
/* ************************************************ */



/*Define global variables */

let sizeGrid= sizeSlider.value * sizeSlider.value
let canSelect = false;
let colorSelected = colorSelector.value
let isRainbowMode= false;
displaySize.innerHTML = `${sizeSlider.value }x${sizeSlider.value }`
const isMobileDevice = isMobile()
if(isMobileDevice)
    sizeSlider.setAttribute("max",20)

/* ************************************************ */

/* Define Menu Choice action */
buttonErase.addEventListener('click',(e)=>{
    isRainbowMode=false
    buttonRainbow.classList.remove('add-focus')
if(colorSelected!== 'white')
    {
        buttonErase.classList.add('add-focus')
        colorSelected='white'
    }
    else
    {
        buttonErase.classList.remove('add-focus')
        colorSelected =colorSelector.value
    }
})
/* Clear the grid and give a you new one*/
document.getElementById('Reset').addEventListener('click',resetgrid)

/* Change the color selected */
colorSelector.addEventListener('change',() => {colorSelected = colorSelector.value; isRainbowMode=false})

/* Rainbow mode*/

buttonRainbow.addEventListener('click',(e)=>{
    if(!isRainbowMode) 
    {
        buttonRainbow.classList.add('add-focus')
        buttonErase.classList.remove('add-focus')
        isRainbowMode = true; 
    }
    else 
    {
        buttonRainbow.classList.remove('add-focus')
        isRainbowMode = false;
    
    }
    })

/* ************************************************ */



/* Check if the user is on mobile device*/
if(!isMobileDevice)
{
    document.addEventListener('mouseup',()=> {
        
            canSelect=false  
    })
    document.addEventListener('mousedown',function(event){
 
        canSelect = true
    })
    
}

/* ************************************************ */

/* Cancel the drag and drop event by default on the container to prevent error while you draw*/
container.addEventListener('mousedown',(event)=>event.preventDefault())
sizeSlider.addEventListener('change',()=> {
    displaySize.innerHTML = `${sizeSlider.value }x${sizeSlider.value }`
    sizeGrid = sizeSlider.value*sizeSlider.value; 
    resetgrid()
})

/* ************************************************ */






  resetgrid()
    


function drawOnGrid()
{
    resetgrid()
    createGrid(sizeGrid)
    
}


function resetgrid()
{
    buttonRainbow.classList.remove('add-focus')
    buttonErase.classList.remove('add-focus')
    isRainbowMode=false
    while(container.firstChild)
        {
            container.removeChild(container.firstChild)
            
        }
        
        createGrid(sizeGrid)
        defineGridfr(sizeGrid,"")
        setupGrid()
        colorSelected=colorSelector.value

        

        
     
}



function setupGrid()
{
    const divInsideContainer = document.querySelectorAll('.divGrid')
      
              if(isMobileDevice)
              {
                  container.addEventListener('touchmove',(e)=>{
                      e.preventDefault();
      
                      const clientX = e.clientX || e.changedTouches[0].clientX;
                      const clientY = e.clientY || e.changedTouches[0].clientY;
      
                      divInsideContainer.forEach(d=> {
                         
                          if(document.elementFromPoint(clientX,clientY) === d)
                          {
                            if(isRainbowMode)
                            {
                                colorSelected = rgbToHex(Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255))
                            }
                              d.style.backgroundColor = colorSelected
                          }
      
                      })
                      },true)
      
                      divInsideContainer.forEach(d=>{
                          d.addEventListener('touchstart',(event)=>{
                            
                              d.style.backgroundColor = colorSelected
                          })
                      })
                  
              }
              else
              {
                

                
                  divInsideContainer.forEach(d=> {  
                      ['mousedown','mouseover'].forEach(function(e){
                           
                              d.addEventListener(e,()=>{
                                
                                 if(!canSelect && e =='mouseover') 
                                    return;
                                
                                if(isRainbowMode)
                                {
                                    colorSelected = rgbToHex(Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255))
                                }
                                d.style.backgroundColor = colorSelected;
                                
                                 
                              })
          
                     
                    
                  });
              });
        
        
            }
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }



/*Creates div and append them into the grid */
function createGrid(gridSize){
    for(i=0; i<gridSize ;i++)
    {
        let div = document.createElement('div')
        div.id='div'+i
        div.classList.add('divGrid')
        container.append(div)  
    }

    
}

/* Create de grid with the size choice */
function defineGridfr(sizeGrid)
{
        container.style.gridTemplateRows = "1fr ".repeat(Math.sqrt(sizeGrid))
        container.style.gridTemplateColumns = "1fr ".repeat(Math.sqrt(sizeGrid))
}

/* Check if a mobile device is used */
function isMobile() {
    let check = false;
    
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;
    })(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
   

  


 
   