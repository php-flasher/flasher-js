import './notyf.scss';

import flasher from '@flasher/flasher';
import NotyfFactory from './notyf';

const notyf = new NotyfFactory();
flasher.addFactory('notyf', notyf);

export default notyf;
