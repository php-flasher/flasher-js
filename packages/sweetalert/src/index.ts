import flasher from '@flasher/flasher';
import SweetAlertFactory from './sweetalert';

const sweetalert = new SweetAlertFactory();
flasher.addFactory('sweetalert', sweetalert);

export default sweetalert;
