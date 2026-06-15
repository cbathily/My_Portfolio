import { ImageSourcePropType } from 'react-native';

export const PROJECT_COVERS: Record<string, ImageSourcePropType> = {
  plantnet: require('../../public/plantnet/plantnet_cover1.png'),
  atolls:   require('../../public/atolls/atolls_cover.png'),
  moosburg: require('../../public/moosburg/moosburg_cover.png'),
  munich:   require('../../public/munich_app/munich_app_cover.png'),
  swm:      require('../../public/swm.png'),
  vinted:   require('../../public/vinted/vinted_cover.png'),
};

export const PLANTNET_IMAGES = {
  ux_audit:        require('../../public/plantnet/ux_audit.png'),
  home_wireframe:  require('../../public/plantnet/home_wireframe.png'),
  social_wireframe:require('../../public/plantnet/social_wireframe.png'),
};

export const MUNICH_IMAGES = {
  screen1: require('../../public/munich_app/munich_app_scrrens1.png'),
  screen2: require('../../public/munich_app/munich_app_screen2.png'),
};

export const ATOLLS_IMAGES = {
  problem:  require('../../public/atolls/atolls_problem.png'),
  workflow: require('../../public/atolls/atolls_workflow.png'),
  video:    require('../../public/atolls/atolls_projekt_web.mp4'),
  video1:   require('../../public/atolls/atolls_projekt_teil1.mp4'),
  video2:   require('../../public/atolls/atolls_projekt_teil2.mp4'),
};

export const MOOSBURG_IMAGES = {
  problem:  require('../../public/moosburg/moosburg_problem.png'),
  research: require('../../public/moosburg/research.png'),
  tafel:    require('../../public/moosburg/moosburg_tafel.png'),
  tafel2:   require('../../public/moosburg/moosburg_tafel2.png'),
  flyer:    require('../../public/moosburg/moosburg_flyer.png'),
};

export const VINTED_IMAGES = {
  currently: require('../../public/vinted/vinted_currently.png'),
  process:   require('../../public/vinted/vinted_process.png'),
  store:     require('../../public/vinted/vinted_store.png'),
  marketing: require('../../public/vinted/vinted_marketing.png'),
  socials:   require('../../public/vinted/vinted_socials.png'),
};

export const ABOUT_PHOTO: ImageSourcePropType = require('../../public/about_me/profile.jpg');
