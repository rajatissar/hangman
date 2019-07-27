// Given PoolValues
const pool_values = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
// Given Ques, Ans
const ques_ans_array = [
  { ques:"Founder of Facebook", ans: "MARK ZUCKERBURG" },
  { ques:"Founder of Google", ans: "LARRY PAGE" },
  { ques:"Capital of INDIA", ans: "NEW DELHI" },
  { ques:"One of Neighbor country of INDIA", ans: "BHUTAN" },
  { ques:"Prime Minister of INDIA", ans: "NARENDRA MODI" },
  { ques:"One Of Bollywood Actor", ans: "SALMAN KHAN" },
  { ques:"Captain of RCB Team in IPL", ans: "VIRAT KOHLI" },
  { ques:"National Animal of INDIA", ans: "TIGER" },
  { ques:"Highest Award to an Indian", ans: "BHARAT RATNA" },
  { ques:"World richest man", ans: "BILL GATES" }
];
const max_score = ques_ans_array.length;
const number_of_chance_for_each_ques = 6;
let is_game_playing = false;
let timer_time = 60;
let set_interval_timer_instance;
let previous_asked_ques_ans_indexes = [];
let current_answer;
let right_guess = 0;
let wrong_guess = 0;
let right_no_of_inputs_for_question = 0;
let score = 0;

// function to create input box so that user can choose from specific characters
function input_text_boxes_creation () {
  const input_text_boxes = pool_values.map(value => `<div id="${value}" onclick="check_input_character(id);">${value}</div>`).join(" ");;
  document.querySelector(".pool_characters_container").innerHTML = input_text_boxes;
};

input_text_boxes_creation();

function init_before_each_ques () {
  right_guess = 0;
  wrong_guess = 0;
  right_no_of_inputs_for_question = 0;
  document.getElementById("ques").innerHTML = "";
  document.getElementById("guess").innerHTML = "";
  document.getElementById("hangman_image").src = "images/0.jpg";
  pool_values.forEach((character) => {
    document.getElementById(character).style.backgroundColor = "white";
    document.getElementById(character).style.color = "black";
  });
};

function init_game_to_starting_state () {
  init_before_each_ques();
  is_game_playing = false;
  score = 0;
  document.getElementById("timer").value = "";
  document.getElementById("score").value = "0";
  clearInterval(set_interval_timer_instance);
}

function toggle_button_name () {
  if(document.getElementById("play_game_button").innerHTML == "End Game") {
    document.getElementById("play_game_button").innerHTML = "Start Game";
  }
  else {
    document.getElementById("play_game_button").innerHTML = "End Game";
  }
};

// function to create timer
function start_timer () {
  timer_time= 60;
  clearInterval(set_interval_timer_instance);
  set_interval_timer_instance = setInterval(function () {
    document.getElementById("timer").value = timer_time;
    if (timer_time === 0) {
      end_game();
      return clearInterval(set_interval_timer_instance);
    }
    else if (timer_time <= 10){
      document.getElementById("timer").style.color = "red";
    }
    timer_time--;    
  }, 1000);
};

// generate random ques
function generate_random_question_index() {
  const random_ques_ans_index = Math.floor(Math.random() * (10 - 0));
  if (previous_asked_ques_ans_indexes.indexOf(random_ques_ans_index) === -1) {
    previous_asked_ques_ans_indexes.push(random_ques_ans_index);
    return random_ques_ans_index;
  } else {
    return generate_random_question_index();
  };
};

function create_ques_ans_boxes(index) {
  const current_ques = ques_ans_array[index].ques;
  current_answer = ques_ans_array[index].ans;

  // create ques as an h3 element in HTML
  const ques_element = document.createElement("h3");
  const ques_content = document.createTextNode(current_ques);
  ques_element.appendChild(ques_content);
  document.getElementById("ques").appendChild(ques_element);

  // create dynamic div for guess
  ans_len = current_answer.length;
  let ans_div_container = document.getElementById("guess");
  for (let i = 0; i < ans_len; i++) {
    let ans_div = document.createElement("div");
    ans_div_container.appendChild(ans_div);
    ans_div.id = i;
    if (current_answer[i] == " ") {
      document.getElementById(i).style.visibility = "hidden";
      document.getElementById(i).style.clear = "left";
    }
    else{
      right_no_of_inputs_for_question++;
    }
  }
};

function start_game () {
  init_game_to_starting_state();
  toggle_button_name();
  start_timer();
  is_game_playing = true;
  const random_ques_ans_index = generate_random_question_index();
  create_ques_ans_boxes(random_ques_ans_index);
}

function end_game () {
  alert("Game finished by you.\nYour score is " + score);
  init_game_to_starting_state();
  toggle_button_name();
}
  
function play_game() {
  if (document.getElementById('play_game_button').innerHTML == "Start Game") {
    start_game();
  }
  else {
    end_game();
  }
};

function mark_typed_character (current_input_character) {
  document.getElementById(current_input_character).style.backgroundColor = "black";
  document.getElementById(current_input_character).style.color = "white";
}

function is_answer_contains_character (character) {
  if(current_answer.indexOf(character) == -1) {
    return false;
  }
  return true;
}

function game_won () {
  alert("You won the game\nYour Score is "+ score + "\nEither end this game or refresh the screen to start a new game");
  // location.reload();
};

function game_loose () {
  alert("You loose the game.\nYour Score is " + score + "\nEither end this game or refresh the screen to start a new game");
};

function generate_next_ques () {  
  init_before_each_ques();
  const random_ques_ans_index = generate_random_question_index();
  create_ques_ans_boxes(random_ques_ans_index);
};

function check_input_character(key) {
  if(key == "Enter"){
    return play_game();
  }
  else if(!is_game_playing){
   return alert("Please start the game before typing any text");
  }
  const current_input_character = key.toUpperCase();
  mark_typed_character(current_input_character);
  const is_present = is_answer_contains_character(current_input_character);
  if(!is_present) {
    wrong_guess++;
    if (wrong_guess == 1) {
      document.getElementById("hangman_image").src = "images/1.jpg";
    }
    else if (wrong_guess == 2) {
      document.getElementById("hangman_image").src = "images/2.jpg";
    }
    else if (wrong_guess == 3) {
      document.getElementById("hangman_image").src = "images/3.jpg";
    }
    else if (wrong_guess == 4) {
      document.getElementById("hangman_image").src = "images/4.jpg";
    }
    else if (wrong_guess == 5) {
      document.getElementById("hangman_image").src = "images/5.jpg";
    }
    else if (wrong_guess == number_of_chance_for_each_ques) {
      document.getElementById("hangman_image").src = "images/6.jpg";
      game_loose();
    }
  }
  else {
    current_answer.split('').forEach((character, index) => {
      if(character == current_input_character && document.getElementById(index).innerHTML == "") {
        right_guess++;
        document.getElementById(index).innerHTML = character;
      };
    })
  }
  
  if(right_guess == right_no_of_inputs_for_question) {
    score++;
    document.getElementById("score").value = score;
    if(score == max_score){
      return game_won();
    }
    generate_next_ques();
  }
};
