import React, { useEffect } from 'react';


const Scroller = () => {
  useEffect(() => {
    // If a user hasn't opted in for reduced motion, then we add the animation
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addAnimation();
    }
  }, []);

  function addAnimation() {
    const scrollers = document.querySelectorAll('.scroller');

    scrollers.forEach((scroller) => {
      // add data-animated="true" to every `.scroller` on the page
      scroller.setAttribute('data-animated', true);

      // Make an array from the elements within `.scroller-inner`
      const scrollerInner = scroller.querySelector('.scroller__inner');
      const scrollerContent = Array.from(scrollerInner.children);

      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

  return (
    <div className="scroller" data-direction="right" data-speed="slow">
      <div className="scroller__inner">
        <img src="https://i.pravatar.cc/150?img=1" alt="" />
        <img src="https://i.pravatar.cc/150?img=2" alt="" />
        <img src="https://i.pravatar.cc/150?img=3" alt="" />
        <img src="https://i.pravatar.cc/150?img=4" alt="" />
        <img src="https://i.pravatar.cc/150?img=5" alt="" />
        <img src="https://i.pravatar.cc/150?img=6" alt="" />
      </div>
    </div>
  );
};

export default Scroller;
