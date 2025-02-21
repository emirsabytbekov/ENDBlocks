let score = 0;
 
 function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drArea() {
  const areas = document.querySelectorAll(".drag-area");
  areas.forEach(area => {
    area.addEventListener("mouseover", () => {

      area.parentElement.setAttribute("draggable", "true")
    });
  });
  console.log(areas);
}

  drArea();

  function Spawn(){
    isGameOver = false;
 
    fetch('figures.html')
      .then(response => response.text())
      .then(html => {
  
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
  
        // Получаем все элементы с классом "figure"
        const allFigures = Array.from(doc.querySelectorAll('.figure'));
  
        // Функция для выбора случайных фигур
        function getRandomFigures(arr, num) {
          const randomFigures = [];
          const usedIndexes = new Set();
  
          while (randomFigures.length < num) {
            const randomIndex = Math.floor(Math.random() * arr.length);
  
            // Проверяем, не был ли уже выбран этот индекс
            if (!usedIndexes.has(randomIndex)) {
              randomFigures.push(arr[randomIndex]);
              usedIndexes.add(randomIndex);
            }
          }
  
          return randomFigures;
        }
  
        const randomFigures = getRandomFigures(allFigures, 2);
  
        const spawner = document.querySelector('.blockSpawner');
        
        randomFigures.forEach(figure => {
          if (figure instanceof Node) {
            spawner.appendChild(figure);
  
            figure.addEventListener('dragstart', drag);
          }
        });
      });

      setTimeout(() => {
        checkGameOver();
      }, 200);
  }

  function allowDrop (ev) {
    ev.preventDefault();
  }

  function drop (ev) {
    if(isGameOver) return;
  
    ev.preventDefault();
    const block = ev.target;
    const blockID = parseInt(block.id);
    const data = ev.dataTransfer.getData("text");
    const droppedElement = document.getElementById(data);
    const children = Array.from(droppedElement.children);
  
  
  
    //check if we can place the figure
    if (droppedElement.classList.contains("t-shape")) {
      const tShapePositions = [blockID, blockID-1, blockID+8, blockID+1];
  
      canPlace = (tShapePositions.every(id => document.getElementById(id).children.length === 0) &&
        checkIfWithinField(1, 64, 8, blockID) &&
        checkIfWithinField(8, 64, 8, blockID) &&
        checkIfWithinField(57, 64, 1, blockID)
      );
    }
    
    if (droppedElement.classList.contains("l-shape")) {
      const lShapePositions = [blockID, blockID-8, blockID+8, blockID+9];
      canPlace = (lShapePositions.every(id => document.getElementById(id).children.length === 0) && 
        checkIfWithinField(8, 64, 8, blockID) &&
        checkIfWithinField(57, 64, 1, blockID)
      );
    }
  
    if (droppedElement.classList.contains("o-shape")) {
      const oShapePositions = [blockID-9, blockID-8, blockID-7, blockID-1, blockID, blockID+1, blockID+7, blockID+8, blockID+9];
      canPlace = (oShapePositions.every(id => document.getElementById(id).children.length === 0) &&
        checkIfWithinField(1,8,1, blockID) &&
        checkIfWithinField(1,64,8, blockID) &&
        checkIfWithinField(8,64,8, blockID) &&
        checkIfWithinField(57,64,1, blockID)
      );
    }
  
    if (droppedElement.classList.contains("i-shape")) {
      const iShapePositions = [blockID, blockID-8, blockID+8, blockID+16];
      canPlace = (iShapePositions.every(id => document.getElementById(id).children.length === 0) && 
        checkIfWithinField(1,8,1, blockID) &&
        checkIfWithinField(49,64,1, blockID)
      );
    }

    if (droppedElement.classList.contains("dash-shape")) {
      const iShapePositions = [blockID, blockID-1, blockID+1, blockID+2];
      canPlace = (iShapePositions.every(id => document.getElementById(id).children.length === 0) && 
        checkIfWithinField(1,64,8, blockID) &&
        checkIfWithinField(7,64,8, blockID) &&
        checkIfWithinField(8,64,8, blockID) 
      );
    }

    if (droppedElement.classList.contains("elongatedL-shape")) {
      const iShapePositions = [blockID, blockID-8, blockID+1, blockID+2];
      canPlace = (iShapePositions.every(id => document.getElementById(id).children.length === 0) && 
        checkIfWithinField(1,8,1, blockID) &&
        checkIfWithinField(7,64,8, blockID) &&
        checkIfWithinField(8,64,8, blockID) 
      );
    }

    if (droppedElement.classList.contains("z-shape")) {
      const iShapePositions = [blockID, blockID-9, blockID-8, blockID+1];
      canPlace = (iShapePositions.every(id => document.getElementById(id).children.length === 0) && 
        checkIfWithinField(1,8,1, blockID) &&
        checkIfWithinField(1,64,8, blockID) &&
        checkIfWithinField(8,64,8, blockID) 
      );
    }

    if (droppedElement.classList.contains("mirroredL-shape")) {
      const iShapePositions = [blockID, blockID-8, blockID+7, blockID+8];
      canPlace = (iShapePositions.every(id => document.getElementById(id).children.length === 0) && 
        checkIfWithinField(1,8,1, blockID) &&
        checkIfWithinField(1,64,8, blockID) &&
        checkIfWithinField(57,64,1, blockID) 
      );
    }

    if (droppedElement.classList.contains("smallO-shape")) {
      const iShapePositions = [blockID, blockID+1, blockID+8, blockID+9];
      canPlace = (iShapePositions.every(id => document.getElementById(id).children.length === 0) && 
        checkIfWithinField(8,64,8, blockID) &&
        checkIfWithinField(57,64,1, blockID)
      );
    }

    if (droppedElement.classList.contains("invertedT-shape")) {
      const iShapePositions = [blockID, blockID-8, blockID-1, blockID+1];
      canPlace = (iShapePositions.every(id => document.getElementById(id).children.length === 0) && 
        checkIfWithinField(1,8,1, blockID) &&
        checkIfWithinField(1,64,8, blockID) &&
        checkIfWithinField(8,64,8, blockID)
      );
    }
  
    
  
    if (!canPlace) {
      return;
    }
    children.forEach(child => {
      child.classList.remove("drag-area");
    });
  
    ev.target.appendChild(droppedElement);
    droppedElement.addEventListener("dragend", () => {
      droppedElement.draggable = false;
    });
  
    if (droppedElement.classList.contains("t-shape")) {
      document.getElementById(blockID).appendChild(children[3]);
      document.getElementById(blockID-1).appendChild(children[0]);
      document.getElementById(blockID+8).appendChild(children[1]);
      document.getElementById(blockID+1).appendChild(children[2]);
      ev.target.removeChild(document.getElementById(data));
    }
    
    if (droppedElement.classList.contains("l-shape")) {
      children[3].classList.remove("corner");
      children[3].classList.add("placed", "l");
      document.getElementById(blockID).appendChild(children[3]);
      document.getElementById(blockID-8).appendChild(children[0]);
      document.getElementById(blockID+8).appendChild(children[1]);
      document.getElementById(blockID+9).appendChild(children[2]);
      ev.target.removeChild(document.getElementById(data));
    }
  
    if (droppedElement.classList.contains("o-shape")) {
      document.getElementById(blockID-1).appendChild(children[0]);
      document.getElementById(blockID+1).appendChild(children[2]);
      document.getElementById(blockID).appendChild(children[1]);
      for (let i = 7; i<10; i++) {
        let tempId = blockID - i;
        let placedBlock = document.getElementById(tempId); 
        placedBlock.appendChild(children[15-i]);
        let tempId2 = blockID + i;
        let placedBlock2 = document.getElementById(tempId2); 
        placedBlock2.appendChild(children[i-4]);
      }
      ev.target.removeChild(document.getElementById(data));
    }
    
    if (droppedElement.classList.contains("i-shape")) {
      document.getElementById(blockID).appendChild(children[3]);
      document.getElementById(blockID-8).appendChild(children[0]);
      document.getElementById(blockID+8).appendChild(children[1]);
      document.getElementById(blockID+16).appendChild(children[2]);
      ev.target.removeChild(document.getElementById(data));
    }

    if (droppedElement.classList.contains("dash-shape")) {
      document.getElementById(blockID).appendChild(children[3]);
      document.getElementById(blockID-1).appendChild(children[0]);
      document.getElementById(blockID+1).appendChild(children[1]);
      document.getElementById(blockID+2).appendChild(children[2]);
      ev.target.removeChild(document.getElementById(data));
    }
    
    if (droppedElement.classList.contains("elongatedL-shape")) {
      document.getElementById(blockID).appendChild(children[3]);
      document.getElementById(blockID-8).appendChild(children[0]);
      document.getElementById(blockID+1).appendChild(children[1]);
      document.getElementById(blockID+2).appendChild(children[2]);
      ev.target.removeChild(document.getElementById(data));
    }

    if (droppedElement.classList.contains("z-shape")) {
      document.getElementById(blockID).appendChild(children[3]);
      document.getElementById(blockID-9).appendChild(children[0]);
      document.getElementById(blockID-8).appendChild(children[1]);
      document.getElementById(blockID+1).appendChild(children[2]);
      ev.target.removeChild(document.getElementById(data));
    }

    if (droppedElement.classList.contains("mirroredL-shape")) {
      document.getElementById(blockID).appendChild(children[3]);
      document.getElementById(blockID-8).appendChild(children[0]);
      document.getElementById(blockID+7).appendChild(children[1]);
      document.getElementById(blockID+8).appendChild(children[2]);
      ev.target.removeChild(document.getElementById(data));
    }

    if (droppedElement.classList.contains("smallO-shape")) {
      document.getElementById(blockID).appendChild(children[3]);
      document.getElementById(blockID+1).appendChild(children[0]);
      document.getElementById(blockID+8).appendChild(children[1]);
      document.getElementById(blockID+9).appendChild(children[2]);
      ev.target.removeChild(document.getElementById(data));
    }

    if (droppedElement.classList.contains("invertedT-shape")) {
      document.getElementById(blockID).appendChild(children[3]);
      document.getElementById(blockID-8).appendChild(children[0]);
      document.getElementById(blockID-1).appendChild(children[1]);
      document.getElementById(blockID+1).appendChild(children[2]);
      ev.target.removeChild(document.getElementById(data));
    }


    DeleteLines();

    //added timeout to update DOM
    setTimeout(() => {
      //added check for possibility to place figures after every move
      if (document.querySelector(".blockSpawner").children.length === 0) {
       Spawn();
       setTimeout(() => {
        drArea();
      }, 200);
      }
      
      setTimeout(() => {
        checkGameOver();
      }, 200);

    }, 200);
  }
  
function DeleteLines() {
    const cellsToDelete = new Set(); // Используем Set, чтобы избежать дублирования
  
    // Проверяем ряды
    for (let j = 0; j < 8; j++) { 
      let rowStartID = 1 + j * 8;
      if (checkRow(rowStartID)) {
        for (let k = 0; k < 8; k++) {
          cellsToDelete.add(rowStartID + k);
        }
      }
    }
  
    // Проверяем колонки
    for (let j = 1; j <= 8; j++) {
      if (checkColumn(j)) {
        for (let k = 0; k < 8; k++) {
          cellsToDelete.add(j + k * 8);
        }
      }
    }
    score += cellsToDelete.size;
    const scoreValue = document.querySelector(".score");
    scoreValue.textContent = "SCORE: " + score;
    // Удаляем все ячейки
    cellsToDelete.forEach(cellID => {
      const block = document.getElementById(cellID);
      if (block && block.firstElementChild) {
        block.removeChild(block.firstElementChild);
      }
    });
   
  }
  
  function checkColumn(colStartID) {
    const numRows = 8;
    for (let i = 0; i < numRows; i++) {
      const block = document.getElementById(colStartID + i * 8);
      if (!block || block.children.length === 0) {
        return false;
      }
    }
    return true;
  }
  
  function checkRow(rowStartID) {
    const numCol = 8; // Количество блоков в ряду
    for (let i = 0; i < numCol; i++) {
      const block = document.getElementById(rowStartID + i);
      if (!block || block.children.length === 0) {
        return false;
      }
    }
    return true;
  }

  function checkIfWithinField (floor, ceil, step, blockID) {
    for (let i = floor; i <= ceil; i+=step) {
      if (blockID === i) {
        return false;
      }
    }
    return true;
  }

  function canPlaceFigure() {
    const spawner = document.querySelector('.blockSpawner');
    if (!spawner) return false;
    const figures = spawner.querySelectorAll('.figure');
    
    for(const figure of figures) {
  
      for(let blockId = 1; blockId <= 64; blockId++) {
        const block = document.getElementById(blockId);
        if(!block || block.children.length > 0) continue;
            
        let canPlace = false; // спорно тру или фолз
        const positions = [];
  

        if(figure.classList.contains('t-shape')) {
          for (let i=0; i<8; i++){ 
            if (blockId !== i*8+1  &&  blockId !== i*8+8  &&  blockId !== i+57){
              positions.push(blockId, blockId-1, blockId+8, blockId+1);
            }
           }
        } 
        
        else if(figure.classList.contains('l-shape')) {
          for (let i=0; i<8; i++){ 
            if (blockId !== i*8+8  &&  blockId !== i+57){
              positions.push(blockId, blockId-8, blockId+8, blockId+9);
            }
           }  
        } 
  
        else if(figure.classList.contains('o-shape')) {
         for (let i=0; i<8; i++){ 
          if (blockId !== i+1  &&  blockId !== i+57 &&
              blockId !== i*8+1  &&  blockId !== i*8+8){
            positions.push(
            blockId-9, blockId-8, blockId-7, 
            blockId-1, blockId, blockId+1, 
            blockId+7, blockId+8, blockId+9
          );
          }
         }
        } 
  
        else if(figure.classList.contains('i-shape')) {
          for (let i=0; i<8; i++){
            if (blockId !== i+1  &&  blockId !== i+49  &&  blockId !== i+57){
              positions.push(blockId, blockId-8, blockId+8, blockId+16);  
            }
          }
        } 

        else if(figure.classList.contains('dash-shape')) {
          for (let i=0; i<8; i++){
            if (blockId !== i*8+1  &&  blockId !== i*8+7  &&  blockId !== i*8+8){
              positions.push(blockId, blockId-1, blockId+1, blockId+2);  
            }
          }
        } 

        else if(figure.classList.contains('elongatedL-shape')) {
          for (let i=0; i<8; i++){
            if (blockId !== i+1  &&  blockId !== i*8+7  &&  blockId !== i*8+8){
              positions.push(blockId, blockId-8, blockId+1, blockId+2);  
            }
          }
        } 

        else if(figure.classList.contains('z-shape')) {
          for (let i=0; i<8; i++){
            if (blockId !== i+1  &&  blockId !== i*8+1  &&  blockId !== i*8+8){
              positions.push(blockId, blockId-9, blockId-8, blockId+1);  
            }
          }
        } 

        else if(figure.classList.contains('mirroredL-shape')) {
          for (let i=0; i<8; i++){
            if (blockId !== i+1  &&  blockId !== i*8+1  &&  blockId !== i+57){
              positions.push(blockId, blockId-8, blockId+7, blockId+8);  
            }
          }
        } 

        else if(figure.classList.contains('smallO-shape')) {
          for (let i=0; i<8; i++){
            if (blockId !== i*8+8  &&  blockId !== i+57){
              positions.push(blockId, blockId+1, blockId+8, blockId+9);  
            }
          }
        }

        else if(figure.classList.contains('invertedT-shape')) {
          for (let i=0; i<8; i++){
            if (blockId !== i+1  &&  blockId !== i*8+1  &&  blockId !== i*8+8){
              positions.push(blockId, blockId-8, blockId-1, blockId+1);  
            }
          }
        } 


          
        canPlace = positions.every(id => {
          const el = document.getElementById(id);
          return el !== null && id >= 1 && id <= 64 && el.children.length === 0;
        });
         
        if(canPlace) {
          return true
        };
      }
    }
    return false;
  }
  
  let isGameOver = false;
  
  function checkGameOver() {
    if (isGameOver) return true;
  
    //add timeout to update DOM
    setTimeout(() => {
  
      const spawner = document.querySelector('.blockSpawner');
      if (!spawner) return;
      const canPlace = canPlaceFigure();
  
      if(!canPlace && spawner.children.length > 0) {
        isGameOver = true;
        alert('You lose!!!');
        //make all figures undraggable
        document.querySelectorAll('.figure').forEach(f => {
          f.draggable = false;
        });
        location.reload();
      }
    }, 300);
  }

  
