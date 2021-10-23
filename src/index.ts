import Flasher from './flasher';
import './template';
import TemplateFactory from './template';

export * from './interfaces';

const flasher = Flasher.getInstance();
flasher.addFactory('template', new TemplateFactory());

export default Flasher;
