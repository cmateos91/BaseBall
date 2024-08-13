document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const container = document.querySelector('.container');
    let posY = 0; // Posición vertical del balón
    let posX = container.clientWidth / 2 - ball.clientWidth / 2; // Posición horizontal del balón
    let speedY = -3; // Velocidad vertical del balón
    let speedX = -3; // Velocidad horizontal del balón
    let rotation = 0; // Rotación del balón
    let rotationSpeed = 5; // Velocidad de rotación inicial
    const gravity = 0.35; // Gravedad
    const friction = 0.98; // Fricción
    const groundFriction = 0.9; // Fricción en el suelo
    const bounceFactor = 0.7; // Factor de rebote (cuánto rebota)
    const floor = container.clientHeight - ball.clientHeight; // Posición del suelo
    const rightWall = container.clientWidth - ball.clientWidth; // Posición del borde derecho
    const leftWall = 0; // Posición del borde izquierdo
    let clickCount = 0;


    ball.classList.add('rotating');

    function animate() {
        // Aplicar gravedad
        speedY += gravity;
        posY += speedY;
        posX += speedX;

        // Aplicar fricción
        speedX *= friction;
        speedY *= friction;

        // Colisión con el suelo
        if (posY > floor) {
            posY = floor;
            speedY = -speedY * bounceFactor;
            rotationSpeed = -rotationSpeed * bounceFactor; // Invertir la rotación al chocar con el suelo

            // Aplicar fricción en el suelo
            speedX *= groundFriction;

            // Añadir inclinación al balón
            if (Math.abs(speedX) < 0.1) {
                rotationSpeed = 0; // Detener la rotación si la velocidad es muy baja
            }

            // Resetear el contador de clics
        clickCount = 0;
        document.getElementById('click-counter').innerText = `${clickCount}`;

        }

        // Colisión con el techo
        if (posY < 0) {
            posY = 0;
            speedY = -speedY * bounceFactor;
            rotationSpeed = -rotationSpeed * bounceFactor; // Invertir la rotación al chocar con el techo
        }

        // Colisión con las paredes
        if (posX > rightWall) {
            posX = rightWall;
            speedX = -speedX * bounceFactor;
            rotationSpeed = -rotationSpeed * bounceFactor; // Invertir la rotación al chocar con la pared derecha
        } else if (posX < leftWall) {
            posX = leftWall;
            speedX = -speedX * bounceFactor;
            rotationSpeed = -rotationSpeed * bounceFactor; // Invertir la rotación al chocar con la pared izquierda
        }

        // Aplicar nueva posición
        ball.style.top = posY + 'px';
        ball.style.left = posX + 'px';

        // Aplicar rotación
        rotation += rotationSpeed; // Ajusta este valor para cambiar la velocidad de rotación
        ball.style.transform = `rotate(${rotation}deg)`;

        requestAnimationFrame(animate);
    }

    ball.addEventListener('click', function() {
         // Incrementar el contador de clics
    clickCount++;
    document.getElementById('click-counter').innerText = `${clickCount}`;
        
        // Al hacer click, el balón recibe un impulso hacia arriba y hacia los lados
        speedY = -13; // Impulso hacia arriba
        speedX = (Math.random() - 0.5) * 7; // Impulso aleatorio hacia los lados
        rotationSpeed = (Math.random() - 0.5) * 20; // Impulso de rotación aleatorio
    });

    animate();
});
