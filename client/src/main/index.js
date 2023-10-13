import apiModule from './api.js';
import advertising from './advertise.js';
import mainSlideModule from './main-slide.js';
import createTheModal from '../modal/modal.js';

apiModule.fetch();
advertising.advertise();
mainSlideModule.makeClone();
createTheModal.createModal();
