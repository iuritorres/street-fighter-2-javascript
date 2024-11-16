import { FRAME_TIME } from './game.js';

export const PUSH_FRICTION = 66;
export const FIGHTER_START_DISTANCE = 88;
export const FIGHTER_HURT_DELAY = 7 + 8;

export const FighterDirection = {
    LEFT: -1,
    RIGHT: 1,
};

export const FighterId = {
    RYU: 'Ryu',
    KEN: 'Ken',
};

export const FighterAttackType = {
    PUNCH: 'punch',
    KICK: 'kick',
};

export const FighterAttackStrength = {
    LIGHT: 'light',
    MEDIUM: 'medium',
    HEAVY: 'heavy',
};

export const FighterHurtBox = {
    HEAD: 'head',
    BODY: 'body',
    FEET: 'feet',
};

export const FighterHurtBy = {
    FIGHTER: 'fighter',
    FIREBALL: 'fireball',
};

export const FighterAttackBaseData = {
    [FighterAttackStrength.LIGHT]: {
        score: 100,
        damage: 12,
        slide: {
            velocity: -10 * FRAME_TIME,
            friction: 600,
        },
    },
    [FighterAttackStrength.MEDIUM]: {
        score: 300,
        damage: 20,
        slide: {
            velocity: -12 * FRAME_TIME,
            friction: 600,
        },
    },
    [FighterAttackStrength.HEAVY]: {
        score: 500,
        damage: 28,
        slide: {
            velocity: -16 * FRAME_TIME,
            friction: 800,
        },
    },
};

export const FighterState = {
    IDLE: 'idle',
    WALK_FORWARD: 'walk-forwards',
    WALK_BACKWARD: 'walk-backwards',
    JUMP_START: 'jump-start',
    JUMP_UP: 'jump-up',
    JUMP_FORWARD: 'jump-forwards',
    JUMP_BACKWARD: 'jump-backwards',
    JUMP_LAND: 'jump-land',
    CROUCH: 'crouch',
    CROUCH_DOWN: 'crouch-down',
    CROUCH_UP: 'crouch-up',
    IDLE_TURN: 'idle-turn',
    CROUCH_TURN: 'crouch-turn',
    LIGHT_PUNCH: 'light-punch',
    MEDIUM_PUNCH: 'medium-punch',
    HEAVY_PUNCH: 'heavy-punch',
    LIGHT_KICK: 'light-kick',
    MEDIUM_KICK: 'medium-kick',
    HEAVY_KICK: 'heavy-kick',
    HURT_HEAD_LIGHT: 'hurt-head-light',
    HURT_HEAD_MEDIUM: 'hurt-head-medium',
    HURT_HEAD_HEAVY: 'hurt-head-heavy',
    HURT_BODY_LIGHT: 'hurt-body-light',
    HURT_BODY_MEDIUM: 'hurt-body-medium',
    HURT_BODY_HEAVY: 'hurt-body-heavy',
    SPECIAL_1: 'special-1',
    WINNER_POSE: 'winner-pose',
};

export const FrameDelay = {
    FREEZE: 0,
    TRANSITION: -1,
};

export const PushBox = {
    IDLE: [-16, -80, 32, 78],
    JUMP: [-16, -91, 32, 66],
    BEND: [-16, -58, 32, 58],
    CROUCH: [-16, -50, 32, 50],
};

// Head, Body, Feet, Respectively
export const HurtBox = {
    IDLE: [
        [-8, -88, 24, 16],
        [-26, -74, 40, 42],
        [-26, -31, 40, 32],
    ],
    BACKWARD: [
        [-19, -88, 24, 16],
        [-26, -74, 40, 42],
        [-26, -31, 40, 32],
    ],
    FORWARD: [
        [-3, -88, 24, 16],
        [-26, -74, 40, 42],
        [-26, -31, 40, 32],
    ],
    JUMP: [
        [-13, -106, 28, 18],
        [-26, -90, 40, 42],
        [-22, -66, 38, 18],
    ],
    BEND: [
        [-2, -68, 24, 18],
        [-16, -53, 44, 24],
        [-16, -24, 44, 24],
    ],
    CROUCH: [
        [6, -61, 24, 18],
        [-16, -46, 44, 24],
        [-16, -24, 44, 24],
    ],
    PUNCH: [
        [11, -94, 24, 18],
        [-7, -77, 40, 43],
        [-7, -33, 40, 33],
    ],
};

export const HurtStateValidFrom = [
    FighterState.IDLE,
    FighterState.WALK_BACKWARD,
    FighterState.WALK_FORWARD,
    FighterState.JUMP_LAND,
    FighterState.JUMP_START,
    FighterState.JUMP_UP,
    FighterState.IDLE_TURN,
    FighterState.LIGHT_PUNCH,
    FighterState.MEDIUM_PUNCH,
    FighterState.HEAVY_PUNCH,
    FighterState.LIGHT_KICK,
    FighterState.MEDIUM_KICK,
    FighterState.HEAVY_KICK,
    FighterState.HURT_HEAD_LIGHT,
    FighterState.HURT_HEAD_MEDIUM,
    FighterState.HURT_HEAD_HEAVY,
    FighterState.HURT_BODY_LIGHT,
    FighterState.HURT_BODY_MEDIUM,
    FighterState.HURT_BODY_HEAVY,
    FighterState.SPECIAL_1,
];

export const SpecialMoveDirection = {
    BACKWARD: 'backward',
    BACKWARD_UP: 'backward-up',
    UP: 'up',
    FORWARD_UP: 'forward-up',
    FORWARD: 'forward',
    FORWARD_DOWN: 'forward-down',
    DOWN: 'down',
    BACKWARD_DOWN: 'backward-down',
    NONE: 'none',
};

export const SpecialMoveButton = {
    ANY_PUNCH: 'any-punch',
    ANY_KICK: 'any-kick',
};
