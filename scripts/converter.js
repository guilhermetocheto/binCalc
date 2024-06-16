const btn = document.querySelector("#converte");
const screen = document.querySelector(".screen");
var resultScreen = document.querySelector(".result-screen");

function init() {
  btn.addEventListener("click", (event) => {
    event.preventDefault();

    if (!screen.value) {
      alert("Por favor insira um número");
      return;
    }

    let options = document.querySelector("#bases");

    let bases = options.value;

    var value = screen.value;

    switch (bases) {
      case "binary":
        resultScreen.value = decToBin(value);
        break;
      case "hexadecimal":
        resultScreen.value = decToHex(value);
        break;
      case "octal":
        resultScreen.value = decToOct(value);
        break;
    }
  });
}

init();

/*
FUNÇÕES
*/

// Função para inverter uma string
function reverseString(str) {
  // Corta a string em uma array
  var splitString = str.split("");
  // Inverte a array
  var reverseArray = splitString.reverse();
  // Une uma array em uma nova string
  var joinArray = reverseArray.join("");
  return joinArray;
}

/*
DECIMAL PARA BINÁRIO
*/

function decToBin(strDec) {
  //Muda o valor de strDec para um inteiro
  var intDec = parseInt(strDec);
  //Vai guardar o resultado de cada divisão
  var result = 0;
  //Vai guardar em uma string o resto de cada divisão
  var rest = "";
  //O resultado precisa acabar virando 1

  //Confere se o número é ímpar
  if (intDec % 2 === 1) {
    //Caso ímpar adiciona à string do resto o número 1
    rest += "1";
  } else {
    //Caso par adiciona à 0 string
    rest += "0";
  }

  while (result != 1) {
    //Calcula o resultado de intDec dividido por 2 arredondando para o menor número inteiro mais próximo
    intDec = Math.floor(intDec / 2);
    result = Math.floor(intDec / 2);
    //Vai adicionar o resultado de "intDec % 2" à string de resto
    rest += (intDec % 2).toString();
  }
  //Vai adicionar o result(que vai ser igual a 1) à string do resto
  rest += result.toString();

  //Vai retornar o inverso da string do resto
  return reverseString(rest);
}

/*
DECIMAL PARA HEXADECIMAL
*/

function decToHex(strDec) {
  //Muda o valor de strDec para um inteiro
  var intDec = parseInt(strDec);
  //Vai guardar o resultado de cada divisão
  var result = 0;
  //Vai guardar em uma string o resto de cada divisão
  var rest = "";

  rest += formatHex(intDec % 16);

  while (intDec >= 16) {
    console.log("IntDec está valendo: " + intDec);
    console.log("A operação que está sendo executado é: " + intDec + " / 16");
    intDec = Math.floor(intDec / 16);
    result = Math.floor(intDec / 16);

    rest += formatHex(intDec % 16);

    console.log("O valor de intDec agora é: " + intDec);
    console.log("O resultado desta operação é: " + result);
    console.log("O resto é: " + rest);
  }
  //rest += formatHex(result);

  return reverseString(rest);
}

function formatHex(value) {
  switch (value) {
    case 10:
      return "A";
      break;
    case 11:
      return "B";
      break;
    case 12:
      return "C";
      break;
    case 13:
      return "D";
      break;
    case 14:
      return "E";
      break;
    case 15:
      return "F";
      break;
    default:
      return value.toString();
      break;
  }
}

/*
DECIMAL PARA OCTAL
*/

function decToOct(strDec) {
  //Muda o valor de strDec para um inteiro
  var intDec = parseInt(strDec);
  //Vai guardar o resultado de cada divisão
  var result = 0;
  //Vai guardar em uma string o resto de cada divisão
  var rest = "";

  rest += intDec % 8;

  while (intDec >= 8) {
    intDec = Math.floor(intDec / 8);
    result = Math.floor(intDec / 8);

    rest += intDec % 8;
  }

  return reverseString(rest);
}
