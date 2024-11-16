import {
    FIGHTER_HURT_DELAY,
    FighterAttackBaseData,
    FighterAttackStrength,
    FighterId,
} from '../constants/fighter.js';

import { FRAME_TIME, SCREEN_WIDTH } from '../constants/game.js';
import { STAGE_MID_POINT, STAGE_PADDING } from '../constants/stage.js';
import { Camera } from '../engine/Camera.js';
import { EntityList } from '../engine/EntityList.js';
import { pollControl } from '../engine/controlHistory.js';
import { Ken, Ryu } from '../entities/fighters/index.js';

import {
    HeavyHitSplash,
    LightHitSplash,
    MediumHitSplash,
    Shadow,
} from '../entities/fighters/shared/index.js';

import { FpsCounter } from '../entities/overlays/FpsCounter.js';
import { StatusBar } from '../entities/overlays/StatusBar.js';
import { KenStage } from '../entities/stage/KenStage.js';
import { gameState } from '../state/gameState.js';

export class BattleScene {
    fighters = [];
    shadows = [];
    camera = undefined;
    hurtTimer = undefined;
    fighterDrawOrder = [0, 1];

    constructor() {
        this.stage = new KenStage();
        this.entities = new EntityList();

        this.overlays = [new StatusBar(this.fighters), new FpsCounter()];

        this.startRound();
    }

    getFighterEntityClass(id) {
        switch (id) {
            case FighterId.RYU:
                return Ryu;

            case FighterId.KEN:
                return Ken;

            default:
                throw new Error('Unimplemented fighter entity request!');
        }
    }

    getFighterEntity(fighterState, index) {
        const FighterEntityClass = this.getFighterEntityClass(fighterState.id);

        return new FighterEntityClass(
            index,
            this.handleAttackHit.bind(this),
            this.entities
        );
    }

    getFighterEntities() {
        const fighterEntities = gameState.fighters.map(
            this.getFighterEntity.bind(this)
        );

        fighterEntities[0].opponent = fighterEntities[1];
        fighterEntities[1].opponent = fighterEntities[0];

        return fighterEntities;
    }

    getHitSplashClass(strength) {
        switch (strength) {
            case FighterAttackStrength.LIGHT:
                return LightHitSplash;

            case FighterAttackStrength.MEDIUM:
                return MediumHitSplash;

            case FighterAttackStrength.HEAVY:
                return HeavyHitSplash;

            default:
                throw new Error('Unknown strength requested!');
        }
    }

    handleAttackHit(time, playerId, opponentId, position, strength) {
        // Applying Score
        gameState.fighters[playerId].score +=
            FighterAttackBaseData[strength].score;

        // Applying Damage
        gameState.fighters[opponentId].hitPoints -=
            FighterAttackBaseData[strength].damage;

        this.hurtTimer = time.previous + FIGHTER_HURT_DELAY * FRAME_TIME;

        this.fighterDrawOrder = [playerId, opponentId];
        if (!position) return;

        this.entities.add(
            this.getHitSplashClass(strength),
            time,
            position.x,
            position.y,
            playerId
        );
    }

    startRound() {
        this.fighters = this.getFighterEntities();

        this.camera = new Camera(
            STAGE_MID_POINT + STAGE_PADDING - SCREEN_WIDTH / 2,
            16,
            this.fighters
        );
        this.shadows = this.fighters.map((fighter) => new Shadow(fighter));
    }

    finishRound(winner, time) {
        winner.handleFinishRound(true, time);
        winner.opponent.handleFinishRound(false, time);
    }

    updateFighters(time, context) {
        for (const fighter of this.fighters) {
            pollControl(time, fighter.playerId, fighter.direction);

            if (time.previous < this.hurtTimer) {
                fighter.updateHurtShake(time, this.hurtTimer);
            } else {
                fighter.update(time, context, this.camera);
            }

            if (gameState.fighters[fighter.playerId].hitPoints <= 0)
                this.finishRound(fighter.opponent, time);

            const statusBar = this.overlays.filter((overlay) =>
                Object.keys(overlay).includes('time')
            )[0];

            if (!statusBar.time <= 0) continue;

            if (
                gameState.fighters[fighter.playerId].hitPoints ===
                gameState.fighters[fighter.opponent.playerId].hitPoints
            ) {
                this.finishRound(fighter, time);
                this.finishRound(fighter.opponent, time);
            }

            if (
                gameState.fighters[fighter.playerId].hitPoints >
                gameState.fighters[fighter.opponent.playerId].hitPoints
            ) {
                this.finishRound(fighter, time);
            }
        }
    }

    updateShadows(time, context) {
        for (const shadow of this.shadows) {
            shadow.update(time, context, this.camera);
        }
    }

    updateOverlays(time, context) {
        for (const overlay of this.overlays) {
            overlay.update(time, context, this.camera);
        }
    }

    update(time, context) {
        this.updateFighters(time, context);
        this.updateShadows(time, context);
        this.stage.update(time);
        this.entities.update(time, context, this.camera);
        this.camera.update(time, context);
        this.updateOverlays(time, context);
    }

    drawFighters(context) {
        for (const fighterId of this.fighterDrawOrder) {
            this.fighters[fighterId].draw(context, this.camera);
        }
    }

    drawShadows(context) {
        for (const shadow of this.shadows) {
            shadow.draw(context, this.camera);
        }
    }

    drawOverlays(context) {
        for (const overlay of this.overlays) {
            overlay.draw(context, this.camera);
        }
    }

    draw(context) {
        this.stage.drawBackground(context, this.camera);
        this.drawShadows(context);
        this.drawFighters(context);
        this.entities.draw(context, this.camera);
        this.stage.drawForeground(context, this.camera);
        this.drawOverlays(context);
    }
}
