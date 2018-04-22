var tokens = [ ['{','}'] , ['[',']'] , ['(',')'] ];

var btn = document.getElementById('btn');
btn.addEventListener('click', isBalanced);

// *** Check if character is an opening bracket ***
function isOpenParenthesis(parenthesisChar) {
  for (var j = 0; j < tokens.length; j++) {
    if (tokens[j][0] === parenthesisChar) {
      return true;
    }
  }
  return false;
}

// *** Check if character is an closing bracket ***
function isCloseParenthesis(parenthesisChar) {
  for (var j = 0; j < tokens.length; j++) {
    if (tokens[j][1] === parenthesisChar) {
      return true;
    }
  }
  return false;
}

// *** Check if opening bracket matches closing bracket ***
function matches(topOfStack, closedParenthesis) {
  for (var k = 0; k < tokens.length; k++) {
    if (tokens[k][0] === topOfStack && tokens[k][1] === closedParenthesis) {
      return true;
    }
  }
  return false;
}

// *** Checks if item is any sort of paranthesis ***
function isParanthesis(char) {
  var str = '{}[]()';
  if (str.indexOf(char) > -1) {
    return true;
  } else {
    return false;
  }
}

// *** Prints answer of the string to the HTML page  ***
function printToScreen(bool, char, index, type) {
  var parensStr = document.getElementById('input-one');
  var inputStr = parensStr.value
  var answer = document.getElementById('answer');
  if (bool) {
    answer.innerHTML = `<span class="bold">Your code is valid!</span>`;
  } else {
    if(type && type == "close"){
      answer.innerHTML = `Error!, 
        closing bracket <span class="bold">${(char)}</span> at 
        <span class="bold">${index}</span> has unmatching bracket.`;    
    }else if(char){
      answer.innerHTML = `Error!, 
        opening bracket <span class="bold">${(char)}</span> at 
        <span class="bold">${index}</span> has unmatching bracket.`;
    }else{
      answer.innerHTML = `<span class="bold">Your code is not valid!</span>`;
    }
  }
}

// *** We excute this function upon the event ***
function isBalanced() {
  var parensStr = document.getElementById('input-one');
  var inputStr = parensStr.value
  if (inputStr === null) { printToScreen(true); }

  var expression = inputStr.split('');
  var stack = [];
  var stackMap = [];

  for (var i = 0; i < expression.length; i++) {
    var char = expression[i];
    if (isParanthesis(char)) {
      //check if the char is one among the opening tokens
      if (isOpenParenthesis(char)) {
        stack.push(char);
        stackMap.push({index : i, char : char})
      } else {
        //check if the char is one among the closing tokens
        if (stack.length === 0) {
          if (isParanthesis(char)) {
            if(isCloseParenthesis(char)){
              //find the first unmatching close bracket.
              return printToScreen(false, char, i, "close");
            }
           }
        }
        var top = stack.pop(); // pop off the top element from stack
        stackMap.pop();
        if (!matches(top, char)) {
          //find the first unmatching close bracket.
          return printToScreen(false, char, i, "close");
        }
      }
    }
  }
  if(stackMap.length){
    var firstChar = stackMap[0];
    //find the first unmatching open bracket.
    return printToScreen(false, firstChar.char, firstChar.index, "open");
  }
  var returnValue = stack.length === 0 ? true : false;
  stack = [];
  printToScreen(returnValue)
}
