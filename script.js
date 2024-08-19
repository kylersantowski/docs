document.addEventListener('DOMContentLoaded', function () {
    const positionDisplay = document.getElementById('position');
    const centerToggle = document.getElementById('center-toggle');
    const crosshairToggle = document.getElementById('crosshair-toggle');
    const horizontalLine = document.querySelector('.cursor-line.horizontal');
    const verticalLine = document.querySelector('.cursor-line.vertical');
    const horizontalRuler = document.querySelector('.horizontal-ruler');
    const verticalRuler = document.querySelector('.vertical-ruler');
    const crosshairHorizontal = document.querySelector('.crosshair.horizontal');
    const crosshairVertical = document.querySelector('.crosshair.vertical');

    let centerZero = false;
    let crosshairsVisible = false;

    function updateCursorLines(x, y) {
        horizontalLine.style.left = `${x}px`;
        verticalLine.style.top = `${y}px`;

        if (centerZero) {
            const centerX = x - window.innerWidth / 2;
            const centerY = y - window.innerHeight / 2;
            const z = Math.sqrt(centerX * centerX + centerY * centerY).toFixed(2);
            positionDisplay.textContent = `X: ${centerX}, Y: ${centerY}, Z: ${z}`;
        } else {
            const z = Math.sqrt(x * x + y * y).toFixed(2);
            positionDisplay.textContent = `X: ${x}, Y: ${y}, Z: ${z}`;
        }
    }

    centerToggle.addEventListener('click', function() {
        centerZero = !centerZero;

        if (centerZero) {
            horizontalRuler.style.transform = `translateX(${window.innerWidth / 2}px)`;
            verticalRuler.style.transform = `translateY(${window.innerHeight / 2}px)`;
        } else {
            horizontalRuler.style.transform = `translateX(0)`;
            verticalRuler.style.transform = `translateY(0)`;
        }
    });

    crosshairToggle.addEventListener('click', function() {
        crosshairsVisible = !crosshairsVisible;

        if (crosshairsVisible) {
            crosshairHorizontal.style.display = 'block';
            crosshairVertical.style.display = 'block';
        } else {
            crosshairHorizontal.style.display = 'none';
            crosshairVertical.style.display = 'none';
        }
    });

    document.addEventListener('mousemove', function(event) {
        const x = event.clientX;
        const y = event.clientY;
        updateCursorLines(x, y);

        crosshairHorizontal.style.top = `${y}px`;
        crosshairVertical.style.left = `${x}px`;
    });

    crosshairHorizontal.style.display = 'none';
    crosshairVertical.style.display = 'none';
});
