"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

//Lancement du jeu, création du nombre secret et du nombre maximum de tentatives
function launchGame(_evt) {
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;
  nbGuesses = 0;

  $output.textContent = "Le jeu est lancé ! Trouvez un nombre entre 1 et " + $maxUsr.value + ".";
  $guessBtn.disabled = false; //Activation du bouton de vérification
}
//Vérification de la saisie de l'utilisateur
function verifyGuess() {
    if (!$numUsr.value.trim()) return;
    const userInput = Number($numUsr.value);
    nbGuesses++;
  //Vérifier si la saisie est trop élevée, trop basse ou correcte
    if (userInput > secretNumber) {
      $output.innerHTML = "Trop élevé ! Vous avez encore " + maxGuesses - nbGuesses + "tentatives.";
    } else if (userInput < secretNumber) {
      $output.innerHTML = "Trop bas ! Vous avez encore " + maxGuesses - nbGuesses + "tentatives.";
    } else {
      $output.innerHTML = "Bien joué ! Vous avez deviné le nombre " + secretNumber + " après " + nbGuesses + " tentatives.";
      endGame(); //Fin du jeu si le nombre est trouvé
    }

//Fin du jeu si le nombre maximal de tentatives est atteint
  if (nbGuesses >= maxGuesses) {
      $output.innerHTML += " Nombre maximal d'essais atteint. Le bon nombre était : " + secretNumber + ".";
      endGame();
    }
  }

//Désactivation du bouton de vérification à la fin du jeu
  function endGame() {
    $guessBtn.disabled = true;
  }
  
//Ajout des événements de clic et de saisie (entré)
  $startBtn.addEventListener("click", launchGame);
  $guessBtn.addEventListener("click", verifyGuess);
  $numUsr.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      verifyGuess();
    }
  });

//Exercice 2: La vache qui tache

//Création de l'image de la vache avec ses attributs
function addCow(evt) {
  console.debug(evt.x, evt.y);
  const imgCow = document.createElement("img");
  imgCow.src = "Cowicon.svg";
  imgCow.classList.add("cow");

  //création des styles de la vache
  imgCow.style.height = "100px";
  imgCow.style.width = "100px";
  imgCow.style.position = "absolute";
  imgCow.style.pointerEvents = "none";
  imgCow.style.transform = `rotate(${Math.random() * 360}deg)`; //rotation aléatoire

  //positionner de l'image de la vache en fonction du clic
  imgCow.style.left = `${evt.pageX}px`;
  imgCow.style.top = `${evt.pageY}px`;

  document.body.appendChild(imgCow);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);
