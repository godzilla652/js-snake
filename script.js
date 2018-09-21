document.addEventListener('DOMContentLoaded', sizer)
function sizer(){
  if(window.innerWidth < 1300 || window.innerHeight < 625){
    let body = document.getElementsByTagName('body')
    body[0].innerHTML = 'WIDTH>=1366, HEIGHT>= 675 ONLY...'
  }
}
document.addEventListener('DOMContentLoaded', controls)
function controls(){
  //controls
  let controls_string = "p - up"+'          '+"l - left"+'          '+"; - down"+'          '+"'- right"+'          '+"SPACE - START"
  let controls_link = document.getElementById('controls')
  controls_link.onclick = ()=>{alert(controls_string)}
  //restart
  let restart_link = document.getElementById('restart')
  restart_link.onclick = ()=>{document.location.reload()}
}
document.addEventListener('DOMContentLoaded', streamline)
function streamline(){
  let rowCollection = document.querySelectorAll('#game_monitor .gamerow')
  let rowArray = Array.from(rowCollection)
  let rowPos = 0
  rowArray.forEach(function(current, index, array){
    let currentBrickCollection = current.querySelectorAll('.brick')
    let currentBrickArray = Array.from(currentBrickCollection)
    let brickPos = 0
    currentBrickArray.forEach(function(current, index, array){
      current.setAttribute('id', '_'+rowPos+'_'+brickPos)
      brickPos++
    })
    rowPos++
  })
}

document.addEventListener('DOMContentLoaded', game)
function game(){
  let started = false
  let vectors = ['left', 'up', 'right', 'down']
  let current_vector = vectors[2]
  let head_start_coords = [3,6]
  let head_coords = head_start_coords
  let body_start_coords = [[3,2],[3,3],[3,4],[3,5]]
  let body_coords = body_start_coords
  let full_body_coords = []
  full_body_coords.push(body_coords[0])
  full_body_coords.push(body_coords[1])
  full_body_coords.push(body_coords[2])
  full_body_coords.push(body_coords[3])
  full_body_coords.push(head_coords)

  let gameInterval = null
  let scoreTimer = 0

  function colorBody(){
    full_body_coords.forEach(function(item){
      colorBlock(item)
    })
  }
  function uncolorBody(){
    full_body_coords.forEach(function(item){
      uncolorBlock(item)
    })
  }
  function colorBlock(coordsArray){
    document.getElementById('_'+coordsArray[0]+'_'+coordsArray[1]).setAttribute('class','brick active')
  }
  function uncolorBlock(coordsArray){
    document.getElementById('_'+coordsArray[0]+'_'+coordsArray[1]).setAttribute('class','brick')
  }

  document.onkeydown = function(event){
      if(event.keyCode == 80){
        moveup()
      }
      if(event.keyCode == 76){
        moveleft()
      }
      if(event.keyCode == 186){
        movedown()
      }
      if(event.keyCode == 222){
        moveright()
      }
      if(event.keyCode == 32){
        if(started){stopGame()}
        else{
          startGame();
          started = true
        }
      }
  }

  function moveright(){
    if(current_vector == 'left'){return}
    current_vector = 'right'
  }

  function moveleft(){
    if(current_vector == 'right'){return}
    current_vector = 'left'
  }
  function moveup(){
    if(current_vector == 'down'){return}
    current_vector = 'up'
  }
  function movedown(){
    if(current_vector == 'up'){return}
    current_vector = 'down'
  }


 colorBody()


function snakeAlgorithm(){
  let box1 = []
  let box2 = []
   if(full_body_coords.length % 2 == 0)
   {
     for(let i = full_body_coords.length-1; i >= 0; i--){
   //if last element, means head
    if(i == full_body_coords.length-1)
    {
      box1[0] = full_body_coords[i][0]
      box1[1] = full_body_coords[i][1]
    }
    //if first element, means tail
    else if(i == 0)
    {
      full_body_coords[i][0] = box1[0]
      full_body_coords[i][1] = box1[1]
    }
    //main logic
    else
    {
      if((i % 2) == 0)
      {
        box2[0] = full_body_coords[i][0]
        box2[1] = full_body_coords[i][1]

        full_body_coords[i][0] = box1[0]
        full_body_coords[i][1] = box1[1]
      }
      else
      {
        box1[0] = full_body_coords[i][0]
        box1[1] = full_body_coords[i][1]

        full_body_coords[i][0] = box2[0]
        full_body_coords[i][1] = box2[1]
      }
    }
  }
}
  else if(full_body_coords.length % 2 != 0){
    for(let i = full_body_coords.length-1; i >= 0; i--){
    //if last element, means head
    if(i == full_body_coords.length-1)
    {
      box1[0] = full_body_coords[i][0]
      box1[1] = full_body_coords[i][1]
    }
    //if first element, means tail
    else if(i == 0)
    {
      full_body_coords[i][0] = box2[0]
      full_body_coords[i][1] = box2[1]
    }
    //main logic
    else
    {
      if((i % 2) == 0){
        box1[0] = full_body_coords[i][0]
        box1[1] = full_body_coords[i][1]

        full_body_coords[i][0] = box2[0]
        full_body_coords[i][1] = box2[1]
      }
      else
      {
        box2[0] = full_body_coords[i][0]
        box2[1] = full_body_coords[i][1]

        full_body_coords[i][0] = box1[0]
        full_body_coords[i][1] = box1[1]
      }
    }
  }
  }
}

function stopGame(){
  clearInterval(gameInterval)
  started = false
}
function startGame(){
  let food = []
  gameInterval = setInterval(gameProcess, 70)
}

function snakeEatSnake(){
  full_body_coords.forEach(function(item, index){
    if(index == full_body_coords.length - 1){return}
    else if(item[0] == full_body_coords[full_body_coords.length-1][0] && item[1] == full_body_coords[full_body_coords.length-1][1]){endSound.play();alert('Game over! Your score: '+scoreTimer); document.location.reload()}
  })
}
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}
function setFood(){
  let rows = 19
  let cols = 27
  let food_row = randomInteger(0,rows)
  let food_col = randomInteger(0,cols)
  food = [food_row, food_col]
  full_body_coords.forEach(function(item){
    if(food[0] == item[0] && food[1] == item[1]){setFood()}
  })
  let foodDOM = document.getElementById('_'+food[0]+'_'+food[1])
  foodDOM.setAttribute('class', 'brick active')
  foodDOM.querySelectorAll('.brick_inside')[0].setAttribute('class', 'brick_inside food')
}
function unsetFood(){
  let foodDOM = document.getElementById('_'+food[0]+'_'+food[1])
  foodDOM.setAttribute('class', 'brick')
  foodDOM.querySelectorAll('.brick_inside')[0].setAttribute('class', 'brick_inside')
}
function growBody(a,b){
    let temp = [a, b]
    full_body_coords.unshift(temp)
}
function snakeEatFood(){
  if(full_body_coords[full_body_coords.length-1][0] == food[0] && full_body_coords[full_body_coords.length-1][1] == food[1]){
      eatSound.play()
      unsetFood()
      growBody(full_body_coords[0][0],full_body_coords[0][1])
      colorBody()
      setFood()

      scoreTimer += 13
      document.getElementById('score').textContent = ''+scoreTimer
  }
}

setFood()
function gameProcess(){

  if(current_vector == 'right'){
    uncolorBody()
    snakeAlgorithm()
    full_body_coords[full_body_coords.length-1][1]++
    if(full_body_coords[full_body_coords.length-1][1] == 28)
    {
      full_body_coords[full_body_coords.length-1][1] = 0
    }
    colorBody()
  }
  if(current_vector == 'left'){
    uncolorBody()
    snakeAlgorithm()
    full_body_coords[full_body_coords.length-1][1]--
    if(full_body_coords[full_body_coords.length-1][1] == -1)
    {
      full_body_coords[full_body_coords.length-1][1] = 27
    }
    colorBody()
  }
  if(current_vector == 'up'){
    uncolorBody()
    snakeAlgorithm()
    full_body_coords[full_body_coords.length-1][0]--
    if(full_body_coords[full_body_coords.length-1][0] == -1)
    {
      full_body_coords[full_body_coords.length-1][0] = 19
    }
    colorBody()
  }
  if(current_vector == 'down'){
    uncolorBody()
    snakeAlgorithm()
    full_body_coords[full_body_coords.length-1][0]++
    if(full_body_coords[full_body_coords.length-1][0] == 20)
    {
      full_body_coords[full_body_coords.length-1][0] = 0
    }
    colorBody()
  }

  snakeEatSnake()
  snakeEatFood()

}

function snakeEatSound(){
  this.sound = document.createElement('audio')
  this.source = document.createElement('source')
  this.source.setAttribute('src', './pacman_eatfruit.wav')
  this.sound.appendChild(source)
  this.sound.setAttribute('controls', 'none')
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute('id', 'eatSound')
  this.sound.style.display = 'none'
  document.body.appendChild(this.sound)
  this.sound.volume = 0.3
}
snakeEatSound()
function snakeEndSound(){
  this.sound = document.createElement('audio')
  this.source = document.createElement('source')
  this.source.setAttribute('src', './nes-01-06.wav')
  this.sound.appendChild(source)
  this.sound.setAttribute('controls', 'none')
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute('id', 'endSound')
  this.sound.style.display = 'none'
  document.body.appendChild(this.sound)
  this.sound.volume = 1
}
snakeEndSound()


//start
let start_link = document.getElementById('start')
start_link.onclick = ()=>{
  if(started){return}
  startGame();
  started = true
}
//stop
let stop_link = document.getElementById('stop')
stop_link.onclick = ()=>{stopGame()}


}//end of game function
