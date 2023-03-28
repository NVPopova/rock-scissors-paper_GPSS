const choices = ['r', 's', 'p'];
let computerChoice;
let userChoice;
const contractAddress="0x8Bd001f5204aAf879e911a78a79bE9C0929c57a0"

const provider=new ethers.providers.Web3Provider(window.ethereum, 97); //bnbchain testnet
let signer;
let contract;

//Запрашиваем аккаунты пользователя и подключаемся к первому аккаунту
provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      //Создаем объект контракта
      contract = new ethers.Contract(contractAddress, abi, signer);
     
    });
  });

  const abi=[
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_option",
				"type": "uint8"
			}
		],
		"name": "roShambo",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "value",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let userScore=0;
let computerScore=0;

const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');
const history_p=document.querySelector('.history > p')
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

//function getComputerChoice() {
   // const choices = ['r', 's', 'p'];
  //  const randomNumber = Math.floor(Math.random() *3);
  //  return choices[randomNumber];
//}

function convertToWord(letter) {
    if(letter === 'r') return "Rock";
    if(letter === 'p') return "Paper";
    return "Scissors";
    
}

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;  
    console.log('user choice  in win =>' + userChoice);
    console.log('computer choice in win  =>' + computerChoice);
    result_p.innerHTML = `${convertToWord(userChoice)} (user) beats ${convertToWord(computerChoice)}(comp). You win!`;
    history_p.innerHTML+='<br/>'+`\n${convertToWord(userChoice)} (user) beats ${convertToWord(computerChoice)}(comp). You win!`;
}


function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;  
    console.log('user choice  in lose =>' + userChoice);
    console.log('computer choice in lose  =>' + computerChoice);
    result_p.innerHTML = `${convertToWord(userChoice)} (user) loses to ${convertToWord(computerChoice)}(comp). You lost...`;
    history_p.innerHTML+='<br/>'+`\n${convertToWord(userChoice)} (user) loses to ${convertToWord(computerChoice)}(comp). You lost...`;
}

function draw(userChoice, computerChoice) { 
    console.log('user choice  in draw =>' + userChoice);
    console.log('computer choice in draw  =>' + computerChoice);
    result_p.innerHTML = `${convertToWord(userChoice)} (user) equals ${convertToWord(computerChoice)}(comp). It's a draw`;
    history_p.innerHTML+='<br/>'+`\n${convertToWord(userChoice)} (user) equals ${convertToWord(computerChoice)}(comp). It's a draw`;
   
}

async function game(userChoice){
             console.log('user choice =>' + userChoice);
    
if (userChoice==='r') 
    {
        await contract.roShambo(0);
            }
else if (userChoice==='s')
    { 
        await contract.roShambo(1);
    }
else 
    { 
        await contract.roShambo(2);
    }
    let b=await contract.get();
    console.log('computer choice =>' + b);
    computerChoice=choices[b];
console.log('computer choice =>' + computerChoice);


                // "ножницы" бьют (разрезают) "бумагу"
                 // "бумага" бьет (накрывает) "камень"
                 // "камень" бьет (ломает) "ножницы"
    switch (userChoice + computerChoice){
        case 'rs':
        case 'pr':
        case 'sp':
            win(userChoice, computerChoice);
            break;
        case 'rp':
        case 'ps':
        case 'sr':
            lose(userChoice, computerChoice);
            break;
        case 'rr':
        case 'pp':
        case 'ss':
            draw(userChoice, computerChoice);
            break;
        
    }

}


function main() {
    rock_div.addEventListener('click', function(){
       game('r');
    })

    paper_div.addEventListener('click', function(){
        game('p');
   })

   scissors_div.addEventListener('click', function(){
        game('s');
    })
}

main();