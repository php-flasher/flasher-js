import flasher from '@flasher/flasher';
import ToastrFactory from './toastr';

flasher.addFactory('toastr', new ToastrFactory());
