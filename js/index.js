// Given PoolValues
const pool_values = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
// Given Ques, Ans
const ques_ans_obj = [
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
let time_in_seconds = 12;
let set_interval_timer_instance;
let previous_asked_ques_ans_indexes = [];
let right_no_of_inputs_for_question;
let current_answer;
const number_of_chance_for_ques = 6;
let right_guess = 0;
let wrong_guess = 0;
let score = 0;

// function to create input box so that user can choose from specific characters
function input_text_boxes_creation () {
  const input_text_boxes = pool_values.map(value => `<div id="${value}" onclick="check_input_character(id);">${value}</div>`).join(" ");;
  document.querySelector(".pool_characters_container").innerHTML = input_text_boxes;
};

input_text_boxes_creation();

function toggle_button_name () {
  if(document.getElementById("play_game_button").innerHTML == "End Game") {
    document.getElementById("play_game_button").innerHTML = "Start Game";
  }
  else {
    document.getElementById("play_game_button").innerHTML = "End Game";
  }
  // clearInterval(set_interval_timer_instance);
};

// function to create timer
function start_timer () {
  clearInterval(set_interval_timer_instance);
  set_interval_timer_instance = setInterval(function () {
    document.getElementById("timer").value = time_in_seconds;
    if (time_in_seconds === 0) {
      end_game();
      return clearInterval(set_interval_timer_instance);
    }
    else if (time_in_seconds <= 10){
      document.getElementById("timer").style.color = "red";
    }
    time_in_seconds--;    
  }, 1000);
};

// removing previously created div
function removing_previous_created_ques_ans () {
  document.getElementById("ques").innerHTML = "";
  document.getElementById("guess").innerHTML = "";
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
  const ques = ques_ans_obj[index].ques;
  const answer = ques_ans_obj[index].ans;
  current_answer = ques_ans_obj[index].ans;

  // create ques as an h3 element in HTML
  const ques_element = document.createElement("h3");
  const ques_content = document.createTextNode(ques);
  ques_element.appendChild(ques_content);
  document.getElementById("ques").appendChild(ques_element);

  // create dynamic div for guess
  ans_len = answer.length;
  let ans_div_container = document.getElementById("guess");
  for (let i = 0; i < ans_len; i++) {
    let ans_div = document.createElement("div");
    ans_div_container.appendChild(ans_div);
    ans_div.id = i;
    if (answer[i] == " ") {
      document.getElementById(i).style.visibility = "hidden";
      document.getElementById(i).style.clear = "left";
    }
  }
};

function get_right_no_of_inputs_for_question (index) {
  const answer = ques_ans_obj[index].ans;
  const answer_length = answer.length;
  let inputs = 0;
  for (let i = 0; i < answer_length; i++) {
    if (answer[i] !== " ") {
      inputs++;
    }
  }
  return inputs;
};
   
function is_answer_contains_character (character) {
  if(current_answer.indexOf(character) != -1) {
    return true;
  }
  return false;
}

function start_game () {
  document.getElementById("hangman_image").src = "images/0.jpg";
  toggle_button_name();
  start_timer();
  removing_previous_created_ques_ans();
  const random_ques_ans_index = generate_random_question_index();
  create_ques_ans_boxes(random_ques_ans_index);
  right_no_of_inputs_for_question = get_right_no_of_inputs_for_question(random_ques_ans_index);
}

function end_game () {
  toggle_button_name();
  document.getElementById("timer").value = "";
  document.getElementById("ques").innerHTML = "";
  document.getElementById("guess").innerHTML = "";
  document.getElementById("score").value = "0";
  clearInterval(set_interval_timer_instance);
  setTimeout(()=>{
    alert("Game over");
  },1000);
}
  
function play_game() {
  if (document.getElementById('play_game_button').innerHTML == "Start Game") {
    start_game();
  }
  else {
    end_game();
  }
  // document.getElementById("game_container").style.visibility = "visible";
  // document.getElementById("startGame").style.pointerEvents = "none";
};

function check_input_character(key) {
  console.log('>>>>>>>>>> key', key);
  const current_input_character = key.toUpperCase();
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
    else if (wrong_guess == number_of_chance_for_ques) {
      document.getElementById("hangman_image").src = "images/6.jpg";
      end_game();
    }
  }
  else {
    current_answer.split('').forEach((character,index) => {
      if(character == current_input_character && document.getElementById(index).innerHTML == "") {
        right_guess++;
        document.getElementById(index).value = character;
      };
    })
  }
  
  if(right_guess == right_no_of_inputs_for_question) {
    clearInterval(set_interval_timer_instance);
    score++;
    document.getElementById("score").innerHTML = score;
    // alert("next ques or you won");
  }
};
