import flasher from '@flasher/flasher';
import SweetAlertFactory from './sweetalert';

const sweetalert = new SweetAlertFactory();
flasher.addPlugin('sweetalert', sweetalert);

export default sweetalert;
