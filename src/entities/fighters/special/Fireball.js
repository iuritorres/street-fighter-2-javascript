import {
    FighterAttackStrength,
    FighterAttackType,
    FighterHurtBox,
    FighterHurtBy,
} from '../../../constants/fighter.js';

import {
    FireballCollidedState,
    FireballState,
    FireballVelocity,
} from '../../../constants/fireball.js';

import {
    ENABLE_DEBUG,
    FRAME_TIME,
    SCREEN_WIDTH,
} from '../../../constants/game.js';

import {
    boxOverlap,
    getActualBoxDimensions,
} from '../../../utils/collisions.js';

import * as DEBUG from '../../../utils/entityDebug.js';

// prettier-ignore
const frames = new Map([
   ['hadouken-fireball-1', [[[400, 2756, 43, 32], [25, 16]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
   ['hadouken-fireball-2', [[[460, 2761, 56, 28], [37, 14]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
   ['hadouken-fireball-3', [[[0, 0, 0, 0], [0, 0]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],

   ['hadouken-collide-1', [[[543, 2767, 26, 20], [13, 10]], [0, 0, 0, 0]]],
   ['hadouken-collide-2', [[[590, 2766, 15, 25], [9, 13]], [0, 0, 0, 0]]],
   ['hadouken-collide-3', [[[625, 2764, 28, 28], [26, 14]], [0, 0, 0, 0]]],
]);

const animations = {
    [FireballState.ACTIVE]: [
        ['hadouken-fireball-1', 2],
        ['hadouken-fireball-3', 2],
        ['hadouken-fireball-2', 2],
        ['hadouken-fireball-3', 2],
    ],
    [FireballState.COLLIDED]: [
        ['hadouken-collide-1', 9],
        ['hadouken-collide-2', 5],
        ['hadouken-collide-3', 9],
    ],
};

export class Fireball {
    image = document.querySelector('img[alt="ken"]');

    animationFrame = 0;
    state = FireballState.ACTIVE;

    constructor(args, time, entityList) {
        const [fighter, strength] = args;

        this.fighter = fighter;
        this.entityList = entityList;
        this.velocity = FireballVelocity[strength];
        this.direction = this.fighter.direction;
        this.position = {
            x: this.fighter.position.x + 76 * this.direction,
            y: this.fighter.position.y - 57,
        };
        this.animationTimer = time.previous;
    }

    hasCollidedWithOpponent(hitbox) {
        for (const [, hurtBox] of Object.entries(
            this.fighter.opponent.boxes.hurt
        )) {
            const [x, y, width, height] = hurtBox;

            const actualOpponentHurtBox = getActualBoxDimensions(
                this.fighter.opponent.position,
                this.fighter.opponent.direction,
                { x, y, width, height }
            );

            if (boxOverlap(hitbox, actualOpponentHurtBox))
                return FireballCollidedState.OPPONENT;
        }
    }

    hasCollidedWithOtherFireball(hitbox) {
        const otherFireballs = this.entityList.entities.filter(
            (fireball) => fireball instanceof Fireball && fireball !== this
        );

        if (otherFireballs.length === 0) return;

        for (const fireball of otherFireballs) {
            const [x, y, width, height] = frames.get(
                animations[fireball.state][fireball.animationFrame][0]
            )[1];

            const otherActualHitBox = getActualBoxDimensions(
                fireball.position,
                fireball.direction,
                { x, y, width, height }
            );

            if (boxOverlap(hitbox, otherActualHitBox))
                return FireballCollidedState.FIREBALL;
        }
    }

    hasCollided() {
        const [x, y, width, height] = frames.get(
            animations[this.state][this.animationFrame][0]
        )[1];

        const actualHitBox = getActualBoxDimensions(
            this.position,
            this.direction,
            { x, y, width, height }
        );

        return (
            this.hasCollidedWithOpponent(actualHitBox) ??
            this.hasCollidedWithOtherFireball(actualHitBox)
        );
    }

    updateMovement(time, camera) {
        if (this.state !== FireballState.ACTIVE) return;

        this.position.x += this.velocity * this.direction * time.secondsPassed;

        if (
            this.position.x - camera.position.x > SCREEN_WIDTH + 56 ||
            this.position.x - camera.position.x < -56
        ) {
            this.entityList.remove(this);
        }

        const hasCollided = this.hasCollided();
        if (!hasCollided) return;

        this.state = FireballState.COLLIDED;
        this.animationFrame = 0;
        this.animationTimer =
            time.previous +
            animations[this.state][this.animationFrame][1] * FRAME_TIME;

        if (hasCollided !== FireballCollidedState.OPPONENT) return;

        this.fighter.opponent.handleAttackHit(
            time,
            FighterAttackStrength.HEAVY,
            FighterAttackType.PUNCH,
            undefined,
            FighterHurtBox.HEAD,
            FighterHurtBy.FIREBALL
        );
    }

    updateAnimation(time) {
        if (time.previous < this.animationTimer) return;

        this.animationFrame += 1;
        if (this.animationFrame >= animations[this.state].length) {
            this.animationFrame = 0;

            if (this.state === FireballState.COLLIDED)
                this.entityList.remove(this);
        }

        this.animationTimer =
            time.previous +
            animations[this.state][this.animationFrame][1] * FRAME_TIME;
    }

    update(time, _, camera) {
        this.updateMovement(time, camera);
        this.updateAnimation(time);
    }

    draw(context, camera) {
        const [frameKey] = animations[this.state][this.animationFrame];

        const [
            [[frameX, frameY, frameWidth, frameHeight], [originX, originY]],
            collisionDimensions,
        ] = frames.get(frameKey);

        context.scale(this.direction, 1);
        context.drawImage(
            this.image,
            frameX,
            frameY,
            frameWidth,
            frameHeight,
            Math.floor(
                (this.position.x - camera.position.x) * this.direction - originX
            ),
            Math.floor(this.position.y - camera.position.y - originY),
            frameWidth,
            frameHeight
        );
        context.setTransform(1, 0, 0, 1, 0, 0);

        // DEBUG
        if (!ENABLE_DEBUG) return;
        DEBUG.drawBox(
            context,
            camera,
            this.position,
            this.direction,
            collisionDimensions,
            '#FF0000'
        );
        DEBUG.drawCross(context, camera, this.position, '#FFF');
    }
}
