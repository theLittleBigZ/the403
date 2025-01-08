// scroll.js

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let currentIndex = 0;
    let isScrolling = false;

    const scrollToSection = (index) => {
        sections[index].scrollIntoView({
            behavior: 'smooth'
        });
        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    };

    const handleScroll = (event) => {
        if (isScrolling) return; // Prevent scrolling during delay

        const delta = Math.sign(event.deltaY);

        if (delta > 0 && currentIndex < sections.length - 1) {
            currentIndex++;
        } else if (delta < 0 && currentIndex > 0) {
            currentIndex--;
        }

        scrollToSection(currentIndex);
    };

    // Resize handling to adjust snapping positions
    const handleResize = () => {
        scrollToSection(currentIndex);
    };

    // Event listeners
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('resize', handleResize);

    // Initial scroll position
    scrollToSection(currentIndex);
});
