import { useEffect, useRef } from "react";
import "./Cursor.css"

function Cursor(){

  const cursorRef = useRef(null);

  useEffect(() => {
    const mouse = { x : 0 , y:0 }
    const previousMouse = { x : 0 , y:0 }
    const circle = { x : 0 , y:0 }
    const mouseFollowSpeed = 0.1;
    const scaleSpeed = 0.15;
    let currentScale = 0;
    let currentAngle = 0;
    let animationId;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const tick = () => {
      // Smooth Mouse Follower
      circle.x += (mouse.x - circle.x) * mouseFollowSpeed;
      circle.y += (mouse.y - circle.y) * mouseFollowSpeed;
      //

      // get the delta Values of the prevMouse and curMouse
      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;

      previousMouse.x  = mouse.x;
      previousMouse.y  = mouse.y;
      //

      // find Mouse Velocity and scale factor
      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 7, 100);
      const scaleValue = (mouseVelocity / 150) * 0.5;
      currentScale += (scaleValue - currentScale) * scaleSpeed;
      // console.log(mouseVelocity);
      //

      // Rotation 
      const angle = Math.atan2(deltaMouseY , deltaMouseX) * 180 / Math.PI;
      if(mouseVelocity > 5){
        currentAngle = angle;
      }
      // console.log(angle);
      //

      // Change the values of the ref
      cursorRef.current.style.transform = 
          `
          translate(${circle.x}px, ${circle.y}px) 
          translate(-50%, -50%)
          rotate(${currentAngle}deg)
          scale(${1 + currentScale}, ${1 - currentScale})
          `;
      animationId = requestAnimationFrame(tick);
      //
    };
    window.addEventListener("mousemove" , handleMouseMove);
    tick();
    
    return() => {
      window.removeEventListener('mousemove' , handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return(
    <>
      <div className="cursor" ref={cursorRef}></div>
    </>
  );
}

export default Cursor