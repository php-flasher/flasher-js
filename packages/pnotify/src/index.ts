import flasher from '@flasher/flasher';
import PnotifyFactory from './pnotify';

const pnotify = new PnotifyFactory();
flasher.addFactory('pnotify', pnotify);

export default pnotify;
