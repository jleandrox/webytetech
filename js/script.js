// =========================
// MENU ATIVO CONFORME A SEÇÃO
// =========================

const menuLinks = [
    ...document.querySelectorAll('.menu a')
];

const sections = [
    ...document.querySelectorAll('main section')
];

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                menuLinks.forEach(link => {

                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') ===
                        '#' + entry.target.id
                    );

                });

            }

        });

    },
    {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0
    }
);

sections.forEach(section => {
    observer.observe(section);
});


// =========================
// ANIMAÇÃO DE ENTRADA
// =========================

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

                revealObserver.unobserve(
                    entry.target
                );

            }

        });

    },
    {
        threshold: 0.12
    }
);

document
    .querySelectorAll('.reveal')
    .forEach(element => {

        revealObserver.observe(element);

    });


// =========================
// FUNDO TECNOLÓGICO
// =========================

const codeBackground =
    document.querySelector('.code-bg');


if (codeBackground) {

    const snippets = [

        'public class Application {',

        '@RestController',

        'GET /api/projetos',

        'SpringApplication.run(...)',

        'private final Service service;',

        'return ResponseEntity.ok(...);',

        'SELECT * FROM projetos;',

        'new ArrayList<>();',

        'if (backendReady) { ... }',

        'POST /api/contato',

        'System.out.println("Hello World");',

        'repository.findAll();'

    ];


    const positions = [

        [5, 18, 0, '16s'],

        [18, 38, 1, '20s'],

        [69, 22, 2, '17s'],

        [79, 48, 3, '22s'],

        [7, 72, 4, '19s'],

        [74, 74, 5, '18s'],

        [28, 12, 6, '21s'],

        [42, 82, 7, '23s'],

        [86, 17, 8, '20s'],

        [55, 60, 9, '18s'],

        [13, 54, 10, '24s'],

        [63, 88, 11, '19s']

    ];


    positions.forEach(
        ([left, top, index, duration], i) => {

            const item =
                document.createElement('span');


            item.className =
                'code-snippet';


            if (i % 4 === 0) {

                item.classList.add(
                    'accent'
                );

            }


            item.textContent =
                snippets[index];


            item.style.left =
                `${left}%`;


            item.style.top =
                `${top}%`;


            item.style.setProperty(
                '--duration',
                duration
            );


            item.style.setProperty(
                '--drift',
                `${10 + (i % 4) * 7}px`
            );


            item.style.animationDelay =
                `${-(i * 1.8)}s`;


            codeBackground.appendChild(
                item
            );

        }
    );

}

// =========================
// EFEITO DE DIGITAÇÃO
// =========================

const typingText = document.querySelector("#typing-text");

if (typingText) {

    const texts = [
        "Desenvolvedor Backend",
        "Formando Análise e Desenvolvimento de Sistemas",
        "Estudante de Tecnologia"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentText = texts[textIndex];

        if (!deleting) {

            typingText.textContent =
                currentText.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentText.length) {

                deleting = true;

                setTimeout(typeEffect, 1800);

                return;
            }

        } else {

            typingText.textContent =
                currentText.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                textIndex =
                    (textIndex + 1) % texts.length;
            }
        }

        const speed = deleting ? 45 : 85;

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}

/* =========================
   BRILHO DO MOUSE
========================= */

const mouseGlow = document.querySelector(".mouse-glow");

if (mouseGlow) {
    document.addEventListener("mousemove", (event) => {
        mouseGlow.style.left = `${event.clientX}px`;
        mouseGlow.style.top = `${event.clientY}px`;
    });
}

/* =========================
   FUNDO - CIRCUITOS SUTIS
========================= */

const canvas = document.querySelector("#tech-background");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;

    const circuits = [];
    const pulses = [];

    const isMobile = window.innerWidth <= 720;

    const circuitCount = isMobile ? 18 : 32;
    const pulseCount = isMobile ? 8 : 14;

    function resizeCanvas() {

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createCircuit() {

        const side = Math.floor(Math.random() * 4);

        let x;
        let y;

        if (side === 0) {
            x = Math.random() * width;
            y = -20;
        } else if (side === 1) {
            x = width + 20;
            y = Math.random() * height;
        } else if (side === 2) {
            x = Math.random() * width;
            y = height + 20;
        } else {
            x = -20;
            y = Math.random() * height;
        }

        const points = [
            { x, y }
        ];

        const targetX = width / 2 + (Math.random() - 0.5) * width * 0.55;
        const targetY = height / 2 + (Math.random() - 0.5) * height * 0.55;

        let currentX = x;
        let currentY = y;

        const steps = 3 + Math.floor(Math.random() * 3);

        for (let i = 0; i < steps; i++) {

            const progress = (i + 1) / steps;

            const nextX =
                currentX +
                (targetX - currentX) * progress;

            const nextY =
                currentY +
                (targetY - currentY) * progress;

            if (Math.random() > 0.5) {

                points.push({
                    x: nextX,
                    y: currentY
                });

                points.push({
                    x: nextX,
                    y: nextY
                });

            } else {

                points.push({
                    x: currentX,
                    y: nextY
                });

                points.push({
                    x: nextX,
                    y: nextY
                });
            }

            currentX = nextX;
            currentY = nextY;
        }

        return {
            points,
            alpha: Math.random() * 0.13 + 0.04
        };
    }

    function createCircuits() {

        circuits.length = 0;

        for (let i = 0; i < circuitCount; i++) {
            circuits.push(createCircuit());
        }
    }

    function createPulse() {

        const circuit =
            circuits[
                Math.floor(Math.random() * circuits.length)
            ];

        const segment =
            Math.floor(
                Math.random() * (circuit.points.length - 1)
            );

        return {
            circuit,
            segment,
            progress: Math.random(),
            speed: Math.random() * 0.004 + 0.002
        };
    }

    function createPulses() {

        pulses.length = 0;

        for (let i = 0; i < pulseCount; i++) {
            pulses.push(createPulse());
        }
    }

    function drawCircuit(circuit) {

        const points = circuit.points;

        if (points.length < 2) {
            return;
        }

        ctx.beginPath();

        ctx.moveTo(
            points[0].x,
            points[0].y
        );

        for (let i = 1; i < points.length; i++) {

            ctx.lineTo(
                points[i].x,
                points[i].y
            );
        }

        ctx.strokeStyle =
            `rgba(0, 157, 255, ${circuit.alpha})`;

        ctx.lineWidth = .8;

        ctx.stroke();

        /* nós dos circuitos */

        points.forEach((point, index) => {

            if (
                index !== 0 &&
                index !== points.length - 1
            ) {

                ctx.beginPath();

                ctx.arc(
                    point.x,
                    point.y,
                    1.3,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(0, 157, 255, ${circuit.alpha + .08})`;

                ctx.fill();
            }
        });
    }

    function updatePulse(pulse) {

        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {

            pulse.progress = 0;

            pulse.segment++;

            if (
                pulse.segment >=
                pulse.circuit.points.length - 1
            ) {

                const newPulse = createPulse();

                pulse.circuit = newPulse.circuit;
                pulse.segment = newPulse.segment;
                pulse.progress = newPulse.progress;
                pulse.speed = newPulse.speed;
            }
        }
    }

    function drawPulse(pulse) {

        const start =
            pulse.circuit.points[pulse.segment];

        const end =
            pulse.circuit.points[pulse.segment + 1];

        if (!start || !end) {
            return;
        }

        const x =
            start.x +
            (end.x - start.x) *
            pulse.progress;

        const y =
            start.y +
            (end.y - start.y) *
            pulse.progress;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            2.2,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(0, 170, 255, .9)";

        ctx.shadowBlur = 12;
        ctx.shadowColor =
            "rgba(0, 157, 255, .9)";

        ctx.fill();

        ctx.shadowBlur = 0;
    }

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        circuits.forEach(drawCircuit);

        pulses.forEach(updatePulse);
        pulses.forEach(drawPulse);

        requestAnimationFrame(animate);
    }

    window.addEventListener(
        "resize",
        () => {
            resizeCanvas();
            createCircuits();
            createPulses();
        }
    );

    resizeCanvas();
    createCircuits();
    createPulses();
    animate();
}