document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const container = document.querySelector('.container');
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button'); // Botón de pausa/continuar

    let posY = 0; // Posición vertical del balón
    let posX = container.clientWidth / 2 - ball.clientWidth / 2; // Posición horizontal del balón
    // Establecer la posición inicial del balón
    ball.style.top = posY + 'px';
    ball.style.left = posX + 'px';
    let speedY = -3;
    let speedX = -3;
    let rotation = 0;
    let rotationSpeed = 5;
    const gravity = 0.35;
    const friction = 0.98;
    const groundFriction = 0.9;
    const bounceFactor = 0.7;
    const floor = container.clientHeight - ball.clientHeight;
    const rightWall = container.clientWidth - ball.clientWidth;
    const leftWall = 0;
    const minBounceSpeed = 1;
    let clickCount = 0;
    let isOnGround = false;
    let isPaused = false; // Estado de pausa

    ball.classList.add('rotating');

    const bounceSounds = [];
    for (let i = 0; i < 5; i++) {
        bounceSounds.push(new Audio('rebote2.mp3'));
    }
    let bounceSoundIndex = 0;

    function playBounceSound() {
        bounceSounds[bounceSoundIndex].currentTime = 0;
        bounceSounds[bounceSoundIndex].play().catch(error => console.log('Error al reproducir sonido:', error));
        bounceSoundIndex = (bounceSoundIndex + 1) % bounceSounds.length;
    }

    function animate() {
        if (isPaused) return; // Si está pausado, no se actualiza

        speedY += gravity;
        posY += speedY;
        posX += speedX;

        speedX *= friction;
        speedY *= friction;

        if (posY > floor) {
            posY = floor;
            if (Math.abs(speedY) > minBounceSpeed) {
                speedY = -speedY * bounceFactor;
                rotationSpeed = -rotationSpeed * bounceFactor;
                playBounceSound();
                speedX *= groundFriction;
                if (Math.abs(speedX) < 0.1) {
                    rotationSpeed = 0;
                }
            } else {
                speedY = 0;
                rotationSpeed = 0;
                isOnGround = true;
            }
            clickCount = 0;
            document.getElementById('click-counter').innerText = `${clickCount}`;
        } else {
            isOnGround = false;
        }

        if (posY < 0) {
            posY = 0;
            speedY = -speedY * bounceFactor;
            rotationSpeed = -rotationSpeed * bounceFactor;
            playBounceSound();
        }

        if (posX > rightWall) {
            posX = rightWall;
            speedX = -speedX * bounceFactor;
            rotationSpeed = -rotationSpeed * bounceFactor;
            playBounceSound();
        } else if (posX < leftWall) {
            posX = leftWall;
            speedX = -speedX * bounceFactor;
            rotationSpeed = -rotationSpeed * bounceFactor;
            playBounceSound();
        }

        ball.style.top = posY + 'px';
        ball.style.left = posX + 'px';

        rotation += rotationSpeed;
        ball.style.transform = `rotate(${rotation}deg)`;

        requestAnimationFrame(animate);
    }

    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        animate();
    });

    ball.addEventListener('click', function() {
        if (isPaused) return; // No incrementar el contador si el juego está en pausa

        clickCount++;
        document.getElementById('click-counter').innerText = `${clickCount}`;
        speedY = -13;
        speedX = (Math.random() - 0.5) * 7;
        rotationSpeed = (Math.random() - 0.5) * 20;
        isOnGround = false;
    });

    pauseButton.addEventListener('click', function() {
        isPaused = !isPaused; // Alterna entre pausado y no pausado
        if (isPaused) {
            pauseButton.classList.add('paused'); // Cambia el ícono a reproducción
            ball.classList.add('paused'); // Desactiva eventos del puntero en la pelota
        } else {
            pauseButton.classList.remove('paused'); // Cambia el ícono a pausa
            ball.classList.remove('paused'); // Activa eventos del puntero en la pelota
            requestAnimationFrame(animate); // Reanuda la animación si se despausa
        }
    });
    
    
});
