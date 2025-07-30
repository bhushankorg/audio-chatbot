import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeMute, FaVolumeUp, FaUser, FaRobot, FaMoon, FaSun, FaPlay, FaStop } from 'react-icons/fa';
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
  styles: {
    global: {
      '*': {
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      'html, body': {
        transition: 'background-color 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]); 
  const [isMuted, setIsMuted] = useState(false);
  const [continuousMode, setContinuousMode] = useState(false);
  const [isManuallyListening, setIsManuallyListening] = useState(false);
  
  // Dark mode hooks
  const { colorMode, toggleColorMode } = useColorMode();
  
  // Ultra-smooth color transitions
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

  const callCustomAPI = async (message) => {
    setThinking(true);
    setError('');
    try {
      const response = await fetch("http://10.177.171.61:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      const botReply = data.reply;
      console.log("Response received", data)

      setThinking(false);
      setAiText(botReply);

      const newHistory = { user: message, bot: botReply };
      setHistory((prevHistory) => [...prevHistory, newHistory]);

      if (!isMuted) {
        const utterance = new SpeechSynthesisUtterance(botReply);
        const voices = window.speechSynthesis.getVoices();
        utterance.rate = 1.3;
        window.speechSynthesis.speak(utterance);
      }

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
      SpeechRecognition.startListening({ continuous: false });
    }
  };

  const stopPushToTalk = () => {
    if (!continuousMode) {
      SpeechRecognition.stopListening();
      // Process the transcript after a short delay
      setTimeout(() => {
        if (transcript && transcript.trim()) {
          callCustomAPI(transcript);
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
        window.speechSynthesis.cancel();
      } else {
        if (aiText) {
          const utterance = new SpeechSynthesisUtterance(aiText);
          window.speechSynthesis.speak(utterance);
        }
      }
      return !prevState;
    });
  };

  const handleContinuousModeToggle = (enabled) => {
    setContinuousMode(enabled);
    if (!enabled && listening) {
      SpeechRecognition.stopListening();
      setIsManuallyListening(false);
    }
  };
  
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const cardFlex = useBreakpointValue({ base: 'none', md: '1' });
  const chatBoxFlex = useBreakpointValue({ base: 'none', md: '3' });

  // Handle continuous mode auto-processing
  useEffect(() => {
    let timeoutId;
    if (continuousMode && !listening && transcript) {
      timeoutId = setTimeout(() => {
        callCustomAPI(transcript).then((response) => {
          if (response) {
            setAiText(response);
            resetTranscript(); 
          }
        });
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [transcript, listening, continuousMode]);

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
        >
          Select a Custom Prompt
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
        <VStack 
          spacing={4} 
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
        >
          <Heading 
            as="h3" 
            size="md" 
            textAlign="center"
            color={textColor}
            transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          >
            Conversation History
          </Heading>
          {history.map((entry, index) => (
            <React.Fragment key={index}>
              {/* User Message */}
              <Box
                alignSelf="flex-end"
                p={4}
                bg={userMsgBg}
                borderRadius="lg"
                boxShadow={useColorModeValue('sm', 'dark-lg')}
                maxWidth="60%"
                display="flex"
                alignItems="center"
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                _hover={{ transform: 'scale(1.02)' }}
                border="1px solid"
                borderColor={borderColor}
              >
                <FaUser style={{ marginRight: '8px' }} />
                <Text 
                  color={useColorModeValue('blue.800', 'blue.100')}
                  transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                >
                  <strong>You:</strong> {entry.user}
                </Text>
              </Box>
              
              {/* Bot Message */}
              <Box
                alignSelf="flex-start"
                p={4}
                bg={botMsgBg}
                borderRadius="lg"
                boxShadow={useColorModeValue('sm', 'dark-lg')}
                maxWidth="60%"
                mt={2}
                position="relative"
                display="flex"
                alignItems="center"
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                _hover={{ transform: 'scale(1.02)' }}
                border="1px solid"
                borderColor={borderColor}
              >
                <FaRobot style={{ marginRight: '8px' }} />
                <Text 
                  color={useColorModeValue('green.800', 'green.100')}
                  transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                >
                  <strong>Bot:</strong> {entry.bot}
                </Text>

                <Button
                  onClick={() => {
                    if (!isMuted) {
                      window.speechSynthesis.cancel();
                    } else {
                      const utterance = new SpeechSynthesisUtterance(entry.bot);
                      window.speechSynthesis.speak(utterance);
                    }
                    setIsMuted(!isMuted);
                  }}
                  variant="ghost"
                  transition="all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  _hover={{ transform: 'scale(1.1)' }}
                >
                  {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </Button>
              </Box>
            </React.Fragment>
          ))}
        </VStack>
        
        <Divider 
          my={4} 
          borderColor={borderColor}
          transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        />

        <VStack spacing={4}>
          {transcript && (
            <Box 
              p={4} 
              bg={inputBg} 
              borderRadius="lg" 
              width="100%"
              transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              _hover={{ transform: 'translateY(-2px)' }}
              border="1px solid"
              borderColor={borderColor}
              boxShadow={useColorModeValue('sm', 'dark-lg')}
            >
              <Text 
                color={textColor}
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              >
                <strong>Your question:</strong> {transcript}
              </Text>
            </Box>
          )}

          {aiText && (
            <Box 
              p={4} 
              bg={inputBg} 
              borderRadius="lg" 
              width="100%"
              transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              _hover={{ transform: 'translateY(-2px)' }}
              border="1px solid"
              borderColor={borderColor}
              boxShadow={useColorModeValue('sm', 'dark-lg')}
            >
              <Text 
                color={textColor}
                transition="all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              >
                <strong>AI Response:</strong> {aiText}
              </Text>
            </Box>
          )}

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
                Thinking...
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
      `}</style>
      <ChatBoxContent />
    </ChakraProvider>
  );
};

export default ChatBox;


