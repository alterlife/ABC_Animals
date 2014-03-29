
// ABC display code.
var abc={
	alphabets: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
	words: {
		"A": ["Armadillo"],
		"B": ["Badger"],
		"C": ["Cat"],
    "D": ["Dog"],
    "E": ["Elephant"],
    "F": ["Fish"],
    "G": ["Goat"],
    "H": ["Hamster"],
    "I": ["Impala"],
    "J": ["Jaguar"],
    "K": ["Kangaroo"],
    "L": ["Llama"],
    "M": ["Monkey"],
    "N": ["Nightingale"],
    "O": ["Otter"],
    "P": ["Penguin"],
    "Q": ["Quail"],
    "R": ["Rabbit"],
    "S": ["Sheep"],
    "T": ["Tortoise"],
    "U": ["Urchin"],
    "V": ["Vulture"],
    "W": ["Walrus"],
    "X": ["X-Ray fish"],
    "Y": ["Yak"],
    "Z": ["Zebra"]
	},
	alphabetIndex: 0,
	wordIndex: 0
};

abc.nextAlphabet = function() {
	if(++this.alphabetIndex  >= this.alphabets.length)
		this.alphabetIndex = 0;
	this.wordIndex = 0;
}

abc.prevAlphabet = function() {
	if(--this.alphabetIndex <0) 
		this.alphabetIndex = this.alphabets.length-1;
	this.wordIndex = 0;
}

abc.nextWord = function() {
	if(++this.wordIndex >= this.words[abc.alphabet()].length) 
		this.nextAlphabet();
}

abc.prevWord = function() {
	if(--this.wordIndex < 0) {
		this.prevAlphabet();
		this.wordIndex = this.words[abc.alphabet()].length-1;
	}
}

abc.alphabet = function() {
	return this.alphabets[this.alphabetIndex];
}

abc.word = function() {
	return this.words[this.alphabet()][this.wordIndex];
}

abc.sayWord = function() {
  document.getElementById('sound').src= "media/" + abc.word() + ".mp3";
  document.getElementById('word').className = 'word shake';
  document.getElementById('sound').play();
  setTimeout(function() { document.getElementById('word').className = 'word';}, 1000 );
}

abc.sayAlphabet = function() {
  document.getElementById('sound').src= "media/" + abc.alphabet() + ".mp3";
 document.getElementById('alphabet').className = 'alphabet shake';
  document.getElementById('sound').play();

  setTimeout(function() { document.getElementById('alphabet').className = 'alphabet';}, 1000 );
  
}

abc.render = function() {
  html = document.getElementById('template').innerHTML;
  html = html.split('<%=abc.word()%>').join(abc.word());
  html = html.split('<%=abc.alphabet();%>').join(abc.alphabet());
  return html;
}

abc.showNextWord = function() {
  abc.nextWord();
  document.getElementById('display').innerHTML = abc.render();
  abc.sayAlphabet();
  setTimeout(function() {abc.sayWord();}, 1000 );
}

abc.showPrevWord = function() {
  abc.prevWord();
  document.getElementById('display').innerHTML = abc.render();
  abc.sayAlphabet();
  setTimeout(function() {abc.sayWord();}, 1000 );
}

abc.buildScript = function() {
    /* get all alphabet and word mp3s */
    script = "";
    for(alphabet in this.words) {
      script = script + "get " + alphabet + "\n";
      for(i = 0;this.words[alphabet][i];i++){
        script = script + "get " + this.words[alphabet][i]  + "\n";
      }
    }
    console.log(script);
    /* get all factoid mp3's */
}


function init() {
  this.alphabetIndex = 0;
  this.wordIndex = 0;
  document.getElementById('display').innerHTML = abc.render();
  abc.sayAlphabet();
  setTimeout(function() {abc.sayWord();}, 1000 );
}