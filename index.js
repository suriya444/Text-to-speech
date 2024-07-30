let voice = document.getElementById('voice');
let speak= document.getElementById('speak')
let script = document.getElementById('script')
let select = document.querySelector('select')
let currVoice = null; 

// ading event to button

speak.addEventListener('click',funSpeak)

function funSpeak(){
    
    if('speechSynthesis' in window){
     
    let utterance = new SpeechSynthesisUtterance(script.value);

    if(script.value===''){
     utterance = new SpeechSynthesisUtterance('Hello I am Suriya, Please Write Something to get Output');
    }

    if(currVoice){
        //console.log(currVoice)
        utterance.voice=currVoice;
    }

    window.speechSynthesis.speak(utterance);
    }else{
       alert("Sorry Your Browser Doesn't Support This Feature")
    }
}


// Fetch and populate the available voices
function showVoices() {
 const voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = voice.name;
    select.appendChild(option);
  });
 
  if(select.value){
    voice.append(select)
  }
}


select.addEventListener('change',(e)=>{
   //console.log(e.target.value)
   const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    currVoice = voices.filter((voice)=> voice.name==e.target.value)
    currVoice=currVoice[0]
})

// Trigger showVoices() when voices are loaded

speechSynthesis.addEventListener('voiceschanged', showVoices);

showVoices();