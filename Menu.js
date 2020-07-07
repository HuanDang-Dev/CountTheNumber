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
        this.background = this.add.image(0, 0, "backGround").setOrigin(0, 0).setScale(0.6);
        this.khanAcademyKids = this.add.image(0, 167, "khanAcademyKids").setOrigin(0, 0).setScale(0.75);
        
        // Choose scene 1 
        this.play = this.add.sprite(400, 320, 'play').setOrigin(0,0).setScale(0.3);

        this.play.setInteractive().on('pointerdown', () => {
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