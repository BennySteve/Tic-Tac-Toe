const winning=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

let gameTiles=[]
console.log(gameTiles)
let turnName=document.querySelector('.name')
let numberOfTurns=0

const game=(function(){
  const tiles=document.querySelectorAll('.tile')
  const p1=user()
  const p2=user()
  let submit=document.querySelector('.submit')
  let ga=document.querySelector('.game-area')
  submit.addEventListener("click",()=>{
      let pname1,pname2
      var nameTurn
      pname1=document.querySelector('#player1')
      pname2=document.querySelector('#player2')
      p1.name=pname1.value
      checkName(p1.name)
      p1.marker="X"
      p2.name=pname2.value
      p2.marker="O"
      dialog=document.querySelector('dialog')
      gameArea=document.querySelector('#game')
      dialog.setAttribute('style','display:none')
      ga.setAttribute('style','display:flex')
      gameArea.setAttribute('style','display:grid')
      let marker=[p1,p2]

      turnName.innerHTML=marker[0].name
  }
  )

  let marker=[p1,p2]
  let output=document.querySelector('.output')
  let resHtml=document.querySelector('.result')
  function clickTiles(){
    tiles.forEach(tile=>{
      tile.addEventListener('click',()=>{
          // marker.push(tile.getAttribute('id'))
          console.log('tile clicked')
          if(tile.innerHTML!=""){
            alert(`Already ${marker[numberOfTurns-1].name} placed there`)
          }else{
          if(numberOfTurns%2==0){
            tile.innerHTML=marker[0].marker
            marker[0].place.push(Number(tile.getAttribute('id')-1))
            gameTiles[Number(tile.getAttribute('id')-1)]=marker[0].marker
          }
          else{
            tile.innerHTML=marker[1].marker
            marker[1].place.push(Number(tile.getAttribute('id')-1))
            gameTiles[Number(tile.getAttribute('id')-1)]=marker[1].marker
          }
          // console.log(marker)
          // console.log(`1:${marker[0].place}&2:${marker[1].place}`)
          
          //console.log(checkWin(marker[(numberOfTurns%2)].name,marker[numberOfTurns%2].place)) 
          let res=checkWin(marker[(numberOfTurns%2)].name,marker[numberOfTurns%2].place)
          if(res!=undefined){
            if(res.condition=='Win'){
              output.classList.remove('hide')
              output.classList.add('show')
              resHtml.innerHTML=`Congrats!!  ${res.pName} Won!`
              // tiles.forEach(t=>{t.classList.add('disabled')})
              gameArea.classList.add('disabled')
            }
            else{
              output.classList.remove('hide')
              output.classList.add('show')
              resHtml.innerHTML=`It's a Draw!!`
              gameArea.classList.add('disabled')
            }
          }

           numberOfTurns++
           turnName.innerHTML=marker[numberOfTurns%2].name
          }
      })
  })
  }
      
  const reset=document.querySelector('.reset')
  reset.addEventListener('click',()=>{
      tiles.forEach(tile=>{
          tile.innerHTML=""
      })
      numberOfTurns=0
      marker[0].place=[]
      marker[1].place=[]
      gameTiles=[]
      output.classList.remove('show')
      output.classList.add('hide')
      clickTiles()
  })

  const quit=document.querySelector('.quit')
  quit.addEventListener('click',()=>{
    location.reload()
  })
  clickTiles()
})()

function checkWin(name,seq){
  let info
  if(gameTiles.length==9&&!(gameTiles.includes(undefined))){
    // console.log("draw")
    info={condition:'Draw'}
  }

  if(seq.length>=3){
    // console.log(seq)
  winning.forEach(v=>{
      let q=v
      let a=seq
      let t=q.every(i =>a.includes(i))
      // console.log(t)
      if(t){
        info={condition:"Win",pName:name}
      }
  })}
  
return info
  
}

function checkName(n){
if(n==""||n==undefined||n==null){
  alert("Name is empty")
}
}


function user(name,marker){
let score=0
let place=[]
return {name,marker,score,place}
}

