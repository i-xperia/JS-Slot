window.onload = function(){
  cc.game.onStart = function(){
      //load resources
      cc.LoaderScene.preload(["resources/DGN.png"], function () {
          var MyScene = cc.Scene.extend({
              onEnter : function () {
                  this._super();  
                  //Getting Window Size
                  var size = cc.director.getWinSize();
                  //Label Data (Win/ Not WIn)
                  var resultOfSpin = "";
                  //Our Spinning Status, False by default
                  var spinning = false;
                   //Result of Win Label Created here
                  var label = cc.LabelTTF.create("Result: " + resultOfSpin, "Arial", 40);
                  label.setPosition(size.width / 4, size.height / 8);
                  label.setFontFillColor("black");
                  this.addChild(label, 1);
                  // Creating our spin UI button
                  var spinButton = new ccui.Button.create("resources/button_enabled.png");
                  spinButton.setPosition(size.width / 1.3, size.height / 8);
                  spinButton.setScale(1.5);
                  this.addChild(spinButton, 2);
                  //Slot Mesh
                  var mesh = new cc.Sprite("resources/mesh.png");
                  mesh.setPosition(size.width / 1.5, size.height / 5);
                  mesh.setScale(1.4);
                  this.addChild(mesh, 0);
                  //Red Winning Indicator Line
                  var line = new cc.DrawNode();255,160,122,2
                  line.drawSegment(cc.p(size.width / 8.4, size.height / 1.8), cc.p(size.width / 1.07, size.height / 1.8), 2 , cc.color("#D30000"));
                  this.addChild(line, 2);
                  //Creating array of Slot Cells
                  var cells = [];
                  //Filling it with sprites
                  for (var index = 0; index < 9; index++) {
                    cells.push(new cc.Sprite("resources/" + Math.floor(Math.random() * 7) + "_element.jpg"));
                    this.addChild(cells[index], 0);
                    cc.log(cells[index]);
                  }
                  //Cells positioning function for Rows
                  var cellsPositioning = function(initialIndex, maxIndex, yAxisIndex) {
                    var Y_pos = [1.32, 1.8, 2.8],
                        X_pos = [4, 1.9, 1.25],
                        pos_index = 0;
                    for (index = initialIndex; index < maxIndex; index++) {
                      cells[index].setPosition(size.width / X_pos[pos_index], size.height / Y_pos[yAxisIndex]);
                      pos_index++;
                    }
                  }
                  cellsPositioning(0,3,0); //Top row
                  cellsPositioning(3,6,1); // Middle Row
                  cellsPositioning(6,9,2); // Bottom Row
                  //Our Spin Function ;)
                  var makeSpin = function () {
                    //Deleting Win/Not Win text from label before the new spin
                    label.setString("Result: ");
                    //Prevent from Button click while Spinning
                    if(spinning) {
                      return null;
                    }
                    //Making Spinning status True
                    spinning = true;
                    //Changing Button Texture for better UX
                    spinButton.loadTextures("resources/button_disabled.png");
                    //There is the fun begin :D
                    var spinner = setInterval(function(){
                      for (index = 0; index < cells.length; index++) {
                        //Randomizing our cells
                        cells[index].id = Math.floor(Math.random() * 7);
                        cells[index].setTexture("resources/" + cells[index].id + "_element.jpg");
                        console.log(cells[index].id);
                      }
                    }, 100)
                    setTimeout(function() { 
                      clearInterval(spinner); 
                      //Checking for Winning combo
                      checkWin();
                      //Changing Spin Status back to false
                      spinning = false
                      //Changing Button Texture back to normal
                      spinButton.loadTextures("resources/button_enabled.png");
                    }, 10000); //Stop spin after 10 sec
                  }
                  //CheckWin Function
                  var checkWin = function () {
                    if (cells[3].id === cells[4].id && cells[3].id === cells[5].id && cells[4].id === cells[5].id) {
                      resultOfSpin = "Win";
                    }
                    else{
                      resultOfSpin = "Not Win";
                    }
                    label.setString("Result: " + resultOfSpin);
                  }
                  //Adding event listener for Spin Button
                  var touchEvent = function (sender,  type) {
                    switch (type) {
                      case ccui.Widget.TOUCH_ENDED:
                      spinButton.setScale(1.5);
                      //StartSpin
                      makeSpin();
                      break;
                      //Default, just in case something goes wrong ;)
                      default: break;
                    }
                  }
                  spinButton.addTouchEventListener( touchEvent, this );  
              }
          });
          cc.director.runScene(new MyScene());
      }, this);
  };
  cc.game.run("gameCanvas");
};