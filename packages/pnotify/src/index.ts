import flasher from '@flasher/flasher';
import PnotifyFactory from './pnotify';

const pnotify = new PnotifyFactory();
flasher.addPlugin('pnotify', pnotify);

export default pnotify;
