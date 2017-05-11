var messages = [

	[
		// Help, Bob! Something has gone wrong!
		'Help, Bob!',
		'Something',
		'has gone',
		'wrong!'
	],

	[
		// Alice, what has happened? Are you safe?
		'Alice,',
		'what has',
		'happened?',
		'Are you',
		'safe?'
	],

	[
		// Muahaha, Alice is my hostage! The Net-Napper strikes again!
		'Haha, Alice',
		'is now my',
		'hostage!',
		'The Napper',
		'strikes again!'
	],

	[
		// Help! The Net-Napper has my sister Alice in Nomanisan!
		'Help! The',
		'Napper has',
		'my sister',
		'Alice in',
		'Nomanisan!'
	],

	[
		// We are on our way. Thanks for the tip-off!
		'We are on',
		'our way.',
		'Thanks for',
		'the tip-off!',
	]

];

var report_text = [
	'Congratulations',
	'You were perfect in helping Mr. Router. Good job!',
	'Oh dear...',
	'You made ',
	' mistakes. Would you like to try again?'
];

// Global variables that serve as parameters to message receiving game.
var receiving_params = {
	message: messages[0],
	oddmode: true,
	passScene: 'Scene 1 Pass'
};

var receiving_result = [];

// Global variables that serve as parameters to message sending game.
var sending_params = {
	message: messages[1],
	oddmode: true,
	passScene: 'Scene 2 Pass',
};

var sending_result = [];

// Global variables for music.
var music_volume = 0.5;

var menu_music = null;
var voyage_music = null;
var quiz_music = null;
var race_music = null;
var tension_music = null;
var wait_music = null;
var success_music = null;

var current_music = null;

// Global variables for keeping score.
var mistakes_made = 0;

function fade(music) {
	$(music).animate({
		volume: 0
	}, 900, function() {
		music.pause();
	})
}

function switchMusic(music) {
	if (music.paused) {
		if (current_music && !current_music.paused && current_music != music) {
			current_music.pause();
		}
		music.currentTime = 0;
    music.volume = music_volume;
		music.play();
		current_music = music;
	};
}

function calculateParity(bits, oddmode) {
	var sum = 0;
	for (var i = 0; i < bits.length; i++) {
		sum += (bits.charAt(i) == '0') ? 0 : 1;
	}
	if (sum % 2 == 0) {
		return oddmode ? '1' : '0';
	} else {
		return oddmode ? '0' : '1';
	}
}

function randomBits(length) {
	var bits = '';
	for (var i = 0; i < length; i++) {
		bits += (Math.random() < 0.5) ? '0' : '1';
	}
	return bits;
}

function randomLine() {
	var line = '';
	for (var i = 0; i < 7; i++) {
		line += String.fromCharCode(32 + Math.floor(Math.random() * (127 - 32)));
	}
	return line;
}

function checkByte(byte, oddmode) {
	return calculateParity(byte.slice(0, 7), oddmode) == byte.charAt(7);
}

function modifyBits(bits) {
	var index = Math.floor(Math.random() * bits.length);
	var bit = bits.charAt(index);
	bits = bits.slice(0, index) + ((bit == '0') ? '1' : '0') + bits.slice(index + 1);
	return bits;
}

function generateReport(hypeDocument, scene) {

	if (mistakes_made == 0) {
		hypeDocument.getElementById('scene' + scene + '_title').innerHTML = 'Congratulations';
		hypeDocument.getElementById('scene' + scene + '_text').innerHTML = 'You were perfect in helping Mr. Router. Good job!';
	} else {
		hypeDocument.getElementById('scene' + scene + '_title').innerHTML = 'Oh dear...';
		hypeDocument.getElementById('scene' + scene + '_text').innerHTML = 'You made ' + mistakes_made + ' ' + (mistakes_made == 1 ? 'mistake' : 'mistakes') + '. Would you like to try again?';
	}

}
