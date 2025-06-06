// Fetch data from backend API
async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/api/data');
        const data = await response.json();
        console.log('Data from database:', data);
        // Process and display data in your UI
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Fetch data when page loads
    fetchData();

    // Initialize matrix effect if canvas exists
    const matrixCanvas = document.getElementById('matrixCanvas');
    if (matrixCanvas) {
        const ctxMatrix = matrixCanvas.getContext('2d');

        function resizeCanvas() {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const hexChars = '0123456789ABCDEF';
        const fontSize = 18;
        const columns = matrixCanvas.width / fontSize;
        const drops = Array.from({ length: columns }).fill(1);

        function drawMatrixEffect() {
            ctxMatrix.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctxMatrix.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            ctxMatrix.fillStyle = '#FFC100';
            ctxMatrix.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const hexValue = hexChars[Math.floor(Math.random() * hexChars.length)];
                ctxMatrix.fillText(hexValue, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrixEffect, 33);
    }
});