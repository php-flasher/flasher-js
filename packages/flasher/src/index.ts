import Flasher from './flasher';
import './flasher.scss';
import { Envelope } from './interfaces';

const flasher = new Flasher();

flasher.addTheme('flasher', {
  render: (envelope: Envelope): string => {
    const notification = envelope.notification;

    return `
      <div class="fl-flasher fl-container fl-${notification.type}">
        <div class="fl-content">
          <div class="fl-icon"></div>
          <div>
            <strong class="fl-title">${notification.title ?? notification.type}</strong>
            <span class="fl-message">${notification.message}</span>
          </div>
        </div>
        <div class="fl-progress-bar"></div>
      </div>`;
  },
});

export * from './interfaces';
export default flasher;