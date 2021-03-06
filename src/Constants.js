export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const SKIER_JUMP1 = 'skierJump1';
export const SKIER_JUMP2 = 'skierJump2';
export const SKIER_JUMP3 = 'skierJump3';
export const SKIER_JUMP4 = 'skierJump4';
export const SKIER_JUMP5 = 'skierJump5';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const JUMP_RAMP = 'jumpRamp';
export const RHINO_DOWN1 = 'rhinoDown1';
export const RHINO_DOWN2 = 'rhinoDown2';
export const RHINO_DOWN3 = 'rhinoDown3';
export const RHINO_LIFT1 = 'rhinoLift1';
export const RHINO_LIFT2 = 'rhinoLift2';
export const RHINO_LIFT3 = 'rhinoLift3';
export const RHINO_LIFT4 = 'rhinoLift4';
export const RHINO_LIFT5 = 'rhinoLift5';
export const RHINO_LIFT6 = 'rhinoLift6';

export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const SKIER_DISTANCE_ADVANTAGE = 100;

export const RHINO_STARTING_DIFERENCE_POSITION = 150;
export const RHINO_STARTING_SPEED = 5;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [SKIER_JUMP1]: 'img/skier_jump_1.png',
    [SKIER_JUMP2]: 'img/skier_jump_2.png',
    [SKIER_JUMP3]: 'img/skier_jump_3.png',
    [SKIER_JUMP4]: 'img/skier_jump_4.png',
    [SKIER_JUMP5]: 'img/skier_jump_5.png',
    [TREE] : 'img/tree_1.png',
    [TREE_CLUSTER] : 'img/tree_cluster.png',
    [ROCK1] : 'img/rock_1.png',
    [ROCK2] : 'img/rock_2.png',
    [JUMP_RAMP] : 'img/jump_ramp.png',
    [RHINO_DOWN1] : 'img/rhino_default.png',
    [RHINO_DOWN2] : 'img/rhino_run_left.png',
    [RHINO_DOWN3] : 'img/rhino_run_left_2.png',
    [RHINO_LIFT1] : 'img/rhino_lift.png',
    [RHINO_LIFT2] : 'img/rhino_lift_mouth_open.png',
    [RHINO_LIFT3] : 'img/rhino_lift_eat_1.png',
    [RHINO_LIFT4] : 'img/rhino_lift_eat_2.png',
    [RHINO_LIFT5] : 'img/rhino_lift_eat_3.png',
    [RHINO_LIFT6] : 'img/rhino_lift_eat_4.png'
};

export const SKIER_DIRECTIONS = {
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5,
	JUMP : 6,
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT,
    [SKIER_DIRECTIONS.JUMP] : SKIER_JUMP1
};

export const KEYS = {
	LEFT : 37,
	RIGHT : 39,
	UP : 38,
	DOWN : 40,
	SPACE : 32,
	ENTER : 13
};
