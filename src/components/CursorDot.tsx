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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.12s ease, width 0.22s cubic-bezier(0.2,0.8,0.2,1), height 0.22s cubic-bezier(0.2,0.8,0.2,1), border-radius 0.22s cubic-bezier(0.2,0.8,0.2,1)',
    });

    const label = document.createElement('span');
    Object.assign(label.style, {
      color: '#fff',
      fontFamily: 'SchibstedGrotesk_600SemiBold, system-ui, sans-serif',
      fontSize: '12.5px',
      letterSpacing: '0.3px',
      lineHeight: '1',
      opacity: '0',
      transform: 'scale(0.5)',
      transition: 'opacity 0.16s ease, transform 0.22s cubic-bezier(0.2,0.8,0.2,1)',
      whiteSpace: 'nowrap',
      userSelect: 'none',
    });
    dot.appendChild(label);
    document.body.appendChild(dot);

    let labelled = false;
    const setLabel = (text: string | null) => {
      if (text) {
        label.textContent = text;
        if (!labelled) {
          // stretch into a small pill (not a circle)
          dot.style.width = '58px';
          dot.style.height = '26px';
          dot.style.borderRadius = '13px';
          labelled = true;
        }
        label.style.opacity = '1';
        label.style.transform = 'scale(1)';
      } else if (labelled) {
        dot.style.width = '9px';
        dot.style.height = '9px';
        dot.style.borderRadius = '50%';
        label.style.opacity = '0';
        label.style.transform = 'scale(0.5)';
        labelled = false;
      }
    };

    const onMove = (e: MouseEvent) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      dot.style.opacity = '1';
      const t = e.target as HTMLElement | null;
      const hit = t && t.closest ? t.closest('[data-cursor]') : null;
      setLabel(hit ? hit.getAttribute('data-cursor') : null);
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
