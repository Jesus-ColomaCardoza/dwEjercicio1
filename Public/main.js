//init variables
let uncoveredcards=0;
let card1=null;
let card2=null;
let result1=null;
let result2=null;
let movements=0;
let hits=0;
let timer=false;
let totalTime=30;
let setIntervalTimer=null;

//variables of audio
let winAudio= new Audio('./sounds/win.wav');
let loseAudio= new Audio('./sounds/lose.wav');
let clickAudio= new Audio('./sounds/click.wav');
let rightAudio= new Audio('./sounds/right.wav');
let wrongAudio= new Audio('./sounds/wrong.wav');


//point to a  html document
let showmMovements=document.getElementById('movimientos');
let showHits=document.getElementById('aciertos');
let showTime=document.getElementById('t-restante');

//generation random  numbers 
let numbers=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers=numbers.sort(()=>{return Math.random()-0.5});
//console.log(numbers);


//function to block cards
function blockCards(){
	for (var i = 0; i < 16; i++) {
		let blockCard=document.getElementById(i);
		if(blockCard.classList.contains("greencards")==false){
			blockCard.innerHTML=`<img class="img-dec" src="./img/${numbers[i]}.png">`;
			blockCard.disabled=true;
			blockCard.classList.add("redcards");
		}
	}
}

//function countTime
function countTime(){
	setIntervalTimer=setInterval(()=>{ //inicia el timer
		totalTime--;
		showTime.innerHTML=`Tiempo: ${totalTime} segundos`;
		if(totalTime==0){
			clearInterval(setIntervalTimer);//stop the timer when it come to 0 segundos
			blockCards();
			loseAudio.play(); //we play the audio when the player loses and he runs out of tiempo
		}
	},1000);
}

//function main
function destapar(id){

	if (timer==false) {
		countTime();
		timer=true;
	}

	uncoveredcards++;

	if (uncoveredcards == 1) {
		//clickAudio
		clickAudio.play();

		//show first number
		card1=document.getElementById(id);
		result1=numbers[id];		
		card1.innerHTML=`<img class="img-dec" src="./img/${result1}.png">`;

		//disable first button
		card1.disabled=true;
	}else if(uncoveredcards==2){
		//show second number
		card2=document.getElementById(id);
		result2=numbers[id];
		card2.innerHTML=`<img class="img-dec" src="./img/${result2}.png">`;

		//disable second button
		card2.disabled=true;

		//increase movements, when you uncovered two cards , that is a movement
		movements++;
		showmMovements.innerHTML=`Movimientos: ${movements}`;		

		if(result1==result2){
		
			card1.classList.add("greencards");
			card2.classList.add("greencards");
 

			//we reset uncovered cards
			uncoveredcards=0;

			//increase hits
			hits++;
			showHits.innerHTML=`Aciertos: ${hits}`;

			//play righAudio
			rightAudio.play();

			if(hits==8){
				clearInterval(setIntervalTimer);//stop the timer if before finish it at 8 hits .
				showHits.innerHTML+=` 🥳`;
				showmMovements.innerHTML+=` 👀`;
				winAudio.play();
			}
		}else if (totalTime>0){
			//play wrongAudio
			wrongAudio.play();

			//show momentarily values  and to cover again
			setTimeout(()=>{
				card1.innerHTML='';
				card2.innerHTML='';				
				card1.disabled=false;
				card2.disabled=false;
				uncoveredcards=0;
			},800);
		}
	}

}