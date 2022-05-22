import flasher from '@flasher/flasher';
import ToastrFactory from './toastr';

const toastr = new ToastrFactory();
flasher.addFactory('toastr', toastr);

export default toastr;
