import flasher from '@flasher/flasher';
import NotyFactory from './noty';

const noty = new NotyFactory();
flasher.addFactory('noty', noty);

export default noty;
