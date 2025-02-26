import React, { useState, useEffect } from 'react';

const BSODRebootEffect = () => {
  const [state, setState] = useState('normal');
  const [bootProgress, setBootProgress] = useState(0);
  const [commandLineText, setCommandLineText] = useState('');
  const [animationComplete, setAnimationComplete] = useState(false);
  const [characterPosition, setCharacterPosition] = useState(-140); // Start offscreen
  const [showMessage, setShowMessage] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  
  // Trigger BSOD when the component mounts
  useEffect(() => {
    // Function to simulate typing
    const typeCommandLine = (text: string, index = 0) => {
      if (index <= text.length) {
        setCommandLineText(text.substring(0, index));
        setTimeout(() => typeCommandLine(text, index + 1), 20);
      } else {
        // Start the character animation only after typing finishes
        setTimeout(() => {
          setShowCharacter(true);
          startCharacterAnimation();
        }, 500);
      }
    };
    
    // Character walking animation
    const startCharacterAnimation = () => {
      // Start from off-screen left
      setCharacterPosition(-140);
      
      // Walking animation
      const walkInterval = setInterval(() => {
        setCharacterPosition(prev => {
          // If character reached target position (about 1/3 of screen width)
          if (prev >= window.innerWidth / 3 - 70) {
            clearInterval(walkInterval);
            // Show the message after character stops
            setTimeout(() => {
              setShowMessage(true);
              // Animation is complete after message shows
              setTimeout(() => {
                setAnimationComplete(true);
              }, 500);
            }, 500);
            return window.innerWidth / 3 - 70;
          }
          // Keep walking
          return prev + 5;
        });
      }, 30);
    };
    
    // Timer for the BSOD sequence
    const sequence = async () => {
      // Reset states
      setAnimationComplete(false);
      setShowMessage(false);
      setShowCharacter(false);
      
      // Start normal
      setState('normal');
      
      // Wait 2 seconds then trigger BSOD
      await new Promise(r => setTimeout(r, 2000));
      setState('bsod');
      
      // Show BSOD for 3 seconds
      await new Promise(r => setTimeout(r, 3000));
      setState('black');
      
      // Black screen for 1 second
      await new Promise(r => setTimeout(r, 1000));
      setState('post');
      
      // POST screen for 2 seconds
      await new Promise(r => setTimeout(r, 2000));
      setState('bootloader');
      
      // Boot loader progress
      for (let i = 0; i <= 100; i += 5) {
        setBootProgress(i);
        await new Promise(r => setTimeout(r, 100));
      }
      
      // Command line interface - final state
      setState('commandline');
      typeCommandLine('Loading system files...\nChecking file system integrity...\nInitializing hardware devices...\nStarting system services...\nLoading user interface...\nSystem restart complete.');
    };
    
    sequence();
  }, []);
  
  // Content based on current state
  const renderContent = () => {
    switch(state) {
      case 'bsod':
        return (
          <div className="w-full h-screen bg-blue-600 text-white p-8 font-mono text-left">
            <h1 className="text-3xl mb-6">SYSTEM ERROR</h1>
            <p className="mb-4">A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
            <p className="mb-4">CRITICAL_PROCESS_DIED</p>
            <p className="mb-4">If this is the first time you've seen this error screen, restart your computer. If this screen appears again, follow these steps:</p>
            <p className="mb-8">Technical information:</p>
            <p>*** STOP: 0x000000EF (0x00000000, 0x00000000, 0x00000000, 0x00000000)</p>
            <p className="mt-12">Collecting error information...</p>
            <p>Physical memory dump complete.</p>
            <p>Beginning system restart...</p>
          </div>
        );
      
      case 'black':
        return <div className="w-full h-screen bg-black"></div>;
      
      case 'post':
        return (
          <div className="w-full h-screen bg-black text-white font-mono p-4 text-left">
            <p className="mb-2">BIOS Version 5.0</p>
            <p className="mb-2">CPU: AMD Ryzen 7 9800X3D @ 5.20GHz</p>
            <p className="mb-2">Memory: 65536MB</p>
            <p className="mb-2">Initializing hardware...</p>
            <p className="mb-2">POST completed</p>
            <p className="mb-2">Booting from primary drive...</p>
          </div>
        );
      
      case 'bootloader':
        return (
          <div className="w-full h-screen bg-black flex flex-col items-center justify-center font-mono text-white">
            <div className="w-64 bg-gray-700 h-6 rounded overflow-hidden mb-4">
              <div 
                className="h-full bg-blue-500 transition-all duration-100 ease-linear"
                style={{ width: `${bootProgress}%` }}
              ></div>
            </div>
            <p>Loading system... {bootProgress}%</p>
          </div>
        );
      
      case 'commandline':
        return (
          <div className="w-full h-screen bg-black p-4 font-mono text-green-500 overflow-hidden whitespace-pre-line relative text-left">
            {commandLineText}
            <span className="animate-pulse">_</span>
            
            {/* Character animation container */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Character and message container */}
              <div className="relative w-full h-full">
                {/* Character - only show after animation is complete */}
                {showCharacter && (
                  <div className="absolute bottom-16" style={{ left: `${characterPosition}px` }}>
                    <img src="/assets/dirtDiggler.gif" alt="Dirt Diggler" className="w-[140px] h-[140px]" />
                    
                    {/* Message bubble */}
                    {showMessage && (
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white text-black p-3 rounded-lg whitespace-nowrap animate-fade-in">
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
                        <p className="font-bold text-lg">come back march 8th at 6pm for a surprise. tell 'em diggler sent ya.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Watch Again button - only appears after animation completes */}
            {animationComplete && (
              <button 
                onClick={() => {
                  setState('normal');
                  setTimeout(() => {
                    const sequence = async () => {
                      // Reset animation complete state
                      setAnimationComplete(false);
                      setShowMessage(false);
                      setShowCharacter(false);
                      
                      // Start animation sequence
                      setState('bsod');
                      
                      // Show BSOD for 3 seconds
                      await new Promise(r => setTimeout(r, 2500));
                      setState('black');
                      
                      // Black screen for 1 second
                      await new Promise(r => setTimeout(r, 1000));
                      setState('post');
                      
                      // POST screen for 2 seconds
                      await new Promise(r => setTimeout(r, 3000));
                      setState('bootloader');
                      
                      // Boot loader progress
                      for (let i = 0; i <= 100; i += 5) {
                        setBootProgress(i);
                        await new Promise(r => setTimeout(r, 100));
                      }
                      
                      // Command line interface - final state
                      setState('commandline');
                      const text = 'Loading system files...\nChecking file system integrity...\nInitializing hardware devices...\nStarting system services...\nLoading user interface...\nSystem restart complete.';
                      let index = 0;
                      const typeText = () => {
                        if (index <= text.length) {
                          setCommandLineText(text.substring(0, index));
                          setTimeout(typeText, 20);
                          index++;
                        } else {
                          // Start character walking after typing finishes
                          setTimeout(() => {
                            setShowCharacter(true);
                            setCharacterPosition(-140);
                            const walkInterval = setInterval(() => {
                              setCharacterPosition(prev => {
                                if (prev >= window.innerWidth / 3 - 70) {
                                  clearInterval(walkInterval);
                                  setTimeout(() => {
                                    setShowMessage(true);
                                    setTimeout(() => {
                                      setAnimationComplete(true);
                                    }, 500);
                                  }, 500);
                                  return window.innerWidth / 3 - 70;
                                }
                                return prev + 5;
                              });
                            }, 30);
                          }, 500);
                        }
                      };
                      typeText();
                    };
                    sequence();
                  }, 500);
                }}
                className="absolute bottom-4 right-4 px-3 py-1 text-gray-400 hover:text-white bg-transparent border border-gray-700 rounded text-sm opacity-50 hover:opacity-100 transition"
              >
                watch again
              </button>
            )}
          </div>
        );
      
      default:
        return (
          <div className="w-full h-screen bg-gray-100 p-8 text-left">
            <h1 className="text-4xl font-bold mb-4">Normal Website Content</h1>
            <p className="mb-4">This area will be customized with your own content.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="fixed inset-0 z-50">
      {renderContent()}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BSODRebootEffect;
