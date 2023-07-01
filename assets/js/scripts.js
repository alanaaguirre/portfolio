const homeText = new SplitType('#homeText');
gsap.to('.char', {
    y: 0,
    stagger: 0.05,
    delay: 0,
    duration: .2,
    ease: "power2.inOut"
});
const options = {
    root: null,
    rootMargin: "200px",
    threshold: 0.9
};
let revealCallback = (entries, self) => {
    entries.forEach(entry => {
        let container = entry.target;
        let img = entry.target.querySelector("img");
        const easeInOut = "power3.out";
        const revealAnim = gsap.timeline({
            ease: easeInOut
        });
        if (entry.isIntersecting) {
            revealAnim.set(container, {
                visibility: "visible"
            });
            revealAnim.fromTo(container, {
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
            }, {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                ease: easeInOut
            });
            revealAnim.from(img, 4, {
                scale: 1.4,
                ease: easeInOut,
                delay: -1
            });
            self.unobserve(entry.target)
        }
    })
};
let revealObserver = new IntersectionObserver(revealCallback, options);
document.querySelectorAll(".reveal").forEach(reveal => {
    revealObserver.observe(reveal)
});
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});
scroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        }
    },
    pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
});
gsap.registerPlugin(ScrollTrigger);
gsap.to(".text p", {
    backgroundPositionX: "0%",
    stagger: 1,
    scrollTrigger: {
        scroller: '[data-scroll-container]',
        trigger: ".text p",
        scrub: 1,
        start: "top center",
        end: "bottom top"
    }
});
gsap.to(".title1", {
    x: -4000,
    xPercent: 150,
    ease: "none",
    scrollTrigger: {
        scroller: '[data-scroll-container]',
        trigger: ".title1",
        scrub: true
    }
});
gsap.to(".title2", {
    x: 100,
    xPercent: 150,
    ease: "none",
    scrollTrigger: {
        scroller: '[data-scroll-container]',
        trigger: ".title2",
        scrub: true
    }
});
gsap.set(".cursor", {
    xPercent: -50,
    yPercent: -50
});
const cursor = document.querySelector(".cursor");
const pos = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};
const mouse = {
    x: pos.x,
    y: pos.y
};
const speed = 0.2;
const xSet = gsap.quickSetter(cursor, "x", "px");
const ySet = gsap.quickSetter(cursor, "y", "px");
window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y
});
gsap.ticker.add(() => {
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y)
});
//
gsap.to(".infoProject", {
  scrollTrigger: ".infoProject", // start the animation when ".box" enters the viewport (once)
  x: 500
});