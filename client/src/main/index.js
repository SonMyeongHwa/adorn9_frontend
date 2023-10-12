// nav
// import { loginCheck, createLoginNav, createLogoutNav } from '../navbar.js';
import apiModule from './api.js';
import advertising from './advertise.js';
import mainSlideModule from './main-slide.js';
import createTheModal from '../modal/modal.js';

loginCheck();
createLoginNav();
createLogoutNav();
apiModule.fetch();
advertising.advertise();
mainSlideModule.makeClone();
createTheModal.createModal();
