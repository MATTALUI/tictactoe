const game = new Vue({
  el: "#gameBoard",
  data: {
    game: new Array(9).fill(null),
    squareClasses: new Array(9).fill('square'),
    current: 'X',
    gameOver: false
  },
  methods: {
    selectSquare: function(index){
      if(this.gameOver)return;
      if(this.game[index]!=null)return;
      let copy = [...this.game];
      copy[index] = `assets/${this.current}.png`;
      this.game = copy;
      this.checkWinningState(index)
      this.toggleTurn();
    },
    toggleTurn: function(){
      if(this.current==='X'){
        this.current = 'O';
      }else{
        this.current = 'X';
      }
    },
    checkWinningState: function(index){
      let winConditions = [
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,1,2],
        [3,4,5],
        [6,7,8]
      ];
      let didSomeBodyWin = false;
      winConditions.forEach((condition)=>{
        if(condition.indexOf(index)>-1){
          let first = this.game[condition[0]];
          let second = this.game[condition[1]];
          let third = this.game[condition[2]];
          if(first === second&&second===third){
            condition.forEach((index)=>{
              this.squareClasses[index] = 'square winnerPath';
            });
            let winner = first.slice(7,8);
            didSomeBodyWin = true;
            modal.message = `${winner}s Win!`
            this.gameOver = true;
            Vue.nextTick(()=>{modal.show = true;});
          }
        }
      });
      if(this.game.filter(square=>(square===null)).length ===0 && !didSomeBodyWin){
        modal.message = 'Cat\'s Game!'
        modal.show = true;
      }
    }
  }
});


const modal = new Vue({
  el: '#modal',
  data: {
    show: false,
    message: 'Matt Wins!'
  },
  methods: {
    newGame: function(){
      game.game = new Array(9).fill(null);
      game.squareClasses = new Array(9).fill('square');
      game.current = 'X';
      game.gameOver = false;
      this.show = false;
    }
  }
});
