import HostingActionsApp from './HostingActionsApp.html';
import HostingActions from './components/HostingActions.html';

const app = new HostingActionsApp({
    target: document.getElementById('hostingactions'),
    hydrate: true,
    data: {
        product: {
            domain: 'huzzl.de',
            hostingType: 'lamp'
        }
    }
});

export default {
    HostingActions
}
