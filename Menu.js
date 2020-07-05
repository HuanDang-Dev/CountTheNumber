class Menu extends Phaser.Scene {

    constructor() {
        super('Menu')
    }

    preload() {
        this.load.image('khanAcademyKids', "assets/images/background/khanAcademyKids.jpg");
        this.load.image('play', 'assets/images/background/play.png');
        this.load.image('backGround', 'assets/images/background/background.jpg');
    }

    create(){
        this.background = this.add.image(0, 0, "backGround").setOrigin(0, 0).setScale(0.8);
        this.khanAcademyKids = this.add.image(0, 222, "khanAcademyKids").setOrigin(0, 0);
        
        // Choose scene 1 
        this.play = this.add.sprite(570, 450, 'play').setOrigin(0,0).setScale(0.3);

        this.play.setInteractive().on('pointerdown', () => {
            time = 0;
            this.scene.start('Scene1');
        });

        this.textPlay = this.add.text(615, 620, "Play", {
            font: "40px Arial", 
            fill: "blue"

        }).setOrigin(0, 0);

        this.textPlay.setInteractive().on('pointerdown', () =>{
            time = 0;
            this.scene.start('Scene1');

        });

        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTint(0xE973CF);

        });

        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.clearTint();
        });
    }
     
    update() {
    }
}