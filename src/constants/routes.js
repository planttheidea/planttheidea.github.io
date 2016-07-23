// external dependencies
import sortBy from 'lodash/sortBy';

// pages
import CrioPage from '../pages/CrioPage';
import Home from '../pages/Home';
import JilePage from '../pages/JilePage';
import PrintScoutPage from '../pages/PrintScoutPage';
import QonductorPage from '../pages/QonductorPage';
import RemeasurePage from '../pages/RemeasurePage';
import VidzPage from '../pages/VidzPage';
import VidzPlayerPage from '../pages/VidzPlayerPage';
import WaddupPage from '../pages/WaddupPage';

const HOME = {
  component: Home,
  href: '/',
  title: 'Home'
};

const LIBRARIES = [
  {
    component: CrioPage,
    description: 'Immutable JS objects with a natural API',
    href: '/crio',
    title: 'crio'
  }, {
    component: JilePage,
    description: 'Manage your styles in JS with the full power of CSS',
    href: '/jile',
    title: 'jile'
  }, {
    component: VidzPlayerPage,
    description: 'A simple video player written in React, leveraging vidz for the player creation',
    href: '/react-vidz-player',
    title: 'VidzPlayer'
  }, {
    component: VidzPage,
    description: 'Tiny library to provide a no-muss, no-fuss HTML5 video element',
    href: '/vidz',
    title: 'vidz'
  }, {
    component: WaddupPage,
    description: 'A ridiculously tiny pubsub manager with no dependencies',
    href: '/waddup',
    title: 'waddup'
  }, {
    component: RemeasurePage,
    description: 'Get position and size of the DOM element for any React Component',
    href: '/remeasure',
    title: 'Remeasure'
  }, {
    component: PrintScoutPage,
    description: 'Simple cross-browser print event listeners with no depedencies',
    href: '/printscout',
    title: 'PrintScout'
  }, {
    component: QonductorPage,
    description: 'A simple promise-based queueing system for managing the order of operations',
    href: '/qonductor',
    title: 'Qonductor'
  }
];

const SORTED_LIBRARIES = sortBy(LIBRARIES, ({title}) => {
  return title.toLowerCase();
});

const ROUTES = [
  HOME,
  ...SORTED_LIBRARIES
];

export {HOME as home};
export {SORTED_LIBRARIES as libraries};
export {ROUTES as routes};

export default {
  home: HOME,
  libraries: SORTED_LIBRARIES,
  routes: ROUTES
};
