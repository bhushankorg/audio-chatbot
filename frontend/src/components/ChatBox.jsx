import 'regenerator-runtime/runtime';
import React, { useEffect, useState, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeMute, FaVolumeUp, FaUser, FaRobot, FaMoon, FaSun, FaPlay, FaStop, FaPlus } from 'react-icons/fa';
import {
  ChakraProvider,
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Spinner,
  Heading,
  Divider,
  useBreakpointValue,
  Flex,
  useColorMode,
  useColorModeValue,
  IconButton,
  extendTheme,
  ColorModeScript,
  Switch,
  FormControl,
  FormLabel
} from '@chakra-ui/react';

// Configure theme for ultra-smooth dark mode transitions
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ 
  config,
  fonts: {
    heading: `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    body: `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  },
  styles: {
    global: {
      '*': {
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      'html, body': {
        transition: 'background-color 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fontFamily: `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      },
      // Smooth scrollbar transitions
      '::-webkit-scrollbar': {
        width: '8px',
        transition: 'all 0.8s ease',
      },
      '::-webkit-scrollbar-track': {
        background: 'var(--chakra-colors-gray-100)',
        transition: 'background 0.8s ease',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'var(--chakra-colors-gray-400)',
        borderRadius: '4px',
        transition: 'background 0.8s ease',
      },
    },
  },
});

const samplePrompts = [
  'What is Infosys Ltd?',
  "What's a fun fact to cheer me up?",
  'Tell me something interesting about black holes?',
  'Hey buddy, what should I eat for dinner tonight?',
  'Give me a light-hearted joke!',
  'What are the benefits of meditation?',
  'Tell me an interesting fact.',
];

// Enhanced Dark Mode Toggle with ultra-smooth animations
const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  
  return (
    <Box
      position="absolute"
      top={4}
      right={4}
      zIndex={1000}
      bg={useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)')}
      backdropFilter="blur(12px)"
      borderRadius="full"
      p={4}
      boxShadow={useColorModeValue(
        '0 10px 30px rgba(0, 0, 0, 0.1), 0 4px 15px rgba(0, 0, 0, 0.05)',
        '0 10px 30px rgba(0, 0, 0, 0.4), 0 4px 15px rgba(0, 0, 0, 0.2)'
      )}
      border="1px solid"
      borderColor={useColorModeValue('rgba(226, 232, 240, 0.8)', 'rgba(74, 85, 104, 0.8)')}
      transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      _hover={{
        transform: 'scale(1.08) translateY(-2px)',
        boxShadow: useColorModeValue(
          '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)',
          '0 20px 40px rgba(0, 0, 0, 0.5), 0 8px 20px rgba(0, 0, 0, 0.3)'
        ),
      }}
      cursor="pointer"
      onClick={toggleColorMode}
    >
      <HStack spacing={4} alignItems="center">
        {/* Animated Sun Icon */}
        <Box
          position="relative"
          transition="all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          transform={isDark ? 'rotate(180deg) scale(0.7)' : 'rotate(0deg) scale(1)'}
          opacity={isDark ? 0.3 : 1}
          filter={isDark ? 'blur(2px)' : 'blur(0px)'}
        >
          <FaSun 
            color={isDark ? '#9CA3AF' : '#F59E0B'} 
            size="20px"
          />
          {/* Animated glow effect */}
          {!isDark && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="35px"
              height="35px"
              borderRadius="full"
              bg="rgba(245, 158, 11, 0.2)"
              filter="blur(10px)"
              animation="sunGlow 3s ease-in-out infinite"
            />
          )}
        </Box>
        
        {/* Custom Animated Toggle */}
        <Box
          position="relative"
          width="56px"
          height="28px"
          bg={isDark ? 'blue.500' : 'gray.300'}
          borderRadius="full"
          transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          cursor="pointer"
          boxShadow="inset 0 2px 4px rgba(0, 0, 0, 0.1)"
          _hover={{
            bg: isDark ? 'blue.400' : 'gray.400',
            transform: 'scale(1.05)'
          }}
        >
          {/* Animated Toggle Circle */}
          <Box
            position="absolute"
            top="2px"
            left={isDark ? "30px" : "2px"}
            width="24px"
            height="24px"
            bg="white"
            borderRadius="full"
            transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
            transform={isDark ? 'rotate(360deg)' : 'rotate(0deg)'}
          />
          
          {/* Animated stars for dark mode */}
          {isDark && (
            <>
              <Box
                position="absolute"
                top="7px"
                left="10px"
                width="2px"
                height="2px"
                bg="white"
                borderRadius="full"
                opacity="0.9"
                animation="twinkle 2s infinite"
              />
              <Box
                position="absolute"
                top="15px"
                left="18px"
                width="1.5px"
                height="1.5px"
                bg="white"
                borderRadius="full"
                opacity="0.7"
                animation="twinkle 2.5s infinite 0.5s"
              />
              <Box
                position="absolute"
                top="10px"
                left="16px"
                width="1px"
                height="1px"
                bg="white"
                borderRadius="full"
                opacity="0.8"
                animation="twinkle 1.8s infinite 1s"
              />
            </>
          )}
        </Box>

        {/* Animated Moon Icon */}
        <Box
          position="relative"
          transition="all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          transform={isDark ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0.7)'}
          opacity={isDark ? 1 : 0.3}
          filter={isDark ? 'blur(0px)' : 'blur(2px)'}
        >
          <FaMoon 
            color={isDark ? '#60A5FA' : '#9CA3AF'} 
            size="18px"
          />
          {/* Animated moon glow */}
          {isDark && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="32px"
              height="32px"
              borderRadius="full"
              bg="rgba(96, 165, 250, 0.15)"
              filter="blur(8px)"
              animation="moonGlow 4s ease-in-out infinite alternate"
            />
          )}
        </Box>
      </HStack>
    </Box>
  );
};

// Push-to-Talk Button Component
const PushToTalkButton = ({ onStart, onStop, isListening }) => {
  const buttonBg = useColorModeValue('#1a202c', 'gray.200');
  const buttonColor = useColorModeValue('white', 'gray.800');

  return (
    <Button
      size="lg"
      bg={isListening ? 'red.500' : buttonBg}
      color={isListening ? 'white' : buttonColor}
      borderRadius="full"
      p={8}
      minW="120px"
      minH="120px"
      boxShadow={isListening 
        ? '0 0 30px rgba(239, 68, 68, 0.6), 0 8px 25px rgba(0,0,0,0.15)' 
        : useColorModeValue('0 8px 25px rgba(0,0,0,0.15)', '0 8px 25px rgba(0,0,0,0.4)')
      }
      transition="all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      transform={isListening ? 'scale(1.1)' : 'scale(1)'}
      _hover={{ 
        transform: isListening ? 'scale(1.15)' : 'scale(1.05)',
        boxShadow: isListening 
          ? '0 0 40px rgba(239, 68, 68, 0.8), 0 12px 35px rgba(0,0,0,0.2)' 
          : useColorModeValue('0 12px 35px rgba(0,0,0,0.2)', '0 12px 35px rgba(0,0,0,0.5)')
      }}
      _active={{ 
        transform: 'scale(0.95)' 
      }}
      onMouseDown={onStart}
      onMouseUp={onStop}
      onMouseLeave={onStop}
      onTouchStart={onStart}
      onTouchEnd={onStop}
      userSelect="none"
    >
      <VStack spacing={2}>
        {isListening ? (
          <>
            <Box
              animation="pulse 1.5s infinite"
            >
              <FaMicrophone size="32px" />
            </Box>
            <Text fontSize="sm" fontWeight="bold">
              Recording...
            </Text>
          </>
        ) : (
          <>
            <FaMicrophone size="32px" />
            <Text fontSize="sm" fontWeight="bold">
              Hold to Talk
            </Text>
          </>
        )}
      </VStack>
    </Button>
  );
};

// Toggle Switch for Continuous Mode
const ContinuousRecordingToggle = ({ isEnabled, onToggle }) => {
  return (
    <Box
      bg={useColorModeValue('rgba(255,255,255,0.9)', 'rgba(26,32,44,0.9)')}
      backdropFilter="blur(10px)"
      borderRadius="15px"
      p={4}
      border="1px solid"
      borderColor={useColorModeValue('rgba(226, 232, 240, 0.8)', 'rgba(74, 85, 104, 0.8)')}
      boxShadow={useColorModeValue(
        '0 8px 25px rgba(0,0,0,0.08)',
        '0 8px 25px rgba(0,0,0,0.3)'
      )}
      transition="all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    >
      <FormControl display="flex" alignItems="center" justifyContent="space-between">
        <VStack align="start" spacing={1}>
          <FormLabel 
            htmlFor="continuous-mode" 
            mb="0" 
            fontSize="sm" 
            fontWeight="bold"
            color={useColorModeValue('gray.700', 'gray.200')}
          >
            Continuous Mode
          </FormLabel>
          <Text 
            fontSize="xs" 
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            {isEnabled ? 'Click to start/stop' : 'Hold button to talk'}
          </Text>
        </VStack>
        <Switch
          id="continuous-mode"
          isChecked={isEnabled}
          onChange={(e) => onToggle(e.target.checked)}
          colorScheme="blue"
          size="lg"
        />
      </FormControl>
    </Box>
  );
};

const ChatBoxContent = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  
  // All state hooks first - maintain consistent order
  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]); 
  const [isMuted, setIsMuted] = useState(false);
  const [continuousMode, setContinuousMode] = useState(false);
  const [isManuallyListening, setIsManuallyListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typingResponse, setTypingResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState('');
  
  // Ref for auto-scroll - always after state hooks
  const chatContainerRef = useRef(null);
  
  // Dark mode hooks - always after refs
  const { colorMode, toggleColorMode } = useColorMode();
  
  // Color mode values - always after colorMode hook
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('gray.100', 'gray.700');
  const cardHoverBg = useColorModeValue('gray.200', 'gray.600');
  const chatBg = useColorModeValue('gray.100', 'gray.800');
  const userMsgBg = useColorModeValue('blue.100', 'blue.700');
  const botMsgBg = useColorModeValue('green.100', 'green.700');
  const inputBg = useColorModeValue('gray.200', 'gray.600');
  const buttonBg = useColorModeValue('#1a202c', 'gray.200');
  const buttonColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Responsive values - always after color mode values
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const cardFlex = useBreakpointValue({ base: 'none', md: '1' });
  const chatBoxFlex = useBreakpointValue({ base: 'none', md: '3' });

  // Generate unique session ID
  const generateSessionId = () => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  // Initialize session ID on component mount
  useEffect(() => {
    if (!sessionId) {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      console.log('Generated new session ID:', newSessionId);
      
      // Add initial welcome message
      setTimeout(() => {
        const welcomeMessage = {
          user: null,
          bot: "👋 Welcome to your AI Voice Assistant! I'm here to help you with questions, conversations, and more. You can speak to me using the microphone button, try the sample prompts on the left, or enable continuous mode for hands-free chatting. What would you like to talk about?"
        };
        setHistory([welcomeMessage]);
      }, 1000);
    }
  }, []);

  // Typewriter effect function
  const typeWriter = (text, callback) => {
    console.log('Typewriter effect starting...');
    setIsTyping(true);
    setTypingResponse('');
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setTypingResponse(prev => prev + text.charAt(i));
        i++;
        // Auto-scroll during typing
        scrollToBottom();
      } else {
        console.log('Typewriter effect completed');
        clearInterval(typingInterval);
        setIsTyping(false);
        if (callback) callback();
      }
    }, 30); // Typing speed: 30ms per character

    return () => clearInterval(typingInterval);
  };

  // Auto-scroll function
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const callCustomAPI = async (message) => {
    // Stop any ongoing speech and reset state
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    
    setThinking(true);
    setError('');
    setTypingResponse('');
    setIsTyping(false);
    
    // Add user message immediately and scroll
    const userMessage = { user: message, bot: null };
    setHistory((prevHistory) => [...prevHistory, userMessage]);
    
    // Auto-scroll after adding user message
    setTimeout(scrollToBottom, 100);

    try {
      const backendUrl = 'http://10.177.171.61:8000';
      const response = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          message: message,
          session_id: sessionId 
        })
      });

      const data = await response.json();
      const botReply = data.reply;
      console.log("Response received", data)

      setThinking(false);
      setAiText(botReply);

      // Start both typewriter effect and audio simultaneously
      const startBothEffects = () => {
        console.log('Starting both typewriter and audio effects simultaneously');
        
        // Start typewriter effect first
        typeWriter(botReply, () => {
          // After typing is complete, update the history with the full response
          setHistory((prevHistory) => {
            const newHistory = [...prevHistory];
            newHistory[newHistory.length - 1] = { user: message, bot: botReply };
            return newHistory;
          });

          // Clear typing response after completion
          setTypingResponse('');
        });

        // Start audio immediately (simultaneously with typewriter)
        if (!isMuted) {
          console.log('Starting audio playback simultaneously...');
          
          // Stop any ongoing speech first
          window.speechSynthesis.cancel();
          setIsSpeaking(true);
          
          const utterance = new SpeechSynthesisUtterance(botReply);
          utterance.rate = 1.1;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;
          
          // Add event listeners to track speaking state
          utterance.onstart = () => {
            console.log('Audio started playing');
            setIsSpeaking(true);
          };
          utterance.onend = () => {
            console.log('Audio finished playing');
            setIsSpeaking(false);
          };
          utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            setIsSpeaking(false);
          };
          
          // Speak immediately without voice setup complexity
          console.log('Actually speaking now...');
          window.speechSynthesis.speak(utterance);
        }
      };

      // Add a small delay before starting effects for more natural conversation flow
      setTimeout(() => {
        startBothEffects();
      }, 1000); // 800ms delay before AI starts responding

      return botReply;
    } catch (err) {
      setThinking(false);
      setError('Error contacting backend');
      console.error(err);
    }
  };

  // Push-to-talk handlers
  const startPushToTalk = () => {
    if (!continuousMode) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const stopPushToTalk = () => {
    if (!continuousMode) {
      SpeechRecognition.stopListening();
      // Process the transcript after a short delay
      setTimeout(() => {
        if (transcript && transcript.trim()) {
          const currentTranscript = transcript;
          resetTranscript(); // Clear transcript immediately to prevent double processing
          callCustomAPI(currentTranscript);
        }
      }, 500);
    }
  };

  // Continuous mode handlers
  const toggleContinuousListening = () => {
    if (continuousMode) {
      if (isManuallyListening) {
        SpeechRecognition.stopListening();
        setIsManuallyListening(false);
      } else {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
        setIsManuallyListening(true);
      }
    }
  };

  const handlePromptClick = (prompt) => {
    callCustomAPI(prompt);
  };

  const handleMuteToggle = () => {
    setIsMuted((prevState) => {
      if (!prevState) {
        // When muting, stop any current speech
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      // Don't automatically play when unmuting - only control future playback
      return !prevState;
    });
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleContinuousModeToggle = (enabled) => {
    setContinuousMode(enabled);
    if (!enabled && listening) {
      SpeechRecognition.stopListening();
      setIsManuallyListening(false);
    }
  };

  const clearSession = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setHistory([]);
    setTypingResponse('');
    setIsTyping(false);
    setError('');
    console.log('Started new session:', newSessionId);
    
    // Add welcome message after a brief delay
    setTimeout(() => {
      const welcomeMessage = {
        user: null,
        bot: "👋 Hello! I'm your AI voice assistant. You can speak to me using the microphone button below, click on the sample prompts, or switch to continuous mode for hands-free conversation. How can I help you today?"
      };
      setHistory([welcomeMessage]);
    }, 500);
  };

  // Handle continuous mode auto-processing
  useEffect(() => {
    let timeoutId;
    if (continuousMode && !listening && transcript) {
      timeoutId = setTimeout(() => {
        callCustomAPI(transcript).then((response) => {
          if (response) {
            resetTranscript(); 
          }
        });
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [transcript, listening, continuousMode]);

  // Auto-scroll when history updates
  useEffect(() => {
    scrollToBottom();
  }, [history]);

  // Auto-scroll when typing response updates
  useEffect(() => {
    if (isTyping) {
      scrollToBottom();
    }
  }, [typingResponse, isTyping]);

  // Auto-scroll when live transcript updates (while speaking)
  useEffect(() => {
    if (transcript && listening) {
      scrollToBottom();
    }
  }, [transcript, listening]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser doesn't support speech recognition.</p>;
  }

  return (
    <Flex 
      direction={flexDirection}
      height="100vh"
      p={4}
      gap={4}
      width={'100vw'}
      bg={bgColor}
      color={textColor}
      transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    >
      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      {/* Prompt Cards Section */}
      <Box
        flex={cardFlex}
        p={4}
        minW="30%"
        display="flex"
        flexDirection="column"
        gap={4}
        transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      >
        <Heading 
          as="h2" 
          size="lg" 
          mb={6} 
          textAlign="center"
          color={textColor}
          transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          fontWeight="600"
          letterSpacing="tight"
        >
          🎯 Get Started with These Ideas
        </Heading>
        {samplePrompts.map((prompt, index) => (
          <Box
            key={index}
            p={6}
            bg={cardBg}
            borderRadius="lg"
            boxShadow={useColorModeValue('md', 'dark-lg')}
            textAlign="center"
            _hover={{ 
              bg: cardHoverBg, 
              cursor: 'pointer',
              transform: 'translateY(-3px) scale(1.02)',
              boxShadow: useColorModeValue('lg', 'dark-lg')
            }}
            onClick={() => handlePromptClick(prompt)}
            transition="all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            border="1px solid"
            borderColor={borderColor}
          >
            <Text 
              as="h4" 
              size="md"
              color={textColor}
              transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              fontWeight="500"
              lineHeight="1.5"
            >
              {prompt}
            </Text>
          </Box>
        ))}
      </Box>
      
      {/* Chat Box Section */}
      <Box
        flex={chatBoxFlex}
        position="relative"
        p={6}
        bg={bgColor}
        minW="70%"
        transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      >
        <Box
          ref={chatContainerRef}
          height="70%" 
          overflowY="auto" 
          bg={chatBg} 
          borderRadius="lg" 
          p={4} 
          width="100%"
          transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          border="1px solid"
          borderColor={borderColor}
          boxShadow={useColorModeValue('md', 'dark-lg')}
          css={{
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: useColorModeValue('#f1f1f1', '#2d3748'),
            },
            '&::-webkit-scrollbar-thumb': {
              background: useColorModeValue('#c1c1c1', '#4a5568'),
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: useColorModeValue('#a8a8a8', '#5a6578'),
            },
          }}
        >
          <VStack spacing={4} align="stretch">
            <Heading 
              as="h3" 
              size="md" 
              textAlign="center"
              color={textColor}
              transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              mb={4}
              fontWeight="600"
              letterSpacing="tight"
            >
              🤖 AI Voice Assistant
            </Heading>
            
            {history.map((entry, index) => (
              <VStack key={index} spacing={2} align="stretch">
                {/* User Message */}
                {entry.user && (
                  <Box
                    alignSelf="flex-end"
                    p={4}
                    bg={userMsgBg}
                    borderRadius="lg"
                    boxShadow={useColorModeValue('sm', 'dark-lg')}
                    maxWidth="70%"
                    ml="auto"
                    display="flex"
                    alignItems="flex-start"
                    transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    _hover={{ transform: 'scale(1.02)' }}
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <FaUser style={{ marginRight: '8px', marginTop: '4px', flexShrink: 0 }} />
                    <Text 
                      color={useColorModeValue('blue.800', 'blue.100')}
                      transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                      whiteSpace="pre-wrap"
                      wordBreak="break-word"
                      fontWeight="500"
                      lineHeight="1.6"
                    >
                      <strong>You:</strong> {entry.user}
                    </Text>
                  </Box>
                )}
                
                {/* Bot Message */}
                {entry.bot && (
                  <Box
                    alignSelf="flex-start"
                    p={4}
                    bg={botMsgBg}
                    borderRadius="lg"
                    boxShadow={useColorModeValue('sm', 'dark-lg')}
                    maxWidth="70%"
                    mr="auto"
                    position="relative"
                    display="flex"
                    alignItems="flex-start"
                    transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    _hover={{ transform: 'scale(1.02)' }}
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <FaRobot style={{ marginRight: '8px', marginTop: '4px', flexShrink: 0 }} />
                    <Box flex="1">
                      <Text 
                        color={useColorModeValue('green.800', 'green.100')}
                        transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                        whiteSpace="pre-wrap"
                        wordBreak="break-word"
                        fontWeight="500"
                        lineHeight="1.6"
                      >
                        <strong>Bot:</strong> {entry.bot}
                      </Text>
                    </Box>
                  </Box>
                )}
              </VStack>
            ))}

            {/* Live Transcript While Speaking */}
            {transcript && listening && (
              <Box
                alignSelf="flex-end"
                p={4}
                bg={userMsgBg}
                borderRadius="lg"
                boxShadow={useColorModeValue('sm', 'dark-lg')}
                maxWidth="70%"
                ml="auto"
                display="flex"
                alignItems="flex-start"
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                border="1px solid"
                borderColor={borderColor}
                opacity="0.8"
              >
                <FaUser style={{ marginRight: '8px', marginTop: '4px', flexShrink: 0 }} />
                <Text 
                  color={useColorModeValue('blue.800', 'blue.100')}
                  transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  whiteSpace="pre-wrap"
                  wordBreak="break-word"
                >
                  <strong>You:</strong> {transcript}
                  {/* Speaking indicator */}
                  <Box
                    as="span"
                    display="inline-block"
                    width="2px"
                    height="20px"
                    bg="currentColor"
                    ml="2px"
                    animation="blink 1s infinite"
                    verticalAlign="text-bottom"
                  />
                </Text>
              </Box>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <Box
                alignSelf="flex-start"
                p={4}
                bg={botMsgBg}
                borderRadius="lg"
                boxShadow={useColorModeValue('sm', 'dark-lg')}
                maxWidth="70%"
                mr="auto"
                position="relative"
                display="flex"
                alignItems="flex-start"
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                border="1px solid"
                borderColor={borderColor}
                minHeight="60px"
              >
                <FaRobot style={{ marginRight: '8px', marginTop: '4px', flexShrink: 0 }} />
                <Box flex="1">
                  <Text 
                    color={useColorModeValue('green.800', 'green.100')}
                    transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                  >
                    <strong>Bot:</strong> {typingResponse}
                    {/* Typing cursor */}
                    <Box
                      as="span"
                      display="inline-block"
                      width="2px"
                      height="20px"
                      bg="currentColor"
                      ml="1px"
                      animation="blink 1s infinite"
                      verticalAlign="text-bottom"
                    />
                  </Text>
                </Box>
              </Box>
            )}

            {/* Thinking Indicator */}
            {thinking && !isTyping && (
              <Box
                alignSelf="flex-start"
                p={4}
                bg={botMsgBg}
                borderRadius="lg"
                boxShadow={useColorModeValue('sm', 'dark-lg')}
                maxWidth="70%"
                mr="auto"
                display="flex"
                alignItems="center"
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                border="1px solid"
                borderColor={borderColor}
              >
                <FaRobot style={{ marginRight: '8px' }} />
                <HStack>
                  <Spinner size="sm" color="green.500" />
                  <Text 
                    color={useColorModeValue('green.800', 'green.100')}
                    transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  >
                    <strong>Bot:</strong> Thinking...
                  </Text>
                </HStack>
              </Box>
            )}
          </VStack>
        </Box>
        
        <Divider 
          my={4} 
          borderColor={borderColor}
          transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        />

        <VStack spacing={4}>
          {/* Session Management */}
          <HStack spacing={4} width="100%" justify="space-between" align="center">
            <Button 
              onClick={clearSession}
              leftIcon={<FaPlus />}
              transition="all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              _hover={{ transform: 'scale(1.05)' }}
              borderRadius="lg"
              boxShadow={useColorModeValue('md', 'dark-lg')}
              variant="outline"
              colorScheme="purple"
              size="sm"
              fontWeight="600"
            >
              New Chat
            </Button>
            {sessionId && (
              <Box 
                px={3} 
                py={1} 
                bg={useColorModeValue('gray.100', 'gray.700')} 
                borderRadius="full"
                border="1px solid"
                borderColor={borderColor}
              >
                <Text fontSize="xs" color={useColorModeValue('gray.600', 'gray.300')} fontWeight="500">
                  Session: {sessionId.slice(-8)}
                </Text>
              </Box>
            )}
          </HStack>

          {/* Recording Mode Toggle */}
          <ContinuousRecordingToggle 
            isEnabled={continuousMode}
            onToggle={handleContinuousModeToggle}
          />

          {/* Recording Controls */}
          <VStack spacing={4}>
            {continuousMode ? (
              /* Continuous Mode - Click to Start/Stop */
              <Button
                size="lg"
                bg={listening ? 'red.500' : buttonBg}
                color={listening ? 'white' : buttonColor}
                borderRadius="full"
                p={6}
                minW="100px"
                boxShadow={listening 
                  ? '0 0 30px rgba(239, 68, 68, 0.6)' 
                  : useColorModeValue('0 8px 25px rgba(0,0,0,0.15)', '0 8px 25px rgba(0,0,0,0.4)')
                }
                transition="all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                _hover={{ 
                  transform: 'scale(1.05)',
                  boxShadow: listening 
                    ? '0 0 40px rgba(239, 68, 68, 0.8)' 
                    : useColorModeValue('0 12px 35px rgba(0,0,0,0.2)', '0 12px 35px rgba(0,0,0,0.5)')
                }}
                onClick={toggleContinuousListening}
                leftIcon={listening ? <FaStop /> : <FaPlay />}
              >
                {listening ? 'Stop Recording' : 'Start Recording'}
              </Button>
            ) : (
              /* Push-to-Talk Mode */
              <PushToTalkButton
                onStart={startPushToTalk}
                onStop={stopPushToTalk}
                isListening={listening}
              />
            )}

            {/* Mute Button */}
            <Button 
              onClick={handleMuteToggle} 
              leftIcon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              transition="all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              _hover={{ transform: 'scale(1.05)' }}
              borderRadius="lg"
              boxShadow={useColorModeValue('md', 'dark-lg')}
              variant={isMuted ? 'solid' : 'outline'}
              colorScheme={isMuted ? 'red' : 'blue'}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>

            {/* Stop Speaking Button */}
            {isSpeaking && (
              <Button 
                onClick={stopSpeaking}
                leftIcon={<FaStop />}
                transition="all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                _hover={{ transform: 'scale(1.05)' }}
                borderRadius="lg"
                boxShadow={useColorModeValue('md', 'dark-lg')}
                variant="solid"
                colorScheme="red"
                bg="red.500"
                color="white"
                animation="pulse 2s infinite"
                _active={{ transform: 'scale(0.95)' }}
              >
                Stop Speaking
              </Button>
            )}
          </VStack>

          {/* Status Messages */}
          {continuousMode ? (
            listening ? (
              <Text 
                textAlign={'center'} 
                color="green.500"
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                fontWeight="bold"
              >
                🎤 Recording... Click "Stop Recording" when done
              </Text>
            ) : (
              <Text 
                textAlign={'center'} 
                color="blue.500"
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              >
                Click "Start Recording" to begin
              </Text>
            )
          ) : (
            listening ? (
              <Text 
                textAlign={'center'} 
                color="green.500"
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                fontWeight="bold"
                animation="pulse 2s infinite"
              >
                🎤 Listening... Keep holding the button!
              </Text>
            ) : (
              <Text 
                textAlign={'center'} 
                color="blue.500"
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              >
                Hold the microphone button to speak
              </Text>
            )
          )}

          {thinking && (
            <HStack>
              <Spinner size="md" color="blue.500" />
              <Text 
                fontSize="lg"
                color={textColor}
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              >
                Connecting to AI...
              </Text>
            </HStack>
          )}

          {error && (
            <Text 
              fontSize="lg" 
              color="red.500"
              transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            >
              {error}
            </Text>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

const ChatBox = () => {
  // Add Google Fonts link
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <style jsx global>{`
        @keyframes sunGlow {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.1); }
        }
        
        @keyframes moonGlow {
          0% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0.25; transform: translate(-50%, -50%) scale(1.05); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
      <ChatBoxContent />
    </ChakraProvider>
  );
};

export default ChatBox;


