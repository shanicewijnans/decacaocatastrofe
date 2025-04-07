let scene = sessionStorage.getItem('scene');
if (scene === null) {
    scene = 0;
    sessionStorage.setItem('scene', scene);
} else {
    scene = parseInt(scene, 11);
}



updateScene();

document.addEventListener('DOMContentLoaded', function() {
    const fullscreenButton = document.getElementById('fullscreenButton');

    fullscreenButton.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    const modals = document.querySelectorAll('dialog');
    modals.forEach(modal => {
        modal.addEventListener('open', disableScroll);
        modal.addEventListener('close', enableScroll);
    });
});

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
}

function preventScroll(event) {
    event.preventDefault();
    event.stopPropagation();
}

function updateScene() {
    const scenes = document.querySelectorAll('.intro-1, .intro-2, .intro-3, .boot-heen, .ivoorkust, .boot-terug, .outro-1, .outro-2, .outro-3, .outro-4, .outro-5');
    scenes.forEach(div => div.style.display = 'none');

    if (scene == 0) {
        document.querySelector('.intro-1').style.display = 'flex';
        const geluidElement = document.querySelector('.geluid');
        setTimeout(() => {
            geluidElement.classList.add('fadeIn');
        }, 7000);
    } else if (scene == 1) {
        document.querySelector('.intro-2').style.display = 'flex';
    } else if (scene == 2) {
        document.querySelector('.intro-3').style.display = 'flex';
    } else if (scene == 3) {

        const bootHeen = document.querySelector('.boot-heen');
        bootHeen.style.display = 'block';
        const video = bootHeen.querySelector('video');
        if (video) {
            console.log("Video found, adding event listener for 'ended'");
            video.currentTime = 0;
            video.play().then(() => {
                console.log("Video is playing");
            }).catch(error => {
                console.error("Error playing video:", error);
            });
            video.addEventListener('ended', () => {
                console.log("Video ended, transitioning to scene 4");
                scene = 4;
                sessionStorage.setItem('scene', scene);
                updateScene();
            });
        }
    } else if (scene == 4) {
        document.querySelector('.ivoorkust').style.display = 'flex';
        const scrollOccurred = sessionStorage.getItem('scrollOccurred');
        if (scrollOccurred !== 'true') {
            const offset = 700;
            const scrollPosition = document.documentElement.scrollWidth - window.innerWidth - offset; // Scroll to slightly left of the rightmost position
            window.scrollTo(scrollPosition, 0);
            setTimeout(() => {
                smoothScrollTo(0, 5000);
                sessionStorage.setItem('scrollOccurred', 'true');
            }, 3500);
        }
    } else if (scene == 5) {
        document.querySelector('.boot-terug').style.display = 'block';
        setTimeout(() => {
            openDialog('.boot-terug .modalVideo');
        }, 1);
        setTimeout(() => {
            scene += 1;
            sessionStorage.setItem('scene', scene);
            updateScene();
        }, 32000);
    } else
    if (scene == 6) {
        document.querySelector('.outro-1').style.display = 'flex';
    } else if (scene == 7) {
        document.querySelector('.outro-2').style.display = 'flex';
        setTimeout(() => {
            scene += 1;
            sessionStorage.setItem('scene', scene);
            updateScene();
        }, 12000);
    } else if (scene == 8) {
        document.querySelector('.outro-3').style.display = 'flex';
    } else if (scene == 9) {
        document.querySelector('.outro-4').style.display = 'flex';
    } else if (scene == 10) {
        document.querySelector('.outro-5').style.display = 'flex';
    }
}

function smoothScrollTo(target, duration) {
    const start = window.scrollX;
    const change = target - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = function() {
        currentTime += increment;
        const val = Math.easeInOutQuad(currentTime, start, change, duration);
        window.scrollTo(val, 0);
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};
const pijltjes = document.querySelectorAll('.pijltje');

pijltjes.forEach(pijltje => {
    pijltje.addEventListener('click', function() {
        scene += 1;
        sessionStorage.setItem('scene', scene);
        updateScene();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
        video.removeAttribute('autoplay');
        video.pause();
        video.currentTime = 0;
    });
});

const thumbs = document.querySelectorAll(".open");
const modals = document.querySelectorAll("dialog");

thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", (event) => {
        if (modals[index]) {
            modals[index].showModal();

            let videos = modals[index].querySelectorAll('video');
            videos.forEach((video) => {
                video.currentTime = 0;
                video.play();
            });
        }
    });
});

modals.forEach((modal, index) => {
    let closeBtn = modal.querySelector('.kruisje');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.top = '0';
            modal.scrollTop = 0;
            modal.close();

            let videos = modal.querySelectorAll('video');
            videos.forEach((video) => {
                video.pause();
            });

            if (scene == 5) {
                scene += 1;
                sessionStorage.setItem('scene', scene);
                updateScene();
            }
        });
    }
});

const videos = document.querySelectorAll('video');

videos.forEach((video) => {
    video.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
});

function openDialog(selector) {
    const dialog = document.querySelector(selector);
    if (dialog) {
        dialog.showModal();
        const videos = dialog.querySelectorAll('video');
        videos.forEach(video => {
            video.currentTime = 0;
            video.play();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const elements = [
        { audio: document.getElementById('audio1'), target: document.querySelector('.slechteInkomst') },
        { audio: document.getElementById('audio2'), target: document.querySelector('.slechteOogst') },
        { audio: document.getElementById('audio3'), target: document.querySelector('.boot') },
        { audio: document.getElementById('audio4'), target: document.querySelector('.boot-terug') },
        { audio: document.getElementById('audio5'), target: document.querySelector('.ontbossing') },
        { audio: document.getElementById('audio6'), target: document.querySelector('.fairtrade') },
        { audio: document.getElementById('audio7'), target: document.querySelector('.kinderarbeid') }
    ];
    const minWidthPercentage = 50;

    function checkVisibility() {
        const viewportWidth = window.innerWidth;
        const minWidth = (minWidthPercentage / 100) * viewportWidth;
        const isWideEnough = viewportWidth >= minWidth;

        const leftBoundary = viewportWidth * 0.25;
        const rightBoundary = viewportWidth * 0.75;

        elements.forEach(({ audio, target }) => {
            const rect = target.getBoundingClientRect();
            const isVisible = rect.left < rightBoundary && rect.right > leftBoundary;

            if (isVisible && isWideEnough) {
                if (audio.paused) {
                    audio.play();
                }
            } else {
                if (!audio.paused) {
                    audio.pause();
                }
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    checkVisibility();

    const openModal = document.querySelectorAll('.open');
    openModal.forEach(image => {
        image.addEventListener('click', function() {
            elements.forEach(({ audio }) => {
                if (!audio.paused) {
                    audio.pause();
                }
            });
        });
    });

    function disableScroll() {
        window.addEventListener('scroll', preventScroll);
    }

    function enableScroll() {
        window.removeEventListener('scroll', preventScroll);
    }

    function preventScroll(event) {
        event.preventDefault();
        event.stopPropagation();
    }


    const modals = document.querySelectorAll('dialog');

    const thumbs = document.querySelectorAll(".open");
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            if (modals[index]) {
                document.body.classList.add('scroll-lock');
                modals[index].showModal();
                disableScroll();
            }
        });
    });

    modals.forEach((modal, index) => {
        let closeBtn = modal.querySelector('.kruisje');
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modals[index].close();
                document.body.classList.remove('scroll-lock');
                enableScroll();
                checkVisibility();
            });
        }
    });

    document.body.addEventListener('wheel', function(event) {
        if (document.body.classList.contains('scroll-lock')) {
            event.preventDefault();
        } else {
            document.documentElement.scrollLeft += event.deltaY;
        }
    });
});

function resetScene() {
    scene = 0;
    sessionStorage.setItem('scene', scene);
    updateScene();
    smoothScrollTo(0, 1000);
}
