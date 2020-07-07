//var scene
var time = 0;
var numberAnswer_6;
var numberAnswer_1;
var numberAnswer_5;
var dropImage;
var position = 0;
var nextPhase3 = 0;
var nextPhase4 = 0;
var number_4;
var number_10;
var textNumber;
var sub1, sub2;
var equal1, equal2;
var textSubtrahend;
var textAnswer;
var checkCorrect = 0;
var car;
var statusPosition;

var timedEvent1; // time event
var checkTime = 0;

var speak; // name speak audio
var wrongAudio;
var clickAudio;
var clickAudioAnswer;
var audioBG;
var audioEnd;
var audioConfig = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
};

class Scene1 extends Phaser.Scene{

    constructor() {
        super('Scene1');
    }

    //load image and audio;
    preload() {
        // load image and audio;
        this.load.pack('dataGame', 'assets/data/dataGame.json');
        
    }

    //create game;
    create(){
        // load audio background;
        audioBG = this.sound.add('bgMusic');
        audioBG.play(audioConfig);

        // add image background;
        this.background = this.add.image(0, 0, "backGround").setOrigin(0, 0).setScale(0.6);
        this.kodi = this.add.image(850, 20, "kodi").setOrigin(0, 0).setScale(0.4);
        car = this.add.image(50, 660, 'car').setOrigin(0, 0).setScale(0.5);
        
        // add image button;
        this.appHome = this.add.sprite(30, 40, 'appHome').setOrigin(0,0).setScale(0.55);

        this.textTime = this.add.text(870, 130, "00:00",{
            font: "30px Arial",
            fill: "red"
        }).setOrigin(0, 0);

        // add image audio;
        speak = this.add.image(300, 130, 'speak 1').setScale(1.2);
        speak.setInteractive().on('pointerdown', () =>{
            clickAudio.play();
        });
        wrongAudio = this.sound.add('wrong');
        
        //question
        this.textQuestion = this.add.text(200, 40, 'Choose the most accurate answer ?',{
            font: "40px Arial bold",
            fill: "red"
        }).setOrigin(0, 0);

        this.textListen = this.add.text(340, 115, 'listen to the question',{
            font: "30px Arial bold",
            fill: "grey",

        }).setOrigin(0, 0);
        
        this.appHome.setInteractive().on('pointerdown', () => {
            this.scene.start('Menu');
            audioBG.stop();
        });

        //effect of sprites;
        this.input.on('gameobjectover', function (pointer, gameObject) { gameObject.setTint(0x8EEDE2); });

        this.input.on('gameobjectout', function (pointer, gameObject) { gameObject.clearTint(); });
        
        this.countTime();
        this.phase1();

    }

    phase1(){

        //load audio
        clickAudio = this.sound.add('phase 1');
        
        //load image
        statusPosition = this.randomPosition();
        this.ice_6 = this.add.image((statusPosition==0) ? 150 : 690, 400, "ice 6").setOrigin(0, 0).setScale(0.2);
        this.ice_4 = this.add.image((statusPosition==1) ? 420 : 690, 400, "ice 4").setOrigin(0, 0).setScale(0.2);
        this.ice_3 = this.add.image((statusPosition==0) ? 420 : 150, 400, "ice 3").setOrigin(0, 0).setScale(0.2);
        this.questionMark = this.add.image(150, 250, "questionMark").setOrigin(0, 0).setScale(0.55);

        // set onClick for the buttons;
        this.ice_6.setInteractive().on('pointerdown', () => {
            //load audio
            clickAudio = this.sound.add('answerPhase 1');
            clickAudio.play();
            checkCorrect = 1;
            
            timedEvent1 = this.time.delayedCall(3000, function nextPhase(){
                clickAudio.stop();
                this.ice_6.destroy();
                this.ice_4.destroy();
                this.ice_3.destroy();
                textSubtrahend.destroy();
                textAnswer.destroy();
                this.phase2();
            }, [], this)
        });
        this.ice_4.setInteractive().on('pointerdown', () => {
            this.eventClickButtonNumberPhase();
        });
        this.ice_3.setInteractive().on('pointerdown', () => {
            this.eventClickButtonNumberPhase()
        });
        this.calculationSmall('3', '3');
    }

    eventClickButtonNumberPhase(){
        wrongAudio.play();
    }

    phase2(){

        //load audio
        clickAudio = this.sound.add('phase 2');

        statusPosition = this.randomPosition();
        this.ice_5 = this.add.image((statusPosition==0) ? 150 : 690, 400, "ice 5").setOrigin(0, 0).setScale(0.2);
        this.ice_2 = this.add.image((statusPosition==1) ? 420 : 690, 400, "ice 2").setOrigin(0, 0).setScale(0.2);
        this.ice_1 = this.add.image((statusPosition==0) ? 420 : 150, 400, "ice 1").setOrigin(0, 0).setScale(0.2);

        // set onClick for the buttons;
        this.ice_5.setInteractive().on('pointerdown', () => {
            //load audio
            clickAudio = this.sound.add('answerPhase 2');
            clickAudio.play();
            checkCorrect = 1;

            timedEvent1 = this.time.delayedCall(3000, function nextPhase(){
                clickAudio.stop();
                this.ice_5.destroy();
                this.ice_2.destroy();
                this.ice_1.destroy();
                textSubtrahend.destroy();
                textAnswer.destroy();
                this.questionMark.destroy();
                this.phase3();
            }, [], this)
        });
        this.ice_1.setInteractive().on('pointerdown', () => {
            this.eventClickButtonNumberPhase();
        });
        this.ice_2.setInteractive().on('pointerdown', () => {
            this.eventClickButtonNumberPhase()
        });
        this.calculationSmall('1', '4');
    }

    calculationSmall(subtrahend, answer){
        sub1 = this.add.text(320, 245, '-', {
            font: "70px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        textSubtrahend = this.add.text(450, 250, subtrahend, {
            font: "70px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        equal1 = this.add.text(600, 250, '=', {
            font: "70px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        textAnswer = this.add.text(750, 250, answer, {
            font: "70px Arial",
            fill: "red"
        }).setOrigin(0, 0);
    }

    calculationDice(number, answer){
        this.questionMark = this.add.image(450, 250, "questionMark").setOrigin(0, 0).setScale(0.55);
        textSubtrahend = this.add.text(170, 250, number, {
            font: "70px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        textAnswer = this.add.text(750, 250, answer, {
            font: "70px Arial",
            fill: "red"
        }).setOrigin(0, 0);
    }

    calculation(number, subtrahend, answer){
        textNumber = this.add.text(150, 250, number, {
            font: "70px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        sub2 = this.add.text(320, 350, '-', {
            font: "70px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        equal2 = this.add.text(600, 350, '=', {
            font: "70px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        this.calculationSmall(subtrahend, answer);
    }

    

    phase3(){

        //load audio
        clickAudio = this.sound.add('phase 3');
        clickAudioAnswer = this.sound.add('answerPhase 3');

        this.calculation('10', '4', '6');

        this.createPhase('number_4', 'number_10', 'numberAnswer_6', 'numberAnswer_1', 'numberAnswer_5', 2);
        
    }


    phase4(){

        //load audio
        clickAudio = this.sound.add('phase 4');
        clickAudioAnswer = this.sound.add('answerPhase 4');

        this.calculation('6', '5', '1');

        this.createPhase('number_5', 'number_6', 'numberAnswer_1', 'numberAnswer_5', 'numberAnswer_6', 2);
        
        if (nextPhase4 == 1){
            numberAnswer_1.setActive(false).setVisible(false);;
            numberAnswer_5.setActive(false).setVisible(false);;
            numberAnswer_6.setActive(false).setVisible(false);;
        }
    }

    phase5(){
        //load audio
        clickAudio = this.sound.add('phase 5');
        
        //load image
        statusPosition = this.randomPosition();
        this.dice_4 = this.add.image((statusPosition==0) ? 120 : 680, 400, "dice 4").setOrigin(0, 0).setScale(0.55);
        this.dice_5 = this.add.image((statusPosition==1) ? 410 : 680, 400, "dice 5").setOrigin(0, 0).setScale(0.55);
        this.dice_5.rotation += 0.04;
        this.dice_1 = this.add.image((statusPosition==0) ? 410 : 120, 400, "dice 1").setOrigin(0, 0).setScale(0.55);

        // set onClick for the buttons;
        this.dice_5.setInteractive().on('pointerdown', () => {
            //load audio
            clickAudio = this.sound.add('answerPhase 5');
            clickAudio.play();
            checkCorrect = 1;

            timedEvent1 = this.time.delayedCall(3000, function nextPhase(){
                clickAudio.stop();
                this.dice_5.destroy(true);
                this.dice_4.destroy(true);
                this.dice_1.destroy(true);
                textSubtrahend.destroy(true);
                textAnswer.destroy(true);
                this.phase6();
            }, [], this)
        });
        this.dice_4.setInteractive().on('pointerdown', () => {
            this.eventClickButtonNumberPhase();
        });
        this.dice_1.setInteractive().on('pointerdown', () => {
            this.eventClickButtonNumberPhase();
        });
        this.calculationDice('7', '2');
    }

    phase6(){
        //load audio
        clickAudio = this.sound.add('phase 6');
        
        //load image
        statusPosition = this.randomPosition();
        this.dice_5 = this.add.image((statusPosition==0) ? 120 : 680, 400, "dice 5").setOrigin(0, 0).setScale(0.55);
        this.dice_5.rotation += 0.04;
        this.dice_4 = this.add.image((statusPosition==1) ? 410 : 680, 400, "dice 4").setOrigin(0, 0).setScale(0.55);
        this.dice_2 = this.add.image((statusPosition==0) ? 410 : 120, 400, "dice 2").setOrigin(0, 0).setScale(0.55);

        // set onClick for the buttons;
        this.dice_2.setInteractive().on('pointerdown', () => {
            //load audio
            clickAudio = this.sound.add('answerPhase 6');
            clickAudio.play();
            checkCorrect = 1;

            timedEvent1 = this.time.delayedCall(3000, function nextPhase(){
                clickAudio.stop();
                this.dice_5.destroy();
                this.dice_4.destroy();
                this.dice_2.destroy();
                this.questionMark.destroy();
                this.textQuestion.destroy();
                this.textListen.destroy();
                speak.destroy();
                audioEnd = this.sound.add('audioEndGame');
                audioEnd.play();
                this.khanAcademyKid = this.add.image(-100, 150, "khanAcademyKid").setOrigin(0, 0).setScale(0.5);
                this.textGameOver = this.add.text(140, 30, "Well ! You have completed the lesson !!!", {
                    font: "40px Arial", 
                    fill: "red"
                }).setOrigin(0, 0);
                this.time = this.add.text(400, 100, 'Timed: ' + time + 's', {
                    font: "40px Arial", 
                    fill: "red"
                }).setOrigin(0, 0);
                checkTime = 1;
                this.textTime.destroy();
            }, [], this)
        });
        this.dice_5.setInteractive().on('pointerdown', () => {
            this.eventClickButtonNumberPhase()
        });
        this.dice_4.setInteractive().on('pointerdown', () => {
            this.eventClickButtonNumberPhase()
        });
        this.calculationDice('6', '4');
    }

    //create phase3, phase4, phase5, phase6
    createPhase(strNumber1, strNumber2, strNumberAnswer1, strNumberAnswer2, strNumberAnswer3, numberCheckPosition){
        // add image number;
        number_4 = this.add.image(400, 330, strNumber1).setOrigin(0,0).setScale(0.55);
        number_10 = this.add.image(120, 330, strNumber2).setOrigin(0,0).setScale(0.55);

        statusPosition = this.randomPosition();

        numberAnswer_1 = this.add.image(410, 470, strNumberAnswer1, Phaser.Math.RND.pick(this.background)).setOrigin(0,0).setScale(0.55);
        numberAnswer_5 = this.add.image((statusPosition==0) ? 120 : 680, 470, strNumberAnswer2, Phaser.Math.RND.pick(this.background)).setOrigin(0,0).setScale(0.55);
        numberAnswer_6 = this.add.image((statusPosition==0) ? 680 : 120, 470, strNumberAnswer3, Phaser.Math.RND.pick(this.background)).setOrigin(0,0).setScale(0.55);

        numberAnswer_1.setInteractive();
        numberAnswer_5.setInteractive();
        numberAnswer_6.setInteractive();
        number_4.setInteractive();
        number_10.setInteractive();

        this.input.setDraggable(numberAnswer_1);
        this.input.setDraggable(numberAnswer_5);
        this.input.setDraggable(numberAnswer_6);

        dropImage = this.add.image(730, 350, "questionMark").setOrigin(0, 0).setScale(0.55);
        dropImage.setInteractive();
        dropImage.input.dropZone = true;

        //drag and drop
        this.input.on('dragstart', function (pointer, gameObject) {
            this.children.bringToTop(gameObject);
            if (gameObject.x >= 20 && gameObject.x <= 220  && gameObject.y >= 420 && gameObject.y <= 690 ){
                position = 1;
            }
            if (gameObject.x >= 310 && gameObject.x <= 510  && gameObject.y >= 420 && gameObject.y <= 690 ){
                position = 2;
            }
            if (gameObject.x >= 580 && gameObject.x <= 780  && gameObject.y >= 420 && gameObject.y <= 690 ){
                position = 3;
            }
        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x - 50;
            gameObject.y = dropZone.y - 30;

            if (gameObject.x >= 630 && gameObject.x <= 830  && gameObject.y >= 250 && gameObject.y <= 450 ){
                if(position ==  numberCheckPosition){
                    clickAudioAnswer.play();
                    checkCorrect = 1;
                    
                    position = 0;
                    if (nextPhase3 == 0)
                        nextPhase3 = 1;
                    if (nextPhase3 == 2){    
                        nextPhase4 = 1;
                    }
                }
                if (position == 1 || position == 3) {
                    wrongAudio.play();
                    gameObject.x = gameObject.input.dragStartX;
                    gameObject.y = gameObject.input.dragStartY;
                }
            }
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });
    }

    countTime(){
        var timedEvent = this.time.addEvent({
            delay: 1000,
            callback:  () => {
                time ++;
                var sec = Math.floor(time % 60);
                if(sec < 10)
                    sec = "0" + sec; 
                var min = Math.floor((time / 60) % 60); 
                if(min < 10)
                    min = "0" + min;
                if (checkTime == 0)
                    this.textTime.setText(min + ":" + sec);
            },
            callbackScope: this,
            loop: true
        });
       
    }

    animationBall(){
        car.x += 10;
        if (car.x > 800){
            car.x = 50;
            checkCorrect = 0;
        }
    }

    randomPosition(){
        var temp = Phaser.Math.Between(0, 1);

        return temp;
    }

    //Update;
    update(){
        if (nextPhase3 == 1){
            nextPhase3 = 2;
            timedEvent1 = this.time.delayedCall( 3000, function nextPhase(){
                textNumber.destroy(true);
                textSubtrahend.destroy(true);
                textAnswer.destroy(true);
                dropImage.destroy(true);
                number_4.destroy(true);
                number_10.destroy(true);
                numberAnswer_1.destroy(true);
                numberAnswer_5.destroy(true);
                numberAnswer_6.destroy(true);
                sub1.destroy(true);
                sub2.destroy(true);
                equal1.destroy(true);
                equal2.destroy(true);
                this.phase4();
            }, [], this)
            
        }
        if (nextPhase4 == 1){
            nextPhase4 = 0;
            timedEvent1 = this.time.delayedCall( 3000, function nextPhase(){
                textNumber.destroy(true);
                textSubtrahend.destroy(true);
                textAnswer.destroy(true);
                dropImage.destroy(true);
                number_4.destroy(true);
                number_10.destroy(true);
                numberAnswer_1.destroy(true);
                numberAnswer_5.destroy(true);
                numberAnswer_6.destroy(true);
                sub1.destroy(true);
                sub2.destroy(true);
                equal1.destroy(true);
                equal2.destroy(true);
                this.phase5();
            }, [], this)
        }
        if (checkCorrect == 1){
            this.animationBall();
        }
    }

}

