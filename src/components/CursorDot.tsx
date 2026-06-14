import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function CursorDot() {
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const style = document.createElement('style');
    style.textContent = 'html,body,*{cursor:none!important}';
    document.head.appendChild(style);

    const dot = document.createElement('div');
    Object.assign(dot.style, {
      position: 'fixed',
      width: '9px',
      height: '9px',
      borderRadius: '50%',
      background: '#6E0110',
      pointerEvents: 'none',
      zIndex: '2147483647',
      transform: 'translate(-50%,-50%)',
      opacity: '0',
      transition: 'opacity 0.12s ease',
    });
    document.body.appendChild(dot);

    const onMove = (e: MouseEvent) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      dot.style.opacity = '1';
    };
    const onLeave = () => { dot.style.opacity = '0'; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      style.remove();
      dot.remove();
    };
  }, []);

  return null;
}
