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
        this.background = this.add.image(0, 0, "backGround").setOrigin(0, 0).setScale(0.8);
        this.kodi = this.add.image(1080, 50, "kodi").setOrigin(0, 0).setScale(0.5);
        car = this.add.image(100, 900, 'car').setOrigin(0, 0).setScale(0.5);
        
        // add image button;
        this.appHome = this.add.sprite(80, 60, 'appHome').setOrigin(0,0).setScale(0.7);

        this.textTime = this.add.text(1190, 170, "00:00",{
            font: "30px Arial",
            fill: "red"
        }).setOrigin(0, 0);

        // add image audio;
        speak = this.add.image(450, 170, 'speak 1').setScale(1.2);
        speak.setInteractive().on('pointerdown', () =>{
            clickAudio.play();
        });
        wrongAudio = this.sound.add('wrong');
        
        //question
        this.textQuestion = this.add.text(350, 70, 'Choose the most accurate answer ?',{
            font: "40px Arial bold",
            fill: "red"
        }).setOrigin(0, 0);

        this.textListen = this.add.text(500, 150, 'listen to the question',{
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
        this.ice_6 = this.add.image((statusPosition==0) ? 150 : 950, 500, "ice 6").setOrigin(0, 0).setScale(0.3);
        this.ice_4 = this.add.image((statusPosition==1) ? 550 : 950, 500, "ice 4").setOrigin(0, 0).setScale(0.3);
        this.ice_3 = this.add.image((statusPosition==0) ? 550 : 150, 500, "ice 3").setOrigin(0, 0).setScale(0.3);
        this.questionMark = this.add.image(200, 300, "questionMark").setOrigin(0, 0).setScale(0.7);

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
        this.ice_5 = this.add.image((statusPosition==0) ? 150 : 950, 500, "ice 5").setOrigin(0, 0).setScale(0.3);
        this.ice_2 = this.add.image((statusPosition==1) ? 550 : 950, 500, "ice 2").setOrigin(0, 0).setScale(0.3);
        this.ice_1 = this.add.image((statusPosition==0) ? 550 : 150, 500, "ice 1").setOrigin(0, 0).setScale(0.3);

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
        sub1 = this.add.text(430, 280, '-', {
            font: "100px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        textSubtrahend = this.add.text(610, 300, subtrahend, {
            font: "80px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        equal1 = this.add.text(800, 290, '=', {
            font: "100px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        textAnswer = this.add.text(970, 300, answer, {
            font: "80px Arial",
            fill: "red"
        }).setOrigin(0, 0);
    }

    calculationDice(number, answer){
        this.questionMark = this.add.image(610, 300, "questionMark").setOrigin(0, 0).setScale(0.7);
        sub1 = this.add.text(430, 280, '-', {
            font: "100px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        textSubtrahend = this.add.text(200, 300, number, {
            font: "80px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        equal1 = this.add.text(800, 290, '=', {
            font: "100px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        textAnswer = this.add.text(970, 300, answer, {
            font: "80px Arial",
            fill: "red"
        }).setOrigin(0, 0);
    }

    calculation(number, subtrahend, answer){
        textNumber = this.add.text(200, 300, number, {
            font: "80px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        sub2 = this.add.text(430, 480, '-', {
            font: "100px Arial",
            fill: "red"
        }).setOrigin(0, 0);
        equal2 = this.add.text(800, 490, '=', {
            font: "100px Arial",
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
        this.dice_4 = this.add.image((statusPosition==0) ? 150 : 910, 500, "dice 4").setOrigin(0, 0).setScale(0.7);
        this.dice_5 = this.add.image((statusPosition==1) ? 530 : 910, 500, "dice 5").setOrigin(0, 0).setScale(0.7);
        this.dice_5.rotation += 0.04;
        this.dice_1 = this.add.image((statusPosition==0) ? 530 : 150, 500, "dice 1").setOrigin(0, 0).setScale(0.7);

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
        this.dice_5 = this.add.image((statusPosition==0) ? 150 : 910, 500, "dice 5").setOrigin(0, 0).setScale(0.7);
        this.dice_5.rotation += 0.04;
        this.dice_4 = this.add.image((statusPosition==1) ? 530 : 910, 500, "dice 4").setOrigin(0, 0).setScale(0.7);
        this.dice_2 = this.add.image((statusPosition==0) ? 530 : 150, 500, "dice 2").setOrigin(0, 0).setScale(0.7);

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
                this.khanAcademyKid = this.add.image(-70, 215, "khanAcademyKid").setOrigin(0, 0).setScale(0.6);
                this.textGameOver = this.add.text(280, 70, "Well ! You have completed the lesson !!!", {
                    font: "40px Arial", 
                    fill: "red"
                }).setOrigin(0, 0);
                this.time = this.add.text(550, 120, 'Timed: ' + time + 's', {
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
        number_4 = this.add.image(530, 450, strNumber1).setOrigin(0,0).setScale(0.7);
        number_10 = this.add.image(150, 450, strNumber2).setOrigin(0,0).setScale(0.7);

        statusPosition = this.randomPosition();

        numberAnswer_1 = this.add.image(545, 650, strNumberAnswer1, Phaser.Math.RND.pick(this.background)).setOrigin(0,0).setScale(0.7);
        numberAnswer_5 = this.add.image((statusPosition==0) ? 150 : 890, 650, strNumberAnswer2, Phaser.Math.RND.pick(this.background)).setOrigin(0,0).setScale(0.7);
        numberAnswer_6 = this.add.image((statusPosition==0) ? 890 : 150, 650, strNumberAnswer3, Phaser.Math.RND.pick(this.background)).setOrigin(0,0).setScale(0.7);

        numberAnswer_1.setInteractive();
        numberAnswer_5.setInteractive();
        numberAnswer_6.setInteractive();
        number_4.setInteractive();
        number_10.setInteractive();

        this.input.setDraggable(numberAnswer_1);
        this.input.setDraggable(numberAnswer_5);
        this.input.setDraggable(numberAnswer_6);

        dropImage = this.add.image(950, 480, "questionMark").setOrigin(0, 0).setScale(0.7);
        dropImage.setInteractive();
        dropImage.input.dropZone = true;

        //drag and drop
        this.input.on('dragstart', function (pointer, gameObject) {
            this.children.bringToTop(gameObject);
            if (gameObject.x >= 50 && gameObject.x <= 250  && gameObject.y >= 550 && gameObject.y <= 750 ){
                position = 1;
            }
            if (gameObject.x >= 445 && gameObject.x <= 645  && gameObject.y >= 550 && gameObject.y <= 750 ){
                position = 2;
            }
            if (gameObject.x >= 790 && gameObject.x <= 990  && gameObject.y >= 550 && gameObject.y <= 750 ){
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

            if (gameObject.x >= 800 && gameObject.x <= 1000  && gameObject.y >= 300 && gameObject.y <= 600 ){
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
        if (car.x > 1000){
            car.x = 100;
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

