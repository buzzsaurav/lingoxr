import React, { useState, useRef } from 'react';
import './App.css';
import './components/DialogBox.css';
import wordsJson from './words.json';
import AudioControl from './components/AudioControl';
import NodeDialog from './components/NodeDialog';
import NameModal from './components/NameModal';
import CanvasScene from './components/CanvasScene';
import { Node, LineBetweenNodes } from './components/Objects';
import Sidebar from './components/Sidebar'; // Import the new Sidebar component
import { CakeRounded, FaceRounded, Man, MusicNoteOutlined, Person } from '@mui/icons-material';

const App = () => {
  const [activeNodes, setActiveNodes] = useState([{ ...wordsJson.nodes[0], position: [0, 0, 0], level: 0 }]);
  const [compoundListOpen, setCompoundListOpen] = useState(false);
  const [currentCompounds, setCurrentCompounds] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [name, setName] = useState('');
  const [isNameModalOpen, setIsNameModalOpen] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 4]);

  // Create playAudio and pauseAudio functions to be passed to components
  // const [playAudio, setPlayAudio] = useState(true);
  // const [pauseAudio, setPauseAudio] = useState(true);


  const audioRef = useRef(null);
  const audioAddRef = useRef(null);

  // Function to play the audio
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.2;
    }
  };

  // Function to play the audio
  const playAddAudio = () => {
    if (audioRef.current) {
      audioAddRef.current.play();
      // audioRef.current.volume = 0.2;
    }
  };

  // Function to pause the audio
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  
  const handleNodeClick = (node) => {
    setCurrentCompounds(node.compounds || []);
    setSelectedNode(node);
    setCompoundListOpen(true);
  };

  const handleCompoundSelect = (compound) => {
    if (!selectedNode) return;

    const siblingsAtLevel = activeNodes.filter(n => n.level === selectedNode.level + 1);
    const angle = (siblingsAtLevel.length) * (2 * Math.PI) / (selectedNode.compounds.length + 1);
    const radius = Math.pow(0.3, selectedNode.level * 1.3);
    const x = selectedNode.position[0] + radius * Math.cos(angle) + Math.random() * 0.1;
    const z = selectedNode.position[2] + radius * -Math.sin(angle) + Math.random() * 0.1;
    const y = selectedNode.position[1] + radius * -Math.sin(angle) * -0.5 + Math.random() * 0.1;

    var colors = ['red', 'green', 'blue', 'orange', 'yellow'];
    const newCompoundNode = {
      ...compound,
      position: [x, y, z],
      level: selectedNode.level + 1,
      parentPosition: selectedNode.position,
      color: colors[Math.floor(Math.random() * colors.length).toString(16)]
    };

    setActiveNodes((prevNodes) => [...prevNodes, newCompoundNode]);
    setCurrentCompounds([]);
    setCompoundListOpen(false);

    // handlePlaySound(compound.name)
    playAddAudio();
    
    // setCameraPosition([x, y, z]);
  };

  const handlePlaySound = (word) => {
    const utterance = new SpeechSynthesisUtterance(word); // Create a new utterance for the word
    utterance.lang = 'fi-FI'; // Set the language to Finnish
    utterance.volume = 1.0;
    utterance.rate = 0.6;
    // Optional: Choose a specific voice (if desired)
    const voices = window.speechSynthesis.getVoices();
    const finnishVoice = voices.filter(voice => voice.lang === 'fi-FI');
    console.log(finnishVoice)
    if (finnishVoice) {
        utterance.voice = finnishVoice[7]; // Set the voice to the Finnish voice
    }
    window.speechSynthesis.speak(utterance);
  };

  const createNodes = (nodeData) => {
    console.log(nodeData);
    return nodeData.map((node) => (
      <group key={node.name}>
        <Node name={node.name} position={node.position} level={node.level} onClick={() => handleNodeClick(node)} color={node.color} />
        {node.parentPosition && (
          <LineBetweenNodes start={node.parentPosition} end={node.position} />
        )}
        {!node.parentPosition && (
          <LineBetweenNodes start={[0, 0, 0]} end={node.position} />
        )}
      </group>
    ));
  };

  return (
    <>
      {isNameModalOpen && (
        // <NameModal 
        //   name={name} 
        //   setName={setName} 
        //   setIsNameModalOpen={setIsNameModalOpen} 
        //   playAudio={()=>setPlayAudio(true)} 
        //   pauseAudio={pauseAudio} 
        // />

        <div className="name-modal">
          <h2 className="header">LingoXR</h2>
          <button className="name-submit" style={{borderRadius:'100%', marginTop:'20px'}} onClick={playAudio}><MusicNoteOutlined/></button>
          <h2>Enter Your Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <br /><br />
          <button className="name-submit" onClick={() => {playAudio(); setIsNameModalOpen(false)}}>
            Submit
          </button>
          {/* <button className="name-submit" style={{ backgroundColor: 'red' }} onClick={pauseAudio}>
            Pause Audio
          </button> */}
        </div>
      )}
      
      <Sidebar nodes={activeNodes} handlePlaySound={handlePlaySound} /> {/* Add Sidebar */}

      <audio ref={audioRef} loop  src={`${process.env.PUBLIC_URL}/audio.mp3`} preload="auto" />
      <audio ref={audioAddRef}  src={`${process.env.PUBLIC_URL}/audio-add.mp3`} preload="auto" />

      {/* <AudioControl 
        src={`${process.env.PUBLIC_URL}/audio.mp3`} 
        onPlay={setPlayAudio} 
        onPause={setPauseAudio} 
      /> */}
      <CanvasScene activeNodes={activeNodes} createNodes={createNodes} cameraPosition={cameraPosition} />
      <NodeDialog
        compoundListOpen={compoundListOpen}
        selectedNode={selectedNode}
        currentCompounds={currentCompounds}
        activeNodes={activeNodes}
        handleCompoundSelect={handleCompoundSelect}
        handlePlaySound={handlePlaySound}
        setCompoundListOpen={setCompoundListOpen}
      />


      {name && <div style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', textAlign:'center' }}><div><FaceRounded/> </div><div>{name}</div></div>}
    </>
  );
};

export default App;
