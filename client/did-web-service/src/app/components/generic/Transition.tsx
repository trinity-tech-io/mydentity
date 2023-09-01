import React, { FC, ReactNode, useContext, useEffect, useRef } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

const TransitionContext = React.createContext<{
  parent: any
}>({
  parent: null
});

function useIsInitialRender(): boolean {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, [])
  return isInitialRender.current;
}

const CSSTransition: FC<{
  show: boolean,
  enter: string,
  enterStart: string,
  enterEnd: string,
  leave: string,
  leaveStart: string,
  leaveEnd: string,
  appear: boolean,
  unmountOnExit: boolean,
  tag: any,
  children: Element[],
}> = ({
  show,
  enter = '',
  enterStart = '',
  enterEnd = '',
  leave = '',
  leaveStart = '',
  leaveEnd = '',
  appear,
  unmountOnExit,
  tag = 'div',
  children,
  ...rest
}) => {
    const enterClasses = enter.split(' ').filter((s) => s.length);
    const enterStartClasses = enterStart.split(' ').filter((s) => s.length);
    const enterEndClasses = enterEnd.split(' ').filter((s) => s.length);
    const leaveClasses = leave.split(' ').filter((s) => s.length);
    const leaveStartClasses = leaveStart.split(' ').filter((s) => s.length);
    const leaveEndClasses = leaveEnd.split(' ').filter((s) => s.length);
    const removeFromDom = unmountOnExit;

    function addClasses(node: any, classes: any): void {
      classes.length && node.classList.add(...classes);
    }

    function removeClasses(node: any, classes: any): void {
      classes.length && node.classList.remove(...classes);
    }

    const nodeRef = React.useRef(null);
    const Component = tag;

    return (
      <ReactCSSTransition
        appear={appear}
        nodeRef={nodeRef}
        unmountOnExit={removeFromDom}
        in={show}
        addEndListener={(done: any): void => {
          nodeRef.current.addEventListener('transitionend', done, false)
        }}
        onEnter={(): void => {
          if (!removeFromDom) nodeRef.current.style.display = null;
          addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses])
        }}
        onEntering={(): void => {
          removeClasses(nodeRef.current, enterStartClasses)
          addClasses(nodeRef.current, enterEndClasses)
        }}
        onEntered={(): void => {
          removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses])
        }}
        onExit={(): void => {
          addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses])
        }}
        onExiting={(): void => {
          removeClasses(nodeRef.current, leaveStartClasses)
          addClasses(nodeRef.current, leaveEndClasses)
        }}
        onExited={(): void => {
          removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses])
          if (!removeFromDom) nodeRef.current.style.display = 'none';
        }}
      >
        <Component ref={nodeRef} {...rest} style={{ display: !removeFromDom ? 'none' : null }}>{children}</Component>
      </ReactCSSTransition>
    )
  }

const Transition: FC<{
  show: boolean;
  appear?: boolean;
  children: ReactNode;
} & any> = ({ show, appear, ...rest }) => {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    )
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  )
}

export default Transition;