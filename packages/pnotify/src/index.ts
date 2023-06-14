import { flasher } from '@flasher/flasher';
import PnotifyPlugin from './pnotify';

const pnotify = new PnotifyPlugin();
flasher.addPlugin('pnotify', pnotify);

export default pnotify;
