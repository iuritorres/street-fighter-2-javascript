import {
    HEALTH_CRITICAL_HIT_POINTS,
    HEALTH_DAMAGE_COLOR,
    HEALTH_MAX_HIT_POINTS,
    KO_ANIMATION,
    KO_FLASH_DELAY,
    TIME_DELAY,
    TIME_FLASH_DELAY,
    TIME_FRAME_KEYS,
} from '../../constants/battle.js';
import { FPS } from '../../constants/game.js';
import { gameState } from '../../state/gameState.js';
import { drawFrame } from '../../utils/context.js';

export class StatusBar {
    time = 99;
    timeTimer = 0;
    timeFlashTimer = 0;
    useFlashFrames = false;

    healthBars = [
        {
            timer: 0,
            hitPoints: HEALTH_MAX_HIT_POINTS,
        },
        {
            timer: 0,
            hitPoints: HEALTH_MAX_HIT_POINTS,
        },
    ];

    koFrame = 0;
    koAnimationTimer = 0;

    frames = new Map([
        ['health-bar', [16, 18, 145, 11]],

        ['ko-white', [161, 16, 32, 14]],
        ['ko-red', [161, 1, 32, 14]],

        [`${TIME_FRAME_KEYS[0]}-0`, [16, 32, 14, 16]],
        [`${TIME_FRAME_KEYS[0]}-1`, [32, 32, 14, 16]],
        [`${TIME_FRAME_KEYS[0]}-2`, [48, 32, 14, 16]],
        [`${TIME_FRAME_KEYS[0]}-3`, [64, 32, 14, 16]],
        [`${TIME_FRAME_KEYS[0]}-4`, [80, 32, 14, 16]],
        [`${TIME_FRAME_KEYS[0]}-5`, [96, 32, 14, 16]],
        [`${TIME_FRAME_KEYS[0]}-6`, [112, 32, 14, 16]],
        [`${TIME_FRAME_KEYS[0]}-7`, [128, 32, 14, 16]],
        [`${TIME_FRAME_KEYS[0]}-8`, [144, 32, 14, 16]],
        [`${TIME_FRAME_KEYS[0]}-9`, [160, 32, 14, 16]],

        [`${TIME_FRAME_KEYS[1]}-0`, [16, 192, 14, 16]],
        [`${TIME_FRAME_KEYS[1]}-1`, [32, 192, 14, 16]],
        [`${TIME_FRAME_KEYS[1]}-2`, [48, 192, 14, 16]],
        [`${TIME_FRAME_KEYS[1]}-3`, [64, 192, 14, 16]],
        [`${TIME_FRAME_KEYS[1]}-4`, [80, 192, 14, 16]],
        [`${TIME_FRAME_KEYS[1]}-5`, [96, 192, 14, 16]],
        [`${TIME_FRAME_KEYS[1]}-6`, [112, 192, 14, 16]],
        [`${TIME_FRAME_KEYS[1]}-7`, [128, 192, 14, 16]],
        [`${TIME_FRAME_KEYS[1]}-8`, [144, 192, 14, 16]],
        [`${TIME_FRAME_KEYS[1]}-9`, [160, 192, 14, 16]],

        // Numeric
        ['score-0', [17, 101, 10, 10]],
        ['score-1', [29, 101, 10, 10]],
        ['score-2', [41, 101, 10, 10]],
        ['score-3', [53, 101, 10, 10]],
        ['score-4', [65, 101, 11, 10]],
        ['score-5', [77, 101, 10, 10]],
        ['score-6', [89, 101, 10, 10]],
        ['score-7', [101, 101, 10, 10]],
        ['score-8', [113, 101, 10, 10]],
        ['score-9', [125, 101, 10, 10]],

        // Alpha
        ['score-@', [17, 113, 10, 10]],
        ['score-A', [29, 113, 11, 10]],
        ['score-B', [41, 113, 10, 10]],
        ['score-C', [53, 113, 10, 10]],
        ['score-D', [65, 113, 10, 10]],
        ['score-E', [77, 113, 10, 10]],
        ['score-F', [89, 113, 10, 10]],
        ['score-G', [101, 113, 10, 10]],
        ['score-H', [113, 113, 10, 10]],
        ['score-I', [125, 113, 9, 10]],
        ['score-J', [136, 113, 10, 10]],
        ['score-K', [149, 113, 10, 10]],
        ['score-L', [161, 113, 10, 10]],
        ['score-M', [173, 113, 10, 10]],
        ['score-N', [185, 113, 11, 10]],
        ['score-O', [197, 113, 10, 10]],
        ['score-P', [17, 125, 10, 10]],
        ['score-Q', [29, 125, 10, 10]],
        ['score-R', [41, 125, 10, 10]],
        ['score-S', [53, 125, 10, 10]],
        ['score-T', [65, 125, 10, 10]],
        ['score-U', [77, 125, 10, 10]],
        ['score-V', [89, 125, 10, 10]],
        ['score-W', [101, 125, 10, 10]],
        ['score-X', [113, 125, 10, 10]],
        ['score-Y', [125, 125, 10, 10]],
        ['score-Z', [136, 125, 10, 10]],

        // Name tags
        ['tag-ken', [128, 56, 30, 9]],
        ['tag-ryu', [16, 56, 28, 9]],
    ]);

    constructor() {
        this.image = document.querySelector('img[alt="misc"]');

        this.names = gameState.fighters.map(
            ({ id }) => `tag-${id.toLowerCase()}`
        );
    }

    updateTime(time) {
        if (time.previous > this.timeTimer + TIME_DELAY) {
            this.time -= 1;
            this.timeTimer = time.previous;
        }

        if (
            this.time < 15 &&
            this.time > -1 &&
            time.previous > this.timeFlashTimer + TIME_FLASH_DELAY
        ) {
            this.useFlashFrames = !this.useFlashFrames;

            this.timeFlashTimer = time.previous;
        }
    }

    updateHealthBars(time) {
        for (const index in this.healthBars) {
            if (
                this.healthBars[index].hitPoints <=
                gameState.fighters[index].hitPoints
            )
                continue;

            this.healthBars[index].hitPoints = Math.max(
                0,
                this.healthBars[index].hitPoints - time.secondsPassed * FPS
            );
        }
    }

    updateKoIcon(time) {
        if (
            this.healthBars.every(
                (healthBar) => healthBar.hitPoints > HEALTH_CRITICAL_HIT_POINTS
            )
        )
            return;

        if (
            time.previous <
            this.koAnimationTimer + KO_FLASH_DELAY[this.koFrame]
        )
            return;

        this.koFrame = 1 - this.koFrame;
        this.koAnimationTimer = time.previous;
    }

    update(time) {
        this.updateTime(time);
        this.updateHealthBars(time);
        this.updateKoIcon(time);
    }

    drawFrame(context, frameKey, x, y, direction = 1) {
        drawFrame(
            context,
            this.image,
            this.frames.get(frameKey),
            x,
            y,
            direction
        );
    }

    drawHealthBars(context) {
        this.drawFrame(context, 'health-bar', 31, 20);
        this.drawFrame(
            context,
            KO_ANIMATION[this.koFrame],
            176,
            18 - this.koFrame
        );
        this.drawFrame(context, 'health-bar', 353, 20, -1);

        context.fillStyle = HEALTH_DAMAGE_COLOR;

        context.beginPath();
        context.fillRect(
            32,
            21,
            HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[0].hitPoints),
            9
        );

        context.fillRect(
            208 + Math.floor(this.healthBars[1].hitPoints),
            21,
            HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[1].hitPoints),
            9
        );
    }

    drawNameTags(context) {
        const [name1, name2] = this.names;

        this.drawFrame(context, name1, 32, 33);
        this.drawFrame(context, name2, 322, 33);
    }

    drawTime(context) {
        const timeString = String(Math.max(this.time, 0)).padStart(2, '00');
        const flashFrame = TIME_FRAME_KEYS[Number(this.useFlashFrames)];

        this.drawFrame(
            context,
            `${flashFrame}-${timeString.charAt(0)}`,
            178,
            33
        );
        this.drawFrame(
            context,
            `${flashFrame}-${timeString.charAt(1)}`,
            194,
            33
        );
    }

    drawScoreLabel(context, label, x) {
        for (const index in label) {
            this.drawFrame(
                context,
                `score-${label.charAt(index)}`,
                x + index * 12,
                1
            );
        }
    }

    drawScore(context, score, x) {
        const strScore = String(score);
        const padding = 6 * 12 - strScore.length * 12;

        this.drawScoreLabel(context, strScore, x + padding);
    }

    drawScores(context) {
        this.drawScoreLabel(context, 'P1', 17);
        this.drawScore(context, gameState.fighters[0].score, 45);

        this.drawScoreLabel(context, 'IURI', 133);
        this.drawScore(context, 50000, 177);

        this.drawScoreLabel(context, 'P2', 269);
        this.drawScore(context, gameState.fighters[1].score, 309);
    }

    draw(context) {
        this.drawScores(context);
        this.drawHealthBars(context);
        this.drawNameTags(context);
        this.drawTime(context);
    }
}
