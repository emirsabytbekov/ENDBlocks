function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}


function allowDrop (ev) {
    ev.preventDefault();
  }

  function drop (ev) {
  
    const block = ev.target;
    const blockID = parseInt(block.id)  ;
      ev.preventDefault();
      if (block.children.length>0) {
        return;
      }
      const data = ev.dataTransfer.getData("text");
      const droppedElement = document.getElementById(data);
      ev.target.appendChild(droppedElement);
      droppedElement.addEventListener("dragend", () => {
        droppedElement.draggable= false;  
    })
    const children = Array.from(droppedElement.children);
  if (droppedElement.classList.contains("t-shape")) {
    ev.target.removeChild(document.getElementById(data));
    document.getElementById(blockID).appendChild(children[3]);
    document.getElementById(blockID-1).appendChild(children[0]);
    document.getElementById(blockID+8).appendChild(children[1]);
    document.getElementById(blockID+1).appendChild(children[2])
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
    setTimeout(() => {
        //added check for possibility to place figures after every move
        if (document.querySelector(".blockSpawner").children.length === 0) {
         Spawn();
        }
    
        
      }, 200);
  }

  function Spawn(){
 
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
      
  }