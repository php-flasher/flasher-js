import './flasher.scss';

import Flasher from './flasher';
import { Envelope } from './types';

const flasher = new Flasher();

flasher.addTheme('flasher', {
  render: (envelope: Envelope): string => {
    const { type, title, message } = envelope;

    return `
      <div class="fl-flasher fl-${type}">
        <div class="fl-content">
          <div class="fl-icon"></div>
          <div>
            <strong class="fl-title">${title}</strong>
            <span class="fl-message">${message}</span>
          </div>
        </div>
        <span class="fl-progress-bar"></span>
      </div>`;
  },
});

export * from './types';
export * from './mixin';
export default flasher;
