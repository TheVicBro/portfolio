import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";

type AnimatedTextProps = {
    text: string | string[];
    el?: keyof JSX.IntrinsicElements;
    className?: string;
    once?: boolean;
    repeatDelay?: number;
    staggerChildren?: number;
    animation?: {
      hidden: Variant;
      visible: Variant;
    };
    animateMode?: "char" | "word";
  };
  
  const defaultAnimations = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };
  

export const AnimatedText = ({
    text,
    el: Wrapper = "p",
    className,
    once,
    repeatDelay,
    staggerChildren = 0.03,
    animation = defaultAnimations,
    animateMode = "char",
  }: AnimatedTextProps) => {
    const controls = useAnimation();
    const textArray = Array.isArray(text) ? text : [text];
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once });
  
    useEffect(() => {
      let timeout: NodeJS.Timeout;
      const show = () => {
        controls.start("visible");
        if (repeatDelay) {
          timeout = setTimeout(async () => {
            await controls.start("hidden");
            controls.start("visible");
          }, repeatDelay);
        }
      };
  
      if (isInView) {
        show();
      } else {
        controls.start("hidden");
      }
  
      return () => clearTimeout(timeout);
    }, [isInView, controls, repeatDelay]);
  
    return (
      <Wrapper className={className}>
        <span className="sr-only">{textArray.join(" ")}</span>
        <motion.span
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { 
              transition: { 
                staggerChildren,
                delayChildren: 0.1,
                staggerDirection: 1,
                ease: "easeOut"
              } 
            },
            hidden: {},
          }}
          aria-hidden
          style={{ willChange: 'opacity, transform' }}
        >
          {textArray.map((line, lineIndex) => (
            <span className="block" key={`${line}-${lineIndex}`}>
              {line.split(" ").map((word, wordIndex) => (
                <span className="inline-block" key={`${word}-${wordIndex}`}>
                  {animateMode === "char" ? (
                    word.split("").map((char, charIndex) => (
                      <motion.span
                        key={`${char}-${charIndex}`}
                        className="inline-block"
                        variants={animation}
                        style={{ willChange: 'opacity, transform' }}
                      >
                        {char}
                      </motion.span>
                    ))
                  ) : (
                    <motion.span
                      key={`${word}-${wordIndex}`}
                      className="inline-block"
                      variants={animation}
                      style={{ willChange: 'opacity, transform' }}
                    >
                      {word}
                    </motion.span>
                  )}
                  <span className="inline-block">&nbsp;</span>
                </span>
              ))}
            </span>
          ))}
        </motion.span>
      </Wrapper>
    );
  };