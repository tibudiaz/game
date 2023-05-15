    import React, { useState, useEffect, useRef } from 'react';
    import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
    import Header from '../components/header';
    import { BASE_TIME, BUTTON_INTERVAL} from '../constants/Constants'

    const { width, height } = Dimensions.get('window');


    const GameScreen = () => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [baseTime, setBaseTime] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const buttonRef = useRef(null);
    const [buttonInterval, setButtonInterval] = useState(BUTTON_INTERVAL);

    useEffect(() => {
        if (timer > 0 && isPlaying) {
        const intervalId = setInterval(() => {
            setTimer(timer => timer - 1);
        }, 1000);
        return () => clearInterval(intervalId);
        } else {
        setIsGameOver(true);
        }
    }, [timer, isPlaying]);

    useEffect(() => {
        if (score > highScore) {
        setHighScore(score);
        }
        if (score >= 50 && score < 100) {
        setBaseTime(25);
        } else if (score >= 100 && score < 150) {
        setBaseTime(20);
        setButtonInterval(800);
        } else if (score >= 150 && score < 200) {
        setBaseTime(15);
        setButtonInterval(600);
        } else if (score >= 200) {
        setBaseTime(10);
        setButtonInterval(400);
        }
    }, [score, highScore, isPlaying]);

    const handlePress = () => {
        if (isPlaying && !isGameOver) {
        setScore(score => score + 1);
        if (score + 1 > highScore) {
            setHighScore(score + 1);
        }
        const buttonWidth = 100;
        const buttonHeight = 50;
        const maxButtonX = width - buttonWidth - 20;
        const newButtonX = Math.floor(Math.random() * maxButtonX);
        const minButtonY = Math.floor(height * 0.5) + buttonHeight + Math.floor(height * 0.1);
        const maxButtonY = height - buttonHeight - 40;
        const headerHeight = -100;
        const adjustedMinButtonY = minButtonY + headerHeight;
        const adjustedMaxButtonY = maxButtonY + headerHeight;

        const newButtonY = Math.floor(Math.random() * (adjustedMaxButtonY - adjustedMinButtonY)) + adjustedMinButtonY;

        if (buttonRef.current) {
            buttonRef.current.setNativeProps({
            style: { left: newButtonX, top: newButtonY },
            });
        }
        }
    };

    const handleStart = () => {
        setIsPlaying(true);
        setIsGameOver(false);
        setScore(0);
        setTimer(BASE_TIME);
        setButtonInterval(BUTTON_INTERVAL);
    };

    const handlePlayAgain = () => {
        setIsPlaying(true);
        setIsGameOver(false);
        setScore(0);
        setTimer(BASE_TIME);
        setButtonInterval(BUTTON_INTERVAL);
    };

    return (
        <React.Fragment>
        <Header />
        <View style={styles.container}>
            {!isPlaying ? (
            <>
                <View style={styles.card}>
                <Text style={styles.cardTitle}>¡Bienvenido al juego!</Text>
                <Text style={styles.cardText}>
                    El objetivo del juego es pulsar el botón la mayor cantidad de veces posible. El botón desaparecerá y reaparecerá aleatoriamente en la pantalla.
                </Text>
                <Text style={styles.cardText}>
                    Con cada pulsación, aumentarás tu puntaje. Además, el tiempo restante disminuirá. ¡Intenta conseguir la mayor puntuación!
                </Text>
                </View>
                <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                <Text style={styles.buttonText}>Iniciar Juego</Text>
                </TouchableOpacity>
            </>
            ) : (
            <>
                <Text style={styles.title}>Pulsa el botón!</Text>
                <Text style={styles.score}>Puntaje: {score}</Text>
                <Text style={styles.highScore}>Mejor Puntaje: {highScore}</Text>
                <Text style={styles.timer}>Tiempo restante: {timer}s</Text>
                {isPlaying && timer > 0 && (
                <TouchableOpacity
                    ref={buttonRef}
                    style={styles.button}
                    onPress={handlePress}
                    disabled={isGameOver}
                >
                    <Text style={styles.buttonText}>¡Pulsa!</Text>
                </TouchableOpacity>
                )}
            </>
            )}
            {isGameOver && isPlaying && (
            <TouchableOpacity
                style={styles.playAgainButton}
                onPress={handlePlayAgain}
            >
                <Text style={styles.buttonText}>¡Jugar de nuevo!</Text>
            </TouchableOpacity>
            )}
        </View>
        </React.Fragment>
    );
    
    };

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center',
        },
        startButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
        },
        buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        },
        card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        fontFamily: 'Roboto1',
        },
        cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        },
        cardText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: '#666666',
        },
        title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333333',
        },
        score: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
        },
        highScore: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
        },
        timer: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333333',
        },
        button: {
        position: 'absolute',
        backgroundColor: '#007AFF',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        },
        playAgainButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
        },
    });
    
    export default GameScreen;
