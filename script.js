const ticTacToe = (() => {
    let gameEnebled = true;
    window.onload = function () {        
        if(players.computer.active === true && players.computer.start === true) {
           computer.modes();
        }; 
        let player1 = document.getElementById("player1choice"); 
        let player2 = document.getElementById("player2choice"); 
        if (players.player1 === "o") {
        player1.innerHTML = "\u2D54";
        player1.style.color = "red"; 
        player2.innerHTML = "\u2718";
        player2.style.color = "black"
        } else if (players.player1 === "x"){
            player2.innerHTML = "\u2D54";
            player2.style.color = "red"; 
            player1.innerHTML = "\u2718"; 
            player1.style.color = "black"
        };
    };        
    const Gameboard = {
        gameboard: Array.from(document.getElementsByClassName("cell")),
        remainingCellId: (() => { 
            let allCells = []
            for (let i = 1; document.querySelectorAll(".cell").length + 1 > i; i++) {
                        allCells.push(`cell${i}`);                        
                    }
                    return {allCells}
                })(),
        cellsClickedNr: [],
        XandOhistory: [],
        cellsClickedId: [],
        lastClickedCellNr: []        
    };
    const players = new function () {
        this.player1Score = 0;
        this.player2Score = 0; 
        this.start = "player1";
        this.computer = {
            active: false,
            start: false,
            mode: "easy"            
        };           
        this.player1 = "o";
        this.player2 = (() => {
            if (this.player1 === "x") {
                return "o";
            } else {
                return "x";
            }          
        })();    
    };  
    clickableSquares = {
        squares: Gameboard.gameboard.forEach((element) => {
            element.addEventListener("click", () => {
                 if (gameEnebled === true) {
                 gameFlow.XandO(element);
                                     
                 }
            })
        }) 
    };
    const computer = {
            modes: function() { 
                let leftChoices = Gameboard.remainingCellId.allCells.length;                    
                let randomNr = Math.floor(Math.random()*leftChoices);
                let randomChoice = Gameboard.remainingCellId.allCells[randomNr];
                let randomChoiceArr = Gameboard.gameboard.find(x => x.id === randomChoice)               
                if (players.computer.active === true) {                
                    let remainingCells = (() => { 
                    let lastClickedId  = Gameboard.cellsClickedId[Gameboard.cellsClickedId.length - 1]                
                    for (let j = 0; Gameboard.remainingCellId.allCells.length > j; j++) {
                                if(lastClickedId == Gameboard.remainingCellId.allCells[j])
                                Gameboard.remainingCellId.allCells.splice(j, 1);                            
                            }
                })();
                easy = (() => {                    
                    if (players.computer.mode === "easy" && players.computer.start === true && gameEnebled === true) {                        
                        if(Gameboard.XandOhistory.length === 0 || Gameboard.XandOhistory.length % 2 === 0 ) {
                            gameFlow.XandO(randomChoiceArr);                        
                        }
                    } else if (players.computer.mode === "easy" && players.computer.start === false && gameEnebled === true) {
                        if(Gameboard.XandOhistory.length % 2 === 1) {
                            gameFlow.XandO(randomChoiceArr);                            
                        }
                    }
                    })(); 
                }
            }
    };         
    const gameFlow = {
        XandO: function (element) {
            const startingInput = players[players.start];                      
            let history = Gameboard.XandOhistory;            
            const x = "\u2718";
            const o = "\u2D54";
            if (startingInput === "x" && history.length === 0) {
                element.innerHTML = x;  
                Gameboard.XandOhistory.push("x");                
            } else if (startingInput === "o" && history.length === 0) {
                element.innerHTML = o;           
                element.style.color= "red";
                Gameboard.XandOhistory.push("o");              
            };
            if (element.innerText === "" && history[history.length -1] === "o"
            && gameEnebled === true) {
                element.innerHTML = x;
                Gameboard.XandOhistory.push("x");                  
              
            } else if (element.innerText === "" && history[history.length -1] === "x"
            && gameEnebled === true) {
                element.innerHTML = o;
                element.style.color= "red";                            
                Gameboard.XandOhistory.push("o");
            }
            Gameboard.cellsClickedId.push(element.getAttribute("id"));
            lastClickedCellNrSquare();
            gameEnd.win();  
            gameEnd.draw();
            computer.modes();           
        }        
    };     
    const lastClickedCellNrSquare = () => {
        let lastCell = Gameboard.cellsClickedId[Gameboard.cellsClickedId.length - 1]
                let i = 0;
                Gameboard.lastClickedCellNr = (() => {
                for (i; Gameboard.gameboard.length > i; i++) {
                    if(Gameboard.gameboard[i].id === lastCell) {
                        Gameboard.cellsClickedNr.push(i)
                        return i        
                    } 
                }
                })();                         
    };    
    let WinningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3 ,6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const popUp = {
       box:  function () {
        document.getElementById("pop-up").style.display = "block";
        document.getElementById("pop-up-invisible").style.display = "block";
       },            
       boxtext: function(player, text) {
        document.getElementById("pop-up-text1").textContent = `${player}`;
        document.getElementById("pop-up-text2").textContent = `${text}`;
       }      
    };        
    const gameEnd =  {
       win: function () {
        Gameboard.computerBoard = []
        for (l = 0; WinningCombinations.length > l; l++) {
            Gameboard.computerBoard.push(WinningCombinations[l]);
        }
            for (let i = 0; WinningCombinations.length > i; i++) {
                for (let j = 0; WinningCombinations[i].length > j; j++){
                    if (WinningCombinations[i][j] === Gameboard.lastClickedCellNr) {
                        WinningCombinations[i].splice(j, 1);
                        WinningCombinations[i].push(Gameboard.XandOhistory[Gameboard.XandOhistory.length -1])
                    }              
                    if (WinningCombinations[i].toString() === `o,o,o`) {                        
                        if(players.computer.active === true && players.player1 === "x"){
                            popUp.boxtext("Computer", "Wins!!!"); 
                            buttonFunctions.score("player2")                       
                        } else if (players.computer.active === true && players.player1 === "o") {
                            popUp.boxtext("You", "Win!!!"); 
                            buttonFunctions.score("player1")   
                        } else if (players.computer.active === false && players.player1 === "x") {
                            popUp.boxtext("Player2", "Wins!!!"); 
                            buttonFunctions.score("player2")  
                        }else if (players.computer.active === false && players.player1 === "o") {
                            popUp.boxtext("Player1", "Wins!!!");
                            buttonFunctions.score("player1")  
                        };
                        popUp.box();   
                        gameEnebled = false;                       
                        break;                                                          
                    } else if (WinningCombinations[i].toString() === `x,x,x`) {
                        if(players.computer.active === true && players.player1 === "o"){
                            popUp.boxtext("Computer", "Wins!!!"); 
                            buttonFunctions.score("player2")                       
                        } else if (players.computer.active === true && players.player1 === "x") {
                            popUp.boxtext("You", "Win!!!"); 
                            buttonFunctions.score("player1")  
                        } else if (players.computer.active === false && players.player1 === "o") {
                            popUp.boxtext("Player2", "Wins!!!");
                            buttonFunctions.score("player2")   
                        }else if (players.computer.active === false && players.player1 === "x") {
                            popUp.boxtext("Player1", "Wins!!!");
                            buttonFunctions.score("player1")  
                        };
                        popUp.box();   
                        gameEnebled = false;                      
                        break;                           
                    } 
                };                         
            }            
        },
    draw: function (){
        if (Gameboard.XandOhistory.length === 9 && gameEnebled === true)  {  
                popUp.boxtext("It`s a", "Draw!!!");
                popUp.box();
                gameEnebled = false;
            } 
    }    
    };     
    const reset = function () {
            gameEnebled = true;
            WinningCombinations = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3 ,6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]
                ];
            Gameboard.cellsClickedNr = [];
            Gameboard.XandOhistory.splice(0);
            Gameboard.gameboard.forEach((element) => {
                element.innerHTML = "";
                element.style.color = "black";                           
            });
            Gameboard.cellsClickedId = [];
            Gameboard.lastClickedCellNr = []
            Gameboard.remainingCellId = (() => { 
                let allCells = []
                for (let i = 1; document.querySelectorAll(".cell").length + 1 > i; i++) {
                            allCells.push(`cell${i}`);                        
                        }
                        return {allCells}
                    })();
            window.onload ();       
        }
    const buttonFunctions = {
            switchChoices: function () {
            if (players.player1 === "o"){
                players.player1 = "x";
                players.player2 = "o"
                reset();
            } else if (players.player1 === "x"){
                players.player1 = "o";
                players.player2 = "x"
                reset();
            }
            },
            pvp: function () {
                players.computer.active = false;
                document.getElementById("player2-computer").innerHTML = "Player 2";
                document.getElementById("start1").innerHTML = "Start";
                document.getElementById("start2").innerHTML = "";
                reset();
            },
            cvp: function () {
                players.computer.active = true;
                players.computer.start = false;
                document.getElementById("player2-computer").innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbspEasy";
                document.getElementById("start1").innerHTML = "Start";
                document.getElementById("start2").innerHTML = "";
                reset();
            },
            score: function (player) {
                if(player === "player1"){
                    players.player1Score += 1;
                    document.getElementById("player1score").innerText = players.player1Score;                  
                } else if (player === "player2"){
                    players.player2Score += 1;
                    document.getElementById("player2score").innerText = players.player2Score;
                }
            },
            popUpClose: function () {
                document.getElementById("pop-up").style.display = "none"; 
                document.getElementById("pop-up-invisible").style.display ="none";               
                if (players.start === "player1"){
                    if(players.computer.active === true){
                    players.computer.start = true;
                }
                    players.start = "player2";
                    document.getElementById("start1").innerHTML = "";
                    document.getElementById("start2").innerHTML = "Start";
                } else if (players.start === "player2"){
                    if(players.computer.active === true){
                        players.computer.start = false;
                }
                    players.start = "player1";
                    document.getElementById("start1").innerHTML = "Start";
                    document.getElementById("start2").innerHTML = "";
                }
                reset();
            },
            resetScore: function () {
                players.player1Score = 0;
                players.player2Score = 0; 
                document.getElementById("player1score").innerHTML = 0;
                document.getElementById("player2score").innerHTML = 0;
            }            
    };    
    const buttons = {
        reset:
            document.getElementById("reset").addEventListener("click", () => {
                document.getElementById("start1").innerHTML = "Start";
                document.getElementById("start2").innerHTML = "";
                players.start = "player1";
                players.player1 = "o"
                players.player2 = "x"  
                players.computer.start = false;
                reset();
                buttonFunctions.resetScore();                
            }),
        switchChoices : 
            document.getElementById("switch-choices").addEventListener("click", () => {
                document.getElementById("start1").innerHTML = "Start";
                document.getElementById("start2").innerHTML = "";
                players.start = "player1";
                players.computer.start = false;
                buttonFunctions.switchChoices();
                buttonFunctions.resetScore();
            }),
        pvp:
            document.getElementById("pvp").addEventListener("click",() => {
                document.getElementById("start1").innerHTML = "Start";
                document.getElementById("start2").innerHTML = "";
                players.start = "player1";
                players.player1 = "o"
                players.player2 = "x"  
                buttonFunctions.pvp();
                buttonFunctions.resetScore();               
            }),
        cvp:
            document.getElementById("cvp").addEventListener("click", () => {
                document.getElementById("start1").innerHTML = "Start";
                document.getElementById("start2").innerHTML = "";
                players.start = "player1";
                players.player1 = "o"     
                players.player2 = "x"        
                buttonFunctions.cvp();
                buttonFunctions.resetScore();                 
            }),
        popUpClose: 
            document.getElementById("pop-up").addEventListener("click", buttonFunctions.popUpClose),
        popUpCloseInvisible:
            document.getElementById("pop-up-invisible").addEventListener("click", buttonFunctions.popUpClose)                         
}
    return {Gameboard, players}
})();
        



