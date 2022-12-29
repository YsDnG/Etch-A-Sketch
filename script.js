const container = document.querySelector('.container')
const column1= document.querySelector('.column1')
const column2= document.querySelector('.column2')
const size32= document.getElementById('size32')
const size16= document.getElementById('size16')
const colorSelector = document.getElementById('colorGrid')
let canSelect = false;

container.addEventListener('mousedown',() => canSelect = true)
container.addEventListener('mouseup',()=> canSelect= false)

size16.addEventListener('change',drawOnGrid)
size32.addEventListener('change',drawOnGrid)

let colorSelected = "black"
colorSelector.addEventListener('change',() => 
{
    colorSelected = colorSelector.value
})

function changecolor(e)
{
    colorSelected = this.value
}


function drawOnGrid(e)
{
    let sizeGrid= null
    if(this.id.includes('16'))
    {
        size32.checked=false
        resetgrid()
        sizeGrid = 64
        container.style.gridTemplateRows ="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        container.style.gridTemplateColumns ="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
    }
    else
    {
        size16.checked=false
        sizeGrid = 256
        resetgrid()
        container.style.gridTemplateRows ="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr "
        container.style.gridTemplateColumns ="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
    }
    
    
    if(this.checked)
    {
       createGrid(sizeGrid)
        const divInsideContainer = document.querySelectorAll('.divGrid')

        divInsideContainer.forEach(d=> {  
            ['mousedown' ,'mouseover'].forEach(function(e){
                    d.addEventListener(e,()=>{
                        if(!canSelect && e !=='mousedown') return;
                        d.style.backgroundColor = colorSelected

                    })

            })
          
        });
        
    }
    else
    {
        
        while(container.firstChild)
        {
            container.removeChild(container.firstChild)
        }
        
        
    }

   
}


function resetgrid()
{
    while(container.firstChild)
        {
            container.removeChild(container.firstChild)
            size16.checked=false 
            size32.checked=false 
        }
     
      

}
function createGrid(gridSize){

    for(i=0; i < gridSize ;i++)
    {
        let div = document.createElement('div')
        div.id='div'+i
        div.classList.add('divGrid')
        container.append(div)  
    }

    
}
   
document.getElementById('Reset').addEventListener('click',resetgrid)
  


 
   